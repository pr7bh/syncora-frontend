import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getToken,
  removeToken,
} from "../utils/auth";

import {
  getCurrentUser,
} from "../services/api";
import PageLoader from "../components/PageLoader";
const AuthContext = createContext(null);


export function AuthProvider({ children }) {

  const [token, setToken] = useState(getToken());

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  const isAuthenticated = !!token;


  useEffect(() => {

    async function loadUser() {

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

      } catch (error) {

        removeToken();

        setToken(null);

        setUser(null);

      } finally {

        setLoading(false);

      }
    }

    loadUser();

  }, [token]);


  function logout() {

    removeToken();

    setToken(null);

    setUser(null);
  }


  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setToken,
        setUser,
        isAuthenticated,
        loading,
        logout,
      }}
    >
      {loading ? <PageLoader /> : children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}