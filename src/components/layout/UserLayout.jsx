import React, { useRef } from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const UserLayout = () => {
  const footerRef = useRef();
  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Header scrollToFooter={scrollToFooter} />
      <Outlet />
      <Footer ref={footerRef} />
    </div>
  );
};

export default UserLayout;
