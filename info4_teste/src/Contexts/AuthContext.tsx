import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface AuthContextProviderProps {
  children: ReactNode
}

type AuthContextData = {
    authenticatedUser: AuthenticatedUserData | null,
    setAuthenticatedUser: Dispatch<SetStateAction<AuthenticatedUserData | null>>,
}

type AuthenticatedUserData = {
    id:number,
    email:string,
    senha:string,
    sobrenome:string,
    nome:string,
}

const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUserData | null>(null);

  return (
    <AuthContext.Provider value={{authenticatedUser, setAuthenticatedUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)