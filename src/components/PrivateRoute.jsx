const { Navigate } = require("react-router-dom");

function PrivateRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

module.exports = PrivateRoute;

