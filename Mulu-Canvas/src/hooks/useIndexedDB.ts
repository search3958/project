'use client';

import { useCallback, useRef } from 'react';
import { Artwork } from '@/lib/types';

const DB_NAME = 'PhysicsDrawingDB';
const DB_VERSION = 1;
const STORE_NAME = 'artworks';

export function useIndexedDB() {
  const dbRef = useRef<IDBDatabase | null>(null);
  
  const init = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (dbRef.current) {
        resolve();
        return;
      }
      
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => {
        reject(request.error);
      };
      
      request.onsuccess = () => {
        dbRef.current = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }, []);
  
  const getAll = useCallback((): Promise<Artwork[]> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) {
        resolve([]);
        return;
      }
      
      const transaction = dbRef.current.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }, []);
  
  const save = useCallback((artwork: Artwork): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) {
        reject(new Error('Database not initialized'));
        return;
      }
      
      const transaction = dbRef.current.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(artwork);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }, []);
  
  const remove = useCallback((id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) {
        reject(new Error('Database not initialized'));
        return;
      }
      
      const transaction = dbRef.current.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }, []);
  
  const get = useCallback((id: string): Promise<Artwork | null> => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) {
        resolve(null);
        return;
      }
      
      const transaction = dbRef.current.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }, []);
  
  return { init, getAll, save, remove, get };
}
