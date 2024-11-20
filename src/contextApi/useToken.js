// src/hooks/useToken.js
import { useAuth } from './AuthContext';

const useToken = () => {
  const { getTokenFromCookie } = useAuth();
  return getTokenFromCookie();
};

export default useToken;
