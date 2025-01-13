import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCurrentUser, signOut } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const checkUser = useCallback(async () => {
    try {
      setAuthError(null);
      const currentUser = await getCurrentUser();
      
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        // Clean up state if no user found
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setAuthError(error.message);
      // Clean up state on error
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      if (mounted) {
        await checkUser();
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [checkUser]);

  const handleLogin = useCallback(async (userData) => {
    try {
      setAuthError(null);
      // Ensure we don't have an existing session before setting new user
      if (isLoggedIn) {
        await handleLogout();
      }
      setIsLoggedIn(true);
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      setAuthError(error.message);
    }
  }, [isLoggedIn]);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
      setAuthError(error.message);
    } finally {
      // Always clean up state regardless of success/failure
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const contextValue = {
    isLoggedIn,
    user,
    isLoading,
    authError,
    handleLogin,
    handleLogout,
    checkUser,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;