import { assign, emit, fromPromise, setup } from 'xstate'
import { postOrder } from '../api'
import { getCartTotal } from '../lib/cart'
import type { CartItem, CheckoutResult } from '../types'

export interface CheckoutContextShape {
  items: CartItem[]
  error: string | null
  order: CheckoutResult | null
}

export type CheckoutEvent =
  | { type: 'CART_UPDATED'; items: CartItem[] }
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' }
  | { type: 'RESET' }

export type CheckoutEmitted = { type: 'ORDER_COMPLETED'; order: CheckoutResult }

const submitPayment = fromPromise<CheckoutResult, { items: CartItem[] }>(
  ({ input, signal }) =>
    postOrder(
      {
        items: input.items,
        total: getCartTotal(input.items),
        createdAt: new Date().toISOString(),
      },
      signal,
    ),
)

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContextShape,
    events: {} as CheckoutEvent,
    emitted: {} as CheckoutEmitted,
  },
  actors: { submitPayment },
  guards: {
    hasItems: ({ context }) => context.items.length > 0,
    updateHasItems: ({ event }) => event.type === 'CART_UPDATED' && event.items.length > 0,
  },
  actions: {
    syncItems: assign(({ context, event }) =>
      event.type === 'CART_UPDATED' ? { items: event.items } : context,
    ),
  },
}).createMachine({
  id: 'checkout',
  initial: 'reviewing',
  context: { items: [], error: null, order: null },
  on: {
    CART_UPDATED: { actions: 'syncItems' },
  },
  states: {
    reviewing: {
      on: {
        SUBMIT: {
          guard: 'hasItems',
          target: 'submitting',
          actions: assign({ error: null }),
        },
      },
    },

    submitting: {
      invoke: {
        src: 'submitPayment',
        input: ({ context }) => ({ items: context.items }),
        onDone: {
          target: 'success',
          actions: [
            assign({ order: ({ event }) => event.output, error: null }),
            emit(({ event }) => ({ type: 'ORDER_COMPLETED' as const, order: event.output })),
          ],
        },
        onError: {
          target: 'reviewing',
          actions: assign({
            error: ({ event }) =>
              event.error instanceof Error ? event.error.message : 'Payment failed.',
          }),
        },
      },
      on: {
        CANCEL: { target: 'reviewing', actions: assign({ error: null }) },
      },
    },

    success: {
      on: {
        RESET: { target: 'reviewing', actions: assign({ order: null, error: null }) },
        CART_UPDATED: {
          guard: 'updateHasItems',
          target: 'reviewing',
          actions: ['syncItems', assign({ order: null, error: null })],
        },
      },
    },
  },
})
