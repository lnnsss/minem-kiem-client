const cdekScriptID = "cdek-widget-script";

let cdekReadyPromise: Promise<void> | null = null;

export function ensureCdekWidgetReady(): Promise<void> {
    if (window.CDEKWidget) return Promise.resolve();

    if (cdekReadyPromise) return cdekReadyPromise;

    cdekReadyPromise = new Promise<void>((resolve, reject) => {
        const script = document.getElementById(
            cdekScriptID,
        ) as HTMLScriptElement | null;

        if (!script) {
            reject(new Error(`Missing #${cdekScriptID} (script tag) in index.html`));
            return;
        }

        const onLoad = () => {
            script.dataset.loaded = "true";
            resolve();
        };
        const onError = () =>
            reject(new Error("Failed to load CDEK widget script"));

        if (script.dataset.loaded === "true" || window.CDEKWidget) {
            resolve();
            return;
        }

        script.addEventListener("load", onLoad, { once: true });
        script.addEventListener("error", onError, { once: true });
    });

    return cdekReadyPromise;
}
