import React, { useEffect, useState } from "react";
import "../../public/assets/css/style.css";
import axios from "axios";
const SearchMedicine = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const VIEWMEDICINE_URL = import.meta.env.VITE_VIEW_MEDICINE_URL;
  const SEARCH_MEDICINE_URL = import.meta.env.VITE_SEARCH_MEDICINE_URL;
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [display, setDisplay] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    try {
      await axios
        .post(SEARCH_MEDICINE_URL, { search }, config)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setDisplay(res.data);
            setMedicines(res.data);
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

  async function handleCorrupt(e) {
    e.preventDefault();
    try {
      // const result = await axios.get("http://localhost:5000/medicines");
      // setMedicines(result.data);
      // console.log(medicines);
      const filteredData = medicines.filter((item) => item.status !== "Ideal");
      setDisplay(filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLatest(e) {
    e.preventDefault();
    try {
      // const result = await axios.get("http://localhost:5000/medicines");
      // setMedicines(result.data);
      // console.log(medicines);
      const filteredData = medicines.slice().reverse();
      setDisplay(filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAll(e) {
    e.preventDefault();
    try {
      const result = await axios.get(VIEWMEDICINE_URL, config);
      setDisplay(result.data);
      setMedicines(result.data);
      console.log(medicines);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(VIEWMEDICINE_URL, config);
        setDisplay(result.data);
        setMedicines(result.data);
        console.log(medicines);
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
            type="number"
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
              style={{ margin: "10px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="text-center">
        <button
          onClick={handleCorrupt}
          className="btn btn-primary"
          style={{ margin: "10px" }}
        >
          Corupted Medicines
        </button>
        <button
          onClick={handleLatest}
          className="btn btn-primary"
          style={{ margin: "10px" }}
        >
          Latest Medicines
        </button>
        <button onClick={handleAll} className="btn btn-primary">
          All Medicines
        </button>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Medicines</h5>

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
                {display.map((medicine, i) => (
                  <tr key={medicine.StripID}>
                    <th scope="row">{i + 1}</th>
                    <td>{medicine.MedicineName}</td>
                    <td>{medicine.StripID}</td>

                    <td>{medicine.BatchNumber}</td>
                    <td>{medicine.status}</td>
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

export default SearchMedicine;
