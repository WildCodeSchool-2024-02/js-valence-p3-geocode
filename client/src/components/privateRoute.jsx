import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import LoginPrompt from "./LoginPrompt";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? children : <LoginPrompt />;
}

export default PrivateRoute;
