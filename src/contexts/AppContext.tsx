import { createContext, useContext, useState, ReactNode } from 'react';
import { UserData, BuilderStep } from '../types/types';

interface AppContextType {
  step: BuilderStep;
  setStep: (step: BuilderStep) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
  availableDomains: string[];
  setAvailableDomains: (domains: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<BuilderStep>('welcome');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    businessName: '',
    domain: '',
    colorPalette: '',
    theme: '',
    websiteType: 'static',
    isPublished: false
  });
  const [availableDomains, setAvailableDomains] = useState<string[]>([]);

  return (
    <AppContext.Provider value={{ 
      step, 
      setStep, 
      userData, 
      setUserData, 
      availableDomains, 
      setAvailableDomains 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};