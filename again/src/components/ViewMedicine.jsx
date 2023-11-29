import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { useParams } from "react-router-dom";
import { utils } from "ethers";
const ViewMedicine = () => {
  const { getMedicine, address, connect, contract } = useStateContext();
  const [data, setData] = useState({});
  if (address) {
    console.log("Address", address);
  } else {
    connect();
  }
  const { NDC } = useParams();
  const iNDC = parseInt(NDC);
  const getty = async () => {
    try {
      const data = await contract.call("getMedicine", [iNDC]);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  getty();

  // const status = data.status ? utils.formatUnits(data.status, 0) : "";
  const StripID = data.StripID ? utils.formatUnits(data.StripID, 0) : "";

  function stry(conditions) {
    if (Array.isArray(conditions)) {
      return conditions.join(", ");
    } else if (typeof conditions === "string") {
      return conditions;
    } else {
      return "No conditions found.";
    }
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>PharmaChain</h1>
      </div>
      {/* End Page Title */}

      <section className="section profile">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title">Medicine Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Medicine Name
                      </div>
                      <div className="col-lg-9 col-md-8">
                        {data.MedicineName}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Strip ID</div>
                      <div className="col-lg-9 col-md-8">{StripID}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Conditions</div>
                      <div className="col-lg-9 col-md-8">
                        {stry(data.Conditions)}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Manufacturer
                      </div>
                      <div className="col-lg-9 col-md-8">
                        {data.Manufacturer}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Side Effects
                      </div>
                      <div className="col-lg-9 col-md-8">
                        {stry(data.sideEffects)}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Expiry Date</div>
                      <div className="col-lg-9 col-md-8">{data.ExpiryDate}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Manufacturing Date
                      </div>
                      <div className="col-lg-9 col-md-8">
                        {data.ManufacturingDate}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">
                        Batch Number
                      </div>
                      <div className="col-lg-9 col-md-8">
                        {data.BatchNumber}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">MRP</div>
                      <div className="col-lg-9 col-md-8">{data.Price}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Status</div>
                      <div className="col-lg-9 col-md-8">{data.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ViewMedicine;
