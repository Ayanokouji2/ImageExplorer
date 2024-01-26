const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB

let db;
const req = indexedDB.open("MyDb", 1);

req.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore('ImageStore', { keyPath: 'id' });
};

req.onsuccess = (event) => {
    db = event.target.result;
};

req.onerror = (event) => {
    console.error(event.target.error.message);
};

const performTransaction = (obj) => {
    if (obj) {
        const transaction = db.transaction('ImageStore', 'readwrite');
        const ImageStore = transaction.objectStore('ImageStore');
        const res = ImageStore.add(obj);

        transaction.oncomplete = () => {
            console.log("Transaction completed");
        };

        transaction.onerror = () => {
            console.error("Transaction failed");
        };

        res.onsuccess = () => {
            console.log("Item was added successfully", res.result);
        };

        res.onerror = () => {
            console.error("Item was not added successfully", res.error);
        };
    }
};

export const getImagesFromDb = async() => {
    try {
        const db = await new Promise((resolve, reject) => {
          const request = indexedDB.open("MyDb", 1);
    
          request.onerror = (event) => {
            reject("Error opening database");
          };
    
          request.onsuccess = (event) => {
            resolve(event.target.result);
          };
        });
    
        const images = await new Promise((resolve, reject) => {
          const transaction = db.transaction("ImageStore", 'readonly');
          const objectStore = transaction.objectStore("ImageStore");
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
};

export default performTransaction;
