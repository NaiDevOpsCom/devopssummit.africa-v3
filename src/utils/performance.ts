/**
 * Loads a script asynchronously and returns a promise.
 * Can be used to delay loading of non-critical third-party scripts.
 */
export function loadScript(src: string, id?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    if (id) script.id = id;

    script.onload = () => resolve();
    script.onerror = (err) => reject(err);

    document.body.appendChild(script);
  });
}

/**
 * Executes a callback when the browser is idle or after a short delay.
 */
export function onIdle(callback: () => void, timeout = 2000): void {
  if ("requestIdleCallback" in globalThis) {
    globalThis.requestIdleCallback(() => callback(), { timeout });
  } else {
    setTimeout(callback, timeout);
  }
}
