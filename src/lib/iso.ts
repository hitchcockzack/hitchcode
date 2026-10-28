// Isometric projection helpers for hand-built SVG drawings.
// u runs right-down at 30°, v runs left-down at 30°, z is straight up.
// Values are rounded so server and client render identical markup.

const COS30 = Math.sqrt(3) / 2

export type Pt = readonly [number, number]

export const round = (n: number) => Math.round(n * 100) / 100

export function iso(u: number, v: number, z: number, ox: number, oy: number): Pt {
  return [round(ox + (u - v) * COS30), round(oy + (u + v) / 2 - z)]
}

export function pts(list: readonly Pt[]): string {
  return list.map(([x, y]) => `${x},${y}`).join(' ')
}

/** Maps plane-local (u, v) drawing coordinates onto an isometric top face at height z. */
export function planeMatrix(ox: number, oy: number, z: number): string {
  return `matrix(${round(COS30)} 0.5 ${round(-COS30)} 0.5 ${round(ox)} ${round(oy - z)})`
}

export type IsoBoxFaces = { top: string; left: string; right: string }

/** Flat-shaded box: returns the three faces visible from the default isometric camera. */
export function isoBox(
  u: number,
  v: number,
  w: number,
  d: number,
  h: number,
  ox: number,
  oy: number,
  z0 = 0,
): IsoBoxFaces {
  const p = (pu: number, pv: number, pz: number) => iso(pu, pv, pz, ox, oy)
  const top = z0 + h
  return {
    top: pts([p(u, v, top), p(u + w, v, top), p(u + w, v + d, top), p(u, v + d, top)]),
    left: pts([p(u, v + d, top), p(u + w, v + d, top), p(u + w, v + d, z0), p(u, v + d, z0)]),
    right: pts([p(u + w, v, top), p(u + w, v + d, top), p(u + w, v + d, z0), p(u + w, v, z0)]),
  }
}

export type GableFaces = { back: string; front: string; gable: string }

/** Gable roof whose ridge runs along u, sitting on a box of the same footprint. */
export function gableRoof(
  u: number,
  v: number,
  w: number,
  d: number,
  eave: number,
  rise: number,
  ox: number,
  oy: number,
): GableFaces {
  const p = (pu: number, pv: number, pz: number) => iso(pu, pv, pz, ox, oy)
  const ridgeV = v + d / 2
  const ridge = eave + rise
  return {
    back: pts([p(u, v, eave), p(u + w, v, eave), p(u + w, ridgeV, ridge), p(u, ridgeV, ridge)]),
    front: pts([p(u, ridgeV, ridge), p(u + w, ridgeV, ridge), p(u + w, v + d, eave), p(u, v + d, eave)]),
    gable: pts([p(u + w, v, eave), p(u + w, ridgeV, ridge), p(u + w, v + d, eave)]),
  }
}
