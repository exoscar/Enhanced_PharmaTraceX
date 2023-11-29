import React, { useEffect, useState } from "react";
import "../../public/assets/css/style.css";
import axios from "axios";
const ViewTruck = () => {
  const [search, setSearch] = useState("");
  const [trucks, setTrucks] = useState([]);
  const [display, setDisplay] = useState([]);
  async function handleSearch(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/trucks", { search })
        .then((res) => {
          if (res.data) {
            setDisplay(res.data);
            setTrucks(res.data);
          } else {
            console.log("no data");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDelivered(e) {
    e.preventDefault();
    try {
      // const result = await axios.get("http://localhost:5000/medicines");
      // setMedicines(result.data);
      // console.log(medicines);
      const filteredData = trucks.filter((item) => item.status === "Delivered");
      setDisplay(filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAll(e) {
    window.location.reload();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/trucks");
        setDisplay(result.data);
        setTrucks(result.data);
        console.log(trucks);
      } catch (error) {
        console.log(error);
      }
    };

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
              style={{ margin: "20px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="text-center">
        <button
          onClick={handleDelivered}
          className="btn btn-primary"
          style={{ margin: "10px", marginBottom: "10px" }}
        >
          Delivered Trucks
        </button>
        <button onClick={handleAll} className="btn btn-primary">
          All Trucks
        </button>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Trucks</h5>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Status</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Strip ID</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                </tr>
              </thead>
              <tbody>
                {display.map((truck, i) => (
                  <tr key={truck.RegistrationNumber}>
                    <th scope="row">{truck.status}</th>
                    <td>{truck.RegistrationNumber}</td>
                    <td>
                      {truck.StripID.map((id) => (
                        <span key={id}>{id}, </span>
                      ))}
                    </td>
                    <td>{truck.from}</td>
                    <td>{truck.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewTruck;
