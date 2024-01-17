import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthStateContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    state: "loading",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setAuthState({ state: "loaded", isAuthentication: true, user });
        } else {
          setAuthState({ state: "loaded", isAuthentication: false, user });
        }
      },
      (error) => {
        setAuthState({ state: "error", error });
      },
    );
    return () => unsubscribe();
  }, []);

  return (
    <AuthStateContext.Provider value={authState}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const authState = useContext(AuthStateContext);
  if (!authState) throw new Error("AuthProvider not found");
  return authState;
};
