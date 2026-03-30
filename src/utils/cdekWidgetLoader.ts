const cdekScriptID = "cdek-widget-script";
const cdekScriptSrc = "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3";

let cdekReadyPromise: Promise<void> | null = null;

export function ensureCdekWidgetReady(): Promise<void> {
    if (window.CDEKWidget) return Promise.resolve();

    if (cdekReadyPromise) return cdekReadyPromise;

    cdekReadyPromise = new Promise<void>((resolve, reject) => {
        let script = document.getElementById(cdekScriptID) as HTMLScriptElement | null;

        if (!script) {
            script = document.createElement("script");
            script.id = cdekScriptID;
            script.src = cdekScriptSrc;
            script.defer = true;
            document.body.appendChild(script);
        }

        const onLoad = () => {
            script.dataset.loaded = "true";
            if (window.CDEKWidget) {
                resolve();
                return;
            }
            reject(new Error("CDEK widget script loaded, but window.CDEKWidget is missing"));
        };
        const onError = () =>
            reject(new Error("Failed to load CDEK widget script"));

        if (script.dataset.loaded === "true" || window.CDEKWidget) {
            resolve();
            return;
        }

        if (script.readyState === "complete") {
            onLoad();
            return;
        }

        script.addEventListener("load", onLoad, { once: true });
        script.addEventListener("error", onError, { once: true });

        window.setTimeout(() => {
            if (window.CDEKWidget) {
                script.dataset.loaded = "true";
                resolve();
            }
        }, 3000);
    });

    return cdekReadyPromise;
}
