"use client"

import { createContext, useContext, useState } from 'react';

type stateType ={
    propertyListLoadingStatus : boolean;
    setPropertyListLoadingStatus : (propertyListLoadingStatus: boolean) => void;
}

const AppContext = createContext<stateType>(null!);

export function AppWrapper({ children }:{
    children: React.ReactNode
  }) {
    const [propertyListLoadingStatus, setPropertyListLoadingStatus] = useState(false);


    const sharedState = {
        propertyListLoadingStatus, setPropertyListLoadingStatus
    };

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}