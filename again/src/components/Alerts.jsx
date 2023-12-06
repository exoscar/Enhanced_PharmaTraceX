import React, { useEffect, useState } from "react";
import "../../public/assets/css/style.css";
import axios from "axios";
import { useStateContext } from "../context";
const Alerts = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const SEARCH_ALERTS_URL = import.meta.env.VITE_SEARCH_ALERTS_URL;
  const ALERTUPDATEURL = import.meta.env.VITE_ALERTUPDATEURL;
  const VIEW_ALERTS_URL = import.meta.env.VITE_VIEW_ALERTS_URL;
  const VITE_VIEW_MEDICINE_URL = import.meta.env.VITE_VIEW_MEDICINE_URL;
  const { updateManyMedicine, connect, address } = useStateContext();
  if (address) {
    console.log("Address", address);
  } else {
    connect();
  }

  const [form, setForm] = useState({
    sids: [], // Initialize with an array of strip IDs you want to update
  });

  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [medicines, setMedicines] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    try {
      await axios
        .post(SEARCH_ALERTS_URL, { search }, config)
        .then((res) => {
          if (res.data) {
            setAlerts(res.data);
          } else {
            console.log("no data");
          }
        })
        .catch((error) => {
          if (error.response) {
            // Display the server's error message for a Bad Request
            alert(error.response.data.message);
          } else {
            console.error("An error occurred:", error);
            alert(
              "An error occurred. Please check the console for more details."
            );
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  function extractStripData(jsonArray) {
    const result = [];

    jsonArray.forEach((item) => {
      if (item.StripID && Array.isArray(item.StripID)) {
        item.StripID.forEach((idStr) => {
          const ids = idStr.split("-");
          if (ids.length === 2) {
            const start = parseInt(ids[0], 10);
            const end = parseInt(ids[1], 10);
            for (let i = start; i <= end; i++) {
              result.push({
                StripID: i,
                Temperature: item.temperature,
                Humidity: item.humidity,
              });
            }
          } else {
            result.push({
              StripID: parseInt(idStr, 10),
              Temperature: item.temperature,
              Humidity: item.humidity,
            });
          }
        });
      }
    });

    return result;
  }

  function filterStripData(sthData, mediData) {
    const result = [];
    sthData.forEach((item) => {
      mediData.forEach((medi) => {
        if (parseInt(medi.StripID) === item.StripID) {
          const temp = parseFloat(item.Temperature);
          const humidity = parseFloat(item.Humidity);
          const mtemp = parseFloat(medi.mintemp);
          const matemp = parseFloat(medi.maxtemp);
          const mhumidity = parseFloat(medi.minhumi);
          const mahumidity = parseFloat(medi.maxhumi);
          if (
            temp < mtemp ||
            temp > matemp ||
            humidity < mhumidity ||
            humidity > mahumidity
          ) {
            result.push(item.StripID);
          }
        }
      });
    });
    return result;
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const hehe = extractStripData(alerts);
    console.log(hehe);
    const sids = filterStripData(hehe, medicines);

    setForm({ sids });
    console.log(sids);
    try {
      await updateManyMedicine({ sids });

      for (const sid of sids) {
        console.log(sid);
        try {
          await axios
            .post(ALERTUPDATEURL, { sid }, config)
            .then((res) => {
              alert(res.data.message);
            })
            .catch((error) => {
              if (error.response) {
                // Display the server's error message for a Bad Request
                alert(error.response.data.message);
              } else {
                console.error("An error occurred:", error);
                alert(
                  "An error occurred. Please check the console for more details."
                );
              }
            });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(VIEW_ALERTS_URL, config);
        setAlerts(result.data);
        const hehe = extractStripData(result.data);

        console.log(hehe);

        // console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMedicine = async () => {
      try {
        const medi = await axios.get(VITE_VIEW_MEDICINE_URL, config);
        setMedicines(medi.data);
        console.log(medi.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedicine();
    fetchData();
  }, []);

  return (
    <main id="main" className="main">
      <div className="search-bar">
        <form className="search-form d-flex align-items-center">
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
            style={{
              padding: "0.38em",
              borderRadius: "8px",
              border: "1px solid black",
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="text-center">
            <button
              onClick={handleSearch}
              className="btn btn-primary"
              style={{
                margin: "10px",
              }}
            >
              Submit
            </button>
            {/* <input
              type="submit"
              onClick={handleSearch}
              className="btn"
              defaultValue="Sign up"
            /> */}
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={handleUpdate}
            className="btn btn-primary"
            style={{ marginBottom: "0.5rem" }}
          >
            Update Alerts
          </button>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Alerts</h5>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Strip ID</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Humidity</th>
                </tr>
              </thead>

              <tbody>
                {/* Check if alerts is an array before using map */}
                {Array.isArray(alerts) ? (
                  alerts.map((alertt, i) => (
                    <tr key={alertt.RegistrationNumber}>
                      <th scope="row">{i + 1}</th>
                      <td>{alertt.RegistrationNumber}</td>
                      <td>
                        {alertt.StripID.map((id) => (
                          <span key={id}>{id}, </span>
                        ))}
                      </td>
                      <td>{alertt.temperature}</td>
                      <td>{alertt.humidity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Alerts Found</td>
                  </tr>
                )}
              </tbody>

              {/* <tbody>
                {alerts.map((alertt, i) => (
                  <tr key={alertt.RegistrationNumber}>
                    <th scope="row">{i + 1}</th>
                    <td>{alertt.RegistrationNumber}</td>
                    <td>
                      {alertt.StripID.map((id) => (
                        <span key={id}>{id}, </span>
                      ))}
                    </td>
                    <td>{alertt.temperature}</td>
                    <td>{alertt.humidity}</td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Alerts;
