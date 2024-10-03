import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "/register";

  // Add or remove a class on the body element
  if (hideHeaderFooter) {
    document.body.classList.add("auth-page");
  } else {
    document.body.classList.remove("auth-page");
  }

  return (
    <>
      {/* Hiển thị Header nếu không phải login hoặc register */}
      {!hideHeaderFooter && <Header />}

      {/* Outlet để render nội dung các route con */}
      <Outlet />

      {/* Hiển thị Footer nếu không phải login hoặc register */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;
