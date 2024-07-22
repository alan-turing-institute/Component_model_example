export namespace ComponentPkgComponentTypes {
}
export type Cell = CellDead | CellAlive;
export interface CellDead {
  tag: 'dead',
  val: number,
}
export interface CellAlive {
  tag: 'alive',
  val: number,
}
