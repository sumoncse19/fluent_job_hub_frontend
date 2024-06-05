import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-16 px-5 pb-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
