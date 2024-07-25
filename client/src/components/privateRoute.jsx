import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import LoginPrompt from "./LoginPrompt";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? children : <LoginPrompt />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
