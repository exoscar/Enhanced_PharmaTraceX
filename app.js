const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const qr = require("qrcode");
app.use(cors());
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Myapi = "Kurama";
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://Kurama:kurama@macluster.ul1qntu.mongodb.net/";
const dbName = "Pharma";
const CollectionName = "Pharma";
const trcCollection = "TruckData";
const Alertsc = "Alerts";
const Meds = "Medicine";

async function connectToDb() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(CollectionName);
    const TruckDetails = db.collection(trcCollection);
    const Alerts = db.collection(Alertsc);
    const Medicine = db.collection(Meds);

    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      res.json("Welcome to the API");
    });

    app.post("/auth", async (req, res) => {
      const total = Object.keys(req.body).length;
      if (total == 2) {
        const { metamaskId, password } = req.body;
        try {
          const check = await collection.findOne({
            metamaskId: metamaskId,
          });
          if (check) {
            const passwordMatch = await bcrypt.compare(
              password,
              check.password
            );
            if (passwordMatch) {
              res.json("exists");
            } else {
              res.json("Wrong Password");
            }
          } else {
            res.json("not exists");
          }
        } catch (error) {
          res.json("not exists");
        }
      } else {
        const { companyName, metamaskId, password, confirmPassword } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (password === confirmPassword) {
          const data = {
            companyName: companyName,
            metamaskId: metamaskId,
            password: hashedPassword,
          };
          try {
            const check = await collection.findOne({ metamaskId: metamaskId });
            if (check) {
              res.json("exists");
            } else {
              res.json("not exists");
              await collection.insertMany([data]);
            }
          } catch (error) {
            res.json("not exists");
          }
        } else {
          res.json("passwords do not match");
        }
      }
    });

    app.post("/sendTruckDetails", async (req, res) => {
      const { RegistrationNumber, StripID, From, To, address } = req.body;
      const status = "0";
      const Tdata = {
        RegistrationNumber: RegistrationNumber,
        StripID: StripID,
        from: From,
        to: To,
        status: status,
        address: address,
      };
      // Tdata.StripID = Tdata.StripID.map(Number);
      console.log(Tdata);
      try {
        const resultt = await TruckDetails.findOne({
          RegistrationNumber: RegistrationNumber,
        });
        if (resultt) {
          res.json("exists");
        } else {
          await TruckDetails.insertMany([Tdata]);
          res.json("added");
        }
      } catch (error) {
        res.json({ message: "Error occurred" });
      }
    });
    app.post("/getTemp", async (req, res) => {
      const { temperature, humidity, RegistrationNumber } = req.body;
      console.log(temperature, humidity, RegistrationNumber);
      const apiKey = req.header("Authorization");

      if (apiKey !== Myapi) {
        res.status(401).send("Unauthorized");
        return;
      }

      try {
        const resulttt = await TruckDetails.findOne({
          RegistrationNumber: RegistrationNumber,
          status: "0",
        });

        if (resulttt) {
          const StripID = resulttt.StripID; // Access StripID directly from resulttt
          console.log(StripID);

          const chk = await Alerts.findOne({
            RegistrationNumber: RegistrationNumber,
            status: "0",
          });

          if (chk) {
            res.json("exists");
          } else {
            const Edata = {
              temperature: temperature,
              humidity: humidity,
              RegistrationNumber: RegistrationNumber,
              StripID: StripID, // Use StripID here
              status: "0",
            };

            await Alerts.insertMany([Edata]);
            res.json("Data inserted successfully.");
          }
        } else {
          console.log("No matching results found.");
          res.json("No matching results found.");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
      }
    });

    app.post("/addMedicine", async (req, res) => {
      const {
        MedicineName,
        StripID,
        Conditions,
        Quantity,
        Ingredients,
        SideEffects,
        ExpiryDate,
        ManufactureDate,
        BatchNumber,
        Price,
        address,
      } = req.body;
      const status = "Ideal";
      const con = Conditions.split(",");
      console.log(con);
      const temp = con[0].split("-");
      const hum = con[1].split("-");
      const Mdata = {
        MedicineName: MedicineName,
        StripID: StripID,
        mintemp: temp[0],
        maxtemp: temp[1],
        minhumi: hum[0],
        maxhumi: hum[1],
        Quantity: Quantity,
        Ingredients: Ingredients,
        SideEffects: SideEffects,
        ExpiryDate: ExpiryDate,
        ManufactureDate: ManufactureDate,
        BatchNumber: BatchNumber,
        Price: Price,
        status: status,
        address: address,
      };
      console.log(Mdata);
      try {
        const result = await Medicine.findOne({
          StripID: StripID,
        });

        if (result) {
          res.json("exists");
        } else {
          await Medicine.insertMany([Mdata]);
          const viewurl =
            "http://localhost:5173/viewMedicine/" + StripID.toString();
          qr.toDataURL(viewurl, (err, dataUrl) => {
            if (err) {
              res.status(500).send("Error generating QR code");
            } else {
              // Convert the data URL to an image buffer
              const imageBuffer = Buffer.from(
                dataUrl.replace(/^data:image\/\w+;base64,/, ""),
                "base64"
              );

              // Define the file path where the QR code image will be saved
              const filePath = "genqrs/qr-code" + StripID.toString() + ".png"; // Update to your desired folder and file name

              // Save the QR code image to the specified folder
              fs.writeFileSync(filePath, imageBuffer, "base64");
            }
          });

          res.json("added");
        }
      } catch (error) {
        res.json({ message: "Error occurred" });
      }
    });

    app.get("/alerts", async (req, res) => {
      try {
        const result = await Alerts.find({ status: "0" }).toArray();
        if (result) {
          res.json(result);
        } else {
          res.json("No alerts found");
        }
      } catch (error) {
        res.json({ message: "Error occurred" });
      }
    });

    app.post("/alerts", async (req, res) => {
      const { search } = req.body;
      try {
        const adata = await Alerts.find({
          RegistrationNumber: search,
        }).toArray();
        if (adata) {
          res.json(adata);
        }
      } catch (e) {
        console.log(e);
      }
    });

    app.get("/medicines", async (req, res) => {
      try {
        const mdata = await Medicine.find({}).toArray();
        if (mdata) {
          res.json(mdata);
        } else {
          res.json("No meds found");
        }
      } catch (error) {
        console.log(error);
      }
    });

    app.post("/medicines", async (req, res) => {
      const { search } = req.body;
      //const ser = parseInt(search, 10);
      console.log(typeof search);
      try {
        const mdata = await Medicine.find({ StripID: search }).toArray();
        if (mdata) {
          console.log(mdata);
          res.json(mdata);
        } else {
          res.json("no data found");
        }
      } catch (error) {
        console.log(error);
      }
    });

    app.post("/updateStatus", async (req, res) => {
      const { sid } = req.body;
      const sidd = sid.toString();
      try {
        const supdate = await Medicine.updateMany(
          { StripID: sidd },
          { $set: { status: "Corrupted" } }
        );

        const filter = {
          StripID: { $in: [sidd] }, // Check if StripID is in the array
          status: "0",
        };

        const update = {
          $set: {
            status: "corrupted",
          },
        };
        const aupte = await Alerts.updateMany(filter, update);
        if (aupte) {
          res.json("aupdated");
        } else {
          res.json("anot updated");
        }
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/trucks", async (req, res) => {
      try {
        const result = await TruckDetails.find({}).toArray();
        if (result) {
          res.json(result);
        } else {
          res.json("No alerts found");
        }
      } catch (error) {
        res.json({ message: "Error occurred" });
      }
    });

    app.post("/trucks", async (req, res) => {
      const { search } = req.body;
      try {
        const tdata = await TruckDetails.find({
          RegistrationNumber: search,
        }).toArray();
        if (tdata) {
          res.json(tdata);
        }
      } catch (e) {
        console.log(e);
      }
    });

    app.get("/generateQR", (req, res) => {
      const data = req.query.data;

      qr.toDataURL(data, (err, url) => {
        if (err) {
          res.status(500).json({ error: "Failed to generate QR code" });
        } else {
          res.send(url);
        }
      });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
  }
}
connectToDb();
