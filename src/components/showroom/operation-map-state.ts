import type { OpMode, OpNodeId } from '@/content/demo/connected-operation'

// Pure state transitions for OperationMap. No React and no runtime imports, so
// scripts/qa/operation-state.test.mjs can exercise it directly under Node.

export type OpState = {
  mode: OpMode
  selected: OpNodeId
  /** How many nodes, in propagation order, already show their connected status. */
  propagated: number
}

export type OpAction =
  | { type: 'connect' }
  | { type: 'disconnect' }
  | { type: 'select'; id: OpNodeId }
  | { type: 'move'; delta: 1 | -1; order: readonly OpNodeId[] }
  | { type: 'step'; order: readonly OpNodeId[] }
  | { type: 'complete'; order: readonly OpNodeId[] }

export function initialOpState(selected: OpNodeId = 'scheduling'): OpState {
  return { mode: 'today', selected, propagated: 0 }
}

export function opReducer(state: OpState, action: OpAction): OpState {
  switch (action.type) {
    case 'connect':
      return state.mode === 'connected' ? state : { ...state, mode: 'connected', propagated: 0 }
    case 'disconnect':
      return { ...state, mode: 'today', propagated: 0 }
    case 'select':
      return { ...state, selected: action.id }
    case 'move': {
      const n = action.order.length
      const i = action.order.indexOf(state.selected)
      return { ...state, selected: action.order[(i + action.delta + n) % n] }
    }
    case 'step':
      if (state.mode !== 'connected') return state
      return { ...state, propagated: Math.min(action.order.length, state.propagated + 1) }
    case 'complete':
      if (state.mode !== 'connected') return state
      return { ...state, propagated: action.order.length }
  }
}

export function isNodeConnected(state: OpState, id: OpNodeId, order: readonly OpNodeId[]) {
  return state.mode === 'connected' && order.indexOf(id) < state.propagated
}

export function isFullyConnected(state: OpState, order: readonly OpNodeId[]) {
  return state.mode === 'connected' && state.propagated >= order.length
}
