import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// interfaces
import { Store } from '../interfaces/Store';

// firebase
import { database } from '../../firebase/Config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// Constantes
const CHUNK_SIZE = 100; // Ajusta el tamaño del chunk según tus necesidades

export const useGetData = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para guardar datos en AsyncStorage en trozos
  const saveToAsyncStorage = async (data: Store[]) => {
    try {
      const chunks = [];
      for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        chunks.push(data.slice(i, i + CHUNK_SIZE));
      }

      const promises = chunks.map((chunk, index) =>
        AsyncStorage.setItem(`stores_chunk_${index}`, JSON.stringify(chunk))
      );
      await Promise.all(promises);
    } catch (e) {
      console.error('Failed to save stores to AsyncStorage:', e);
    }
  };

  // Función para obtener datos de AsyncStorage en trozos
  const loadFromAsyncStorage = async (): Promise<Store[]> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storeKeys = keys.filter(key => key.startsWith('stores_chunk_'));
      const chunks = await AsyncStorage.multiGet(storeKeys);
      const data = chunks.map(([key, value]) => JSON.parse(value || '[]'));
      return data.flat();
    } catch (e) {
      console.error('Failed to load stores from AsyncStorage:', e);
      return [];
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      // Cargar datos de AsyncStorage al montar el componente
      const localData = await loadFromAsyncStorage();
      if (localData.length > 0) {
        setStores(localData);
        setLoading(false);
      }

      const q = query(
        collection(database, 'info-stores'),
        orderBy('storeName', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          const storesList: Store[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            storeName: doc.data().storeName,
            codeName: doc.data().codeName,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            phoneNumber: doc.data().phoneNumber,
            bag1kg: doc.data().bag1kg,
            bag3kg: doc.data().bag3kg,
            bag5kg: doc.data().bag5kg,
            bag15kg: doc.data().bag15kg,
            freezerSize: doc.data().freezerSize,
            FrezzerAmount: doc.data().FrezzerAmount,
            createdDoc: doc.data().createdDoc,
          }));

          setStores(storesList);
          saveToAsyncStorage(storesList);
          setLoading(false);
        },
        err => {
          console.error(error);
          setError(error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    };

    initializeData();
  }, []);

  return {
    stores,
    error,
    loading,
  };
};

export default useGetData;
