export function openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open("PokemonDB", 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains("images")) {
                db.createObjectStore("images");
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export function saveImage(key: string, blob: Blob) {
    openDB().then((db) => {
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
        store.put(blob, key); 
    });
}

export function getImage(key: string): Promise<Blob | undefined> {
    return new Promise((resolve) => {
        openDB().then((db) => {
            const transaction = db.transaction("images", "readonly");
            const store = transaction.objectStore("images");
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(undefined);
        });
    });
}
