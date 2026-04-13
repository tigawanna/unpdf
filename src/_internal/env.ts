/**
 * Stubs browser globals that PDF.js expects at the module level
 * in non-browser environments.
 *
 * @remarks
 * Must be called before importing any PDF.js module, since PDF.js
 * accesses these globals at parse time (top-level constants).
 */
export function stubBrowserGlobals(): void {
  if (typeof globalThis.DOMMatrix === 'undefined') {
    // @ts-expect-error: Minimal stub
    globalThis.DOMMatrix = class DOMMatrix {}
  }
}
