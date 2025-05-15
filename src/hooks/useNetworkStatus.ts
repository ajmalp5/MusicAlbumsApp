// hooks/useNetworkStatus.ts
import { useEffect } from 'react';
import * as Network from 'expo-network';


export const useNetworkStatus = (callback: () => void) => {
  useEffect(() => {
    const unsubscribe = Network.addNetworkListener(({ isInternetReachable }) => {
      if (isInternetReachable) {
        callback();
      }
    });

    return () => unsubscribe();
  }, [callback]);
};
