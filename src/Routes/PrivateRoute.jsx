import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase.config";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
