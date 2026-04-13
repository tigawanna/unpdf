// Promise polyfill for Node.js < 22 and some browsers.
if (typeof Promise.withResolvers === 'undefined') {
  Promise.withResolvers = function () {
    let resolve, reject
    const promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  }
}

// `Map.prototype.getOrInsertComputed` is used extensively by PDF.js v5.6+.
// Not yet available in most runtimes.
if (typeof Map.prototype.getOrInsertComputed === 'undefined') {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Map.prototype, 'getOrInsertComputed', {
    value(key, callbackFn) {
      if (this.has(key)) {
        return this.get(key)
      }
      const value = callbackFn(key)
      this.set(key, value)
      return value
    },
    writable: true,
    configurable: true,
  })
}

// `Uint8Array.prototype.toHex` is used by PDF.js v5.6+ for document fingerprints.
// Not yet available in all runtimes (e.g. Node.js < 26, Cloudflare Workers).
if (typeof Uint8Array.prototype.toHex === 'undefined') {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Uint8Array.prototype, 'toHex', {
    value() {
      let hex = ''
      for (let i = 0; i < this.length; i++) {
        hex += this[i].toString(16).padStart(2, '0')
      }
      return hex
    },
    writable: true,
    configurable: true,
  })
}

export const polyfills = true
