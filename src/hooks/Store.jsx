const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB

export const downloadAndStoreImage = async (url, dbName, storeName) => {
	try {
		const db = await new Promise((resolve, reject) => {
			const request = indexedDB.open(dbName, 1);

			request.onerror = (event) => {
				reject("Error opening database");
			};

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				const objectStore = db.createObjectStore(storeName, { keyPath: 'key', autoIncrement: true });
				objectStore.createIndex('url', 'url', { unique: true });
			};
		});

		const existingImage = await new Promise((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readonly');
			const objectStore = transaction.objectStore(storeName);
			const index = objectStore.index('url');
			const request = index.get(url);

			request.onerror = (event) => {
				reject("Error checking existing image");
			};

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};
		});
		if (!existingImage) {
			
			await new Promise((resolve, reject) => {
				const transaction = db.transaction(storeName, 'readwrite');
				const objectStore = transaction.objectStore(storeName);
				const request = objectStore.add({ url });

				request.onerror = (event) => {
					reject("Error adding new image");
				};

				request.onsuccess = (event) => {
					resolve();
				};
			});
		} else {
			console.log("Image already exists in the database");
		}

		console.log("Download and store operation completed successfully");
	} catch (error) {
		console.error("Error:", error);
	}
}



export async function getAllImagesFromDB(dbName, storeName) {
	try {
		const db = await new Promise((resolve, reject) => {
			const request = indexedDB.open(dbName, 1);

			request.onerror = (event) => {
				reject("Error opening database");
			};

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};
		});

		const images = await new Promise((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readonly');
			const objectStore = transaction.objectStore(storeName);
			const request = objectStore.getAll();

			request.onerror = (event) => {
				reject("Error getting images");
			};

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};
		});
		return images;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
}


