import React, { useEffect } from "react";

const Sidebar = () => {
  useEffect(() => {
    if (document.querySelector(".toggle-sidebar-btn")) {
      document
        .querySelector(".toggle-sidebar-btn")
        .addEventListener("click", toggleSidebar);
    }

    if (document.querySelector(".search-bar-toggle")) {
      document
        .querySelector(".search-bar-toggle")
        .addEventListener("click", toggleSearchBar);
    }

    return () => {
      if (document.querySelector(".toggle-sidebar-btn")) {
        document
          .querySelector(".toggle-sidebar-btn")
          .removeEventListener("click", toggleSidebar);
      }

      if (document.querySelector(".search-bar-toggle")) {
        document
          .querySelector(".search-bar-toggle")
          .removeEventListener("click", toggleSearchBar);
      }
    };
  }, []);

  const toggleSidebar = () => {
    document.querySelector("body").classList.toggle("toggle-sidebar");
  };

  const toggleSearchBar = () => {
    document.querySelector(".search-bar").classList.toggle("search-bar-show");
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link collapsed" href="/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/addMedicine">
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Add Medicine</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/searchMedicine">
            <i className="bi bi-grid"></i>
            <span>Search Medicine</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-toggle="collapse"
            href="#medicine-details"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Medicine Details</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            className="nav-content collapse"
            id="medicine-details"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="active-chain.html">
                <i className="bi bi-circle"></i>
                <span>Active Chain</span>
              </a>
            </li>
            <li>
              <a href="completed-chain.html">
                <i className="bi bi-circle"></i>
                <span>Completed Chain</span>
              </a>
            </li>
          </ul>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link collapsed" href="/">
            <i className="bi bi-bar-chart"></i>
            <span>Charts</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="/">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </a>
        </li> */}

        <li className="nav-item">
          <a className="nav-link collapsed" href="/addTruckDetails">
            <i className="bi bi-person"></i>
            <span>Add Truck Details</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="/viewTrucks">
            <i className="bi bi-person"></i>
            <span>View Trucks</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="/alerts">
            <i className="bi bi-person"></i>
            <span>Alerts</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="/">
            <i className="bi bi-person"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
