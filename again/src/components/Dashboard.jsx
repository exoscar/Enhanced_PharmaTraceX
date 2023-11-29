import React, { useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "chart.js/auto";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import "../../public/assets/css/style.css";

function LineChart() {
  const chartOptions = {
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 82, 56],
      },
      {
        name: "Revenue",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Customers",
        data: [15, 11, 32, 18, 9, 24, 11],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };

  return (
    <ReactApexChart
      options={chartOptions.options}
      series={chartOptions.series}
      type={chartOptions.options.chart.type}
      height={chartOptions.options.chart.height}
    />
  );
}

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "Bar Chart",
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  const pieChartRef = useRef(null);

  useEffect(() => {
    if (pieChartRef.current) {
      new Chart(pieChartRef.current, {
        type: "pie",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    }
  }, []);

  return (
    <div>
      <div id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section dashboard">
          <div className="row">
            {/* Left side columns */}
            <div className="col-lg-12">
              <div className="row">
                {/* Sales Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Sales <span>| Today</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                          <span className="text-success small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Sales Card */}
                {/* Revenue Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Revenue <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-3">
                          <h6>$3,264</h6>
                          <span className="text-success small pt-1 fw-bold">
                            8%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Revenue Card */}
                {/* Customers Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Customers <span>| This Year</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>
                          <span className="text-danger small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            decrease
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Customers Card */}
                {/* Reports */}
                <div className="col-8">
                  <div className="card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Reports <span>/Today</span>
                      </h5>
                      {/* Line Chart */}
                      <div id="reportsChart"></div>
                      <LineChart />
                      {/* End Line Chart */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  {/* Recent Activity */}
                  <div className="card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Recent Activity <span>| Today</span>
                      </h5>
                      <div className="activity">
                        <div className="activity-item d-flex">
                          <div className="activite-label">32 min</div>
                          <i className="bi bi-circle-fill activity-badge text-success align-self-start"></i>
                          <div className="activity-content">
                            Quia quae rerum{" "}
                            <a href="#" className="fw-bold text-dark">
                              explicabo officiis
                            </a>{" "}
                            beatae
                          </div>
                        </div>
                        {/* Add more activity items as needed */}
                        <div class="activity-item d-flex">
                          <div class="activite-label">56 min</div>
                          <i class="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
                          <div class="activity-content">
                            Voluptatem blanditiis blanditiis eveniet
                          </div>
                        </div>

                        <div class="activity-item d-flex">
                          <div class="activite-label">2 hrs</div>
                          <i class="bi bi-circle-fill activity-badge text-primary align-self-start"></i>
                          <div class="activity-content">
                            Voluptates corrupti molestias voluptatem
                          </div>
                        </div>

                        <div class="activity-item d-flex">
                          <div class="activite-label">1 day</div>
                          <i class="bi bi-circle-fill activity-badge text-info align-self-start"></i>
                          <div class="activity-content">
                            Tempore autem saepe{" "}
                            <a href="#" class="fw-bold text-dark">
                              occaecati voluptatem
                            </a>{" "}
                            tempore
                          </div>
                        </div>

                        <div class="activity-item d-flex">
                          <div class="activite-label">2 days</div>
                          <i class="bi bi-circle-fill activity-badge text-warning align-self-start"></i>
                          <div class="activity-content">
                            Est sit eum reiciendis exercitationem
                          </div>
                        </div>

                        <div class="activity-item d-flex">
                          <div class="activite-label">4 weeks</div>
                          <i class="bi bi-circle-fill activity-badge text-muted align-self-start"></i>
                          <div class="activity-content">
                            Dicta dolorem harum nulla eius. Ut quidem quidem sit
                            quas
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Recent Activity */}
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Bar Chart</h5>
                      {/* Bar Chart */}
                      <canvas
                        id="barChart"
                        ref={chartRef}
                        style={{ maxHeight: "400px" }}
                      ></canvas>
                      {/* End Bar Chart */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Pie Chart</h5>
                      {/* Pie Chart */}
                      <canvas
                        id="pieChart"
                        ref={pieChartRef}
                        style={{ maxHeight: "400px" }}
                      ></canvas>
                      {/* End Pie Chart */}
                    </div>
                  </div>
                </div>
                {/* End Reports */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useRef } from "react";
// import ReactApexChart from "react-apexcharts";
// import Chart from "chart.js/auto";
// import Topbar from "./Topbar";
// import Sidebar from "./Sidebar";
// import "../../public/assets/css/style.css";

// function LineChart() {
//   const chartOptions = {
//     series: [
//       {
//         name: "Sales",
//         data: [31, 40, 28, 51, 42, 82, 56],
//       },
//       {
//         name: "Revenue",
//         data: [11, 32, 45, 32, 34, 52, 41],
//       },
//       {
//         name: "Customers",
//         data: [15, 11, 32, 18, 9, 24, 11],
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "area",
//       },
//       xaxis: {
//         type: "datetime",
//         categories: [
//           "2018-09-19T00:00:00.000Z",
//           "2018-09-19T01:30:00.000Z",
//           "2018-09-19T02:30:00.000Z",
//           "2018-09-19T03:30:00.000Z",
//           "2018-09-19T04:30:00.000Z",
//           "2018-09-19T05:30:00.000Z",
//           "2018-09-19T06:30:00.000Z",
//         ],
//       },
//     },
//   };

//   return (
//     <div>
//       <h5>Line Chart</h5>
//       <canvas
//         id="lineChart"
//         ref={chartRef}
//         style={{ maxHeight: "400px" }}
//       ></canvas>
//     </div>
//   );
// }

// const Dashboard = () => {
//   const chartRef = useRef(null);
//   const pieChartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       new Chart(chartRef.current, {
//         type: "bar",
//         data: {
//           labels: [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//           ],
//           datasets: [
//             {
//               label: "Bar Chart",
//               data: [65, 59, 80, 81, 56, 55, 40],
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.2)",
//                 "rgba(255, 159, 64, 0.2)",
//                 "rgba(255, 205, 86, 0.2)",
//                 "rgba(75, 192, 192, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(153, 102, 255, 0.2)",
//                 "rgba(201, 203, 207, 0.2)",
//               ],
//               borderColor: [
//                 "rgb(255, 99, 132)",
//                 "rgb(255, 159, 64)",
//                 "rgb(255, 205, 86)",
//                 "rgb(75, 192, 192)",
//                 "rgb(54, 162, 235)",
//                 "rgb(153, 102, 255)",
//                 "rgb(201, 203, 207)",
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     }

//     if (pieChartRef.current) {
//       new Chart(pieChartRef.current, {
//         type: "pie",
//         data: {
//           labels: ["Red", "Blue", "Yellow"],
//           datasets: [
//             {
//               label: "My First Dataset",
//               data: [300, 50, 100],
//               backgroundColor: [
//                 "rgb(255, 99, 132)",
//                 "rgb(54, 162, 235)",
//                 "rgb(255, 205, 86)",
//               ],
//               hoverOffset: 4,
//             },
//           ],
//         },
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <section className="section dashboard">
//         <div className="row">
//           <div className="col-xxl-4 col-md-6">
//             <div className="card info-card sales-card">
//               <div class="filter">
//                 <a class="icon" href="#" data-bs-toggle="dropdown">
//                   <i class="bi bi-three-dots"></i>
//                 </a>
//                 <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                   <li class="dropdown-header text-start">
//                     <h6>Filter</h6>
//                   </li>

//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Today
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Month
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Year
//                     </a>
//                   </li>
//                 </ul>
//               </div>

//               <div class="card-body">
//                 <h5 class="card-title">
//                   Sales <span>| Today</span>
//                 </h5>

//                 <div class="d-flex align-items-center">
//                   <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                     <i class="bi bi-cart"></i>
//                   </div>
//                   <div class="ps-3">
//                     <h6>145</h6>
//                     <span class="text-success small pt-1 fw-bold">
//                       12%
//                     </span>{" "}
//                     <span class="text-muted small pt-2 ps-1">increase</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xxl-4 col-md-6">
//             <div className="card info-card revenue-card">
//               <div class="filter">
//                 <a class="icon" href="#" data-bs-toggle="dropdown">
//                   <i class="bi bi-three-dots"></i>
//                 </a>
//                 <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                   <li class="dropdown-header text-start">
//                     <h6>Filter</h6>
//                   </li>

//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Today
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Month
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Year
//                     </a>
//                   </li>
//                 </ul>
//               </div>

//               <div class="card-body">
//                 <h5 class="card-title">
//                   Revenue <span>| This Month</span>
//                 </h5>

//                 <div class="d-flex align-items-center">
//                   <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                     <i class="bi bi-currency-dollar"></i>
//                   </div>
//                   <div class="ps-3">
//                     <h6>$3,264</h6>
//                     <span class="text-success small pt-1 fw-bold">8%</span>{" "}
//                     <span class="text-muted small pt-2 ps-1">increase</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-xxl-4 col-xl-12">
//             <div className="card info-card customers-card">
//               <div class="filter">
//                 <a class="icon" href="#" data-bs-toggle="dropdown">
//                   <i class="bi bi-three-dots"></i>
//                 </a>
//                 <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                   <li class="dropdown-header text-start">
//                     <h6>Filter</h6>
//                   </li>

//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Today
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Month
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Year
//                     </a>
//                   </li>
//                 </ul>
//               </div>

//               <div class="card-body">
//                 <h5 class="card-title">
//                   Customers <span>| This Year</span>
//                 </h5>

//                 <div class="d-flex align-items-center">
//                   <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                     <i class="bi bi-people"></i>
//                   </div>
//                   <div class="ps-3">
//                     <h6>1244</h6>
//                     <span class="text-danger small pt-1 fw-bold">12%</span>{" "}
//                     <span class="text-muted small pt-2 ps-1">decrease</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12">
//             <div className="card">
//               <div class="filter">
//                 <a class="icon" href="#" data-bs-toggle="dropdown">
//                   <i class="bi bi-three-dots"></i>
//                 </a>
//                 <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                   <li class="dropdown-header text-start">
//                     <h6>Filter</h6>
//                   </li>

//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Today
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Month
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Year
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div class="card-body">
//                 <h5 class="card-title">
//                   Reports <span>/Today</span>
//                 </h5>

//                 <div id="reportsChart"></div>
//                 <LineChart />
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-4">
//             <div className="card">
//               <div class="filter">
//                 <a class="icon" href="#" data-bs-toggle="dropdown">
//                   <i class="bi bi-three-dots"></i>
//                 </a>
//                 <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
//                   <li class="dropdown-header text-start">
//                     <h6>Filter</h6>
//                   </li>

//                   <li>
//                     <a class="dropdown-item" href="#">
//                       Today
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Month
//                     </a>
//                   </li>
//                   <li>
//                     <a class="dropdown-item" href="#">
//                       This Year
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div class="card-body">
//                 <h5 class="card-title">
//                   Recent Activity <span>| Today</span>
//                 </h5>

//                 <div class="activity">
//                   <div class="activity-item d-flex">
//                     <div class="activite-label">32 min</div>
//                     <i class="bi bi-circle-fill activity-badge text-success align-self-start"></i>
//                     <div class="activity-content">
//                       Quia quae rerum{" "}
//                       <a href="#" class="fw-bold text-dark">
//                         explicabo officiis
//                       </a>{" "}
//                       beatae
//                     </div>
//                   </div>

//                   <div class="activity-item d-flex">
//                     <div class="activite-label">56 min</div>
//                     <i class="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
//                     <div class="activity-content">
//                       Voluptatem blanditiis blanditiis eveniet
//                     </div>
//                   </div>

//                   <div class="activity-item d-flex">
//                     <div class="activite-label">2 hrs</div>
//                     <i class="bi bi-circle-fill activity-badge text-primary align-self-start"></i>
//                     <div class="activity-content">
//                       Voluptates corrupti molestias voluptatem
//                     </div>
//                   </div>

//                   <div class="activity-item d-flex">
//                     <div class="activite-label">1 day</div>
//                     <i class="bi bi-circle-fill activity-badge text-info align-self-start"></i>
//                     <div class="activity-content">
//                       Tempore autem saepe{" "}
//                       <a href="#" class="fw-bold text-dark">
//                         occaecati voluptatem
//                       </a>{" "}
//                       tempore
//                     </div>
//                   </div>

//                   <div class="activity-item d-flex">
//                     <div class="activite-label">2 days</div>
//                     <i class="bi bi-circle-fill activity-badge text-warning align-self-start"></i>
//                     <div class="activity-content">
//                       Est sit eum reiciendis exercitationem
//                     </div>
//                   </div>

//                   <div class="activity-item d-flex">
//                     <div class="activite-label">4 weeks</div>
//                     <i class="bi bi-circle-fill activity-badge text-muted align-self-start"></i>
//                     <div class="activity-content">
//                       Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="card">
//               <div class="card-body">
//                 <h5 class="card-title">Bar CHart</h5>
//                 <canvas
//                   id="barChart"
//                   ref={chartRef}
//                   style={{ maxHeight: "400px" }}
//                 ></canvas>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Pie Chart</h5>
//                 <canvas
//                   id="pieChart"
//                   ref={pieChartRef}
//                   style={{ maxHeight: "400px" }}
//                 ></canvas>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
