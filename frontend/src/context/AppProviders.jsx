// src/context/AppProviders.jsx
import { DenuncioProvider } from "./DenuncioContext";
import { SiniestroProvider } from "./SiniestroContext";
import { UsuarioProvider } from "./UsuarioContext";
import { AuthProvider } from "./AuthContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UsuarioProvider>
        <SiniestroProvider>
          <DenuncioProvider>
            {children}
          </DenuncioProvider>
        </SiniestroProvider>
      </UsuarioProvider>
    </AuthProvider>
  );
}
