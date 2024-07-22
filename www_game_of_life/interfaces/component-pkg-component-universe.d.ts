export namespace ComponentPkgComponentUniverse {
  export { UniverseResource };
}
import type { Cell } from './component-pkg-component-types.js';
export { Cell };

export class UniverseResource {
  constructor()
  tick(): void;
  render(): string;
  width(): number;
  height(): number;
  cells(): Uint8Array;
  getValue(idx: number): number;
}
