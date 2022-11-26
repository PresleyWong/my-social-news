import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  const Content = (props) => (
    <main className="container">
      <>{props.children}</>
    </main>
  );

  return (
    <div className="layout">
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
