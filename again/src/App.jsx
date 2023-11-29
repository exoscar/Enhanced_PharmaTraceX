import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  Topbar,
  Sidebar,
  AddMedicine,
  ViewMedicine,
  Login,
  Dashboard,
  AddTruck,
  Alerts,
  SearchMedicine,
  ViewTruck,
  QrCode,
} from "./components";

const App = () => {
  useEffect(() => {
    // Define the script elements to load
    const scriptElements = [
      "/assets/vendor/apexcharts/apexcharts.min.js",
      "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "/assets/vendor/chart.js/chart.umd.js",
      "/assets/vendor/echarts/echarts.min.js",
      "/assets/vendor/quill/quill.min.js",
      "/assets/vendor/simple-datatables/simple-datatables.js",
      "/assets/vendor/tinymce/tinymce.min.js",
      "/assets/vendor/php-email-form/validate.js",
    ];

    // Load the script elements dynamically
    scriptElements.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    // Clean up: remove the scripts when the component unmounts
    return () => {
      scriptElements.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"`);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  // Sidebar toggle function
  const toggleSidebar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  // Search bar toggle function
  const toggleSearchBar = () => {
    const searchBar = document.querySelector(".search-bar");
    if (searchBar) {
      searchBar.classList.toggle("search-bar-show");
    }
  };

  // Your navbar links active state function
  const navbarlinksActive = () => {
    // Define your navbar links active state logic here
  };

  // Toggle .header-scrolled class function
  const headerScrolled = () => {
    // Define your header scrolled logic here
  };

  // Back to top button function
  const toggleBackToTop = () => {
    // Define your back to top button logic here
  };

  // Initialize tooltips
  const initTooltips = () => {
    // Initialize tooltips using the Bootstrap Tooltip library
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  };

  // Initialize Bootstrap validation check
  const initValidation = () => {
    // Initialize validation for forms with the 'needs-validation' class
    const needsValidation = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(needsValidation).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  };

  // Initialize Datatables
  const initDatatables = () => {
    // Initialize Datatables using the SimpleDatatables library
    const datatables = document.querySelectorAll(".datatable");
    datatables.forEach(
      (datatable) => new simpleDatatables.DataTable(datatable)
    );
  };

  // Autoresize echart charts function
  const autoResizeECharts = () => {
    // Autoresize ECharts charts
    const mainContainer = document.querySelector("#main");
    if (mainContainer) {
      setTimeout(() => {
        new ResizeObserver(() => {
          document.querySelectorAll(".echart").forEach((getEchart) => {
            echarts.getInstanceByDom(getEchart).resize();
          });
        }).observe(mainContainer);
      }, 200);
    }
  };

  // Call the initialization functions
  useEffect(() => {
    toggleSidebar();
    toggleSearchBar();
    navbarlinksActive();
    headerScrolled();
    toggleBackToTop();
    initTooltips();
    initValidation();
    initDatatables();
    autoResizeECharts();
  }, []);

  function STLayout() {
    return (
      <div>
        <Topbar />
        <Sidebar />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/AddTruckDetails"
          element={
            <div>
              <STLayout /> <AddTruck />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div>
              <STLayout />
              <Dashboard />{" "}
            </div>
          }
        />
        <Route
          path="/addMedicine"
          element={
            <div>
              <STLayout /> <AddMedicine />
            </div>
          }
        />
        <Route
          path="/viewMedicine/:NDC"
          element={
            <div>
              <STLayout /> <ViewMedicine />
            </div>
          }
        />
        <Route
          path="/searchMedicine"
          element={
            <div>
              <STLayout />
              <SearchMedicine />
            </div>
          }
        />
        <Route
          path="/alerts"
          element={
            <div>
              <STLayout /> <Alerts />
            </div>
          }
        />
        <Route
          path="/viewTrucks"
          element={
            <div>
              <STLayout /> <ViewTruck />
            </div>
          }
        />
        <Route
          path="/qrCode"
          element={
            <div>
              <STLayout /> <QrCode />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
