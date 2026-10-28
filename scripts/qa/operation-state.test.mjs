// Run: node --test scripts/qa/operation-state.test.mjs  (Node 22.6+ strips the TS types)
import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  initialOpState,
  isFullyConnected,
  isNodeConnected,
  opReducer,
} from '../../src/components/showroom/operation-map-state.ts'

const ORDER = ['lead', 'consultation', 'estimate', 'scheduling', 'inventory', 'installation', 'invoice', 'followup']

test('starts as the business runs today, nothing connected', () => {
  const s = initialOpState()
  assert.equal(s.mode, 'today')
  assert.equal(s.propagated, 0)
  assert.equal(isNodeConnected(s, 'lead', ORDER), false)
})

test('connecting propagates status one department at a time, in job order', () => {
  let s = opReducer(initialOpState(), { type: 'connect' })
  assert.equal(isNodeConnected(s, 'lead', ORDER), false)
  s = opReducer(s, { type: 'step', order: ORDER })
  assert.equal(isNodeConnected(s, 'lead', ORDER), true)
  assert.equal(isNodeConnected(s, 'consultation', ORDER), false)
  for (let i = 0; i < 20; i += 1) s = opReducer(s, { type: 'step', order: ORDER })
  assert.equal(s.propagated, ORDER.length, 'propagation is capped at the node count')
  assert.equal(isFullyConnected(s, ORDER), true)
})

test('steps are ignored until the operation is connected', () => {
  const s = opReducer(initialOpState(), { type: 'step', order: ORDER })
  assert.equal(s.propagated, 0)
})

test('complete jumps straight to the finished state (reduced motion)', () => {
  const s = opReducer(opReducer(initialOpState(), { type: 'connect' }), { type: 'complete', order: ORDER })
  assert.equal(isFullyConnected(s, ORDER), true)
})

test('returning to today resets propagation but keeps the inspected node', () => {
  let s = opReducer(initialOpState('invoice'), { type: 'connect' })
  s = opReducer(s, { type: 'complete', order: ORDER })
  s = opReducer(s, { type: 'disconnect' })
  assert.equal(s.mode, 'today')
  assert.equal(s.propagated, 0)
  assert.equal(s.selected, 'invoice')
})

test('keyboard movement wraps around the job', () => {
  let s = initialOpState('followup')
  s = opReducer(s, { type: 'move', delta: 1, order: ORDER })
  assert.equal(s.selected, 'lead')
  s = opReducer(s, { type: 'move', delta: -1, order: ORDER })
  assert.equal(s.selected, 'followup')
})
