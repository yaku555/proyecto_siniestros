// src/context/AppProviders.jsx
import { DenuncioProvider } from "./DenuncioContext";
import { SiniestroProvider } from "./SiniestroContext";

export function AppProviders({ children }) {
  return (
    <SiniestroProvider>
      <DenuncioProvider>
        {children}
      </DenuncioProvider>
    </SiniestroProvider>
  );
}
