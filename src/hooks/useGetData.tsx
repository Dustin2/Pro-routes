import React, {useState, useEffect} from 'react';

//interfaces
import {Store} from '../interfaces/Store';

//firebase
import {database} from '../../firebase/Config';
import {collection, onSnapshot, query, orderBy} from 'firebase/firestore';

export const useGetData = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(database, 'info-stores'),
      orderBy('storeName', 'desc'),
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
        setLoading(false);
      },
      err => {
        console.error(error);
        setError(error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return {
    stores,
    error,
    loading,
  };
};

export default useGetData;
