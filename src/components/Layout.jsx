import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="layout">
      {/* Backdrop */}
      {showSidebar && (
        <div
          className="backdrop"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <Sidebar show={showSidebar} setShow={setShowSidebar} />

      <div className="main">
        <Topbar onMenuClick={() => setShowSidebar(!showSidebar)} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
