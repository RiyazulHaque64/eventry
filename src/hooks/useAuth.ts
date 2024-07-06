import { useContext } from "react";
import { AuthContext } from "../contexts";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context !== undefined) {
    const { auth, setAuth } = context;
    return { auth, setAuth };
  }
};

export default useAuth;
