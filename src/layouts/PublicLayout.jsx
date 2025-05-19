const { Outlet } = require("react-router-dom");
const Navbar = require("../components/Navbar");

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

module.exports = PublicLayout;
