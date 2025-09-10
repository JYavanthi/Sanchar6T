const express = require("express");
const cors = require("cors");
const axios = require("axios");
const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());



// Database config for Windows Authentication
const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  driver: "msnodesqlv8",
};


// Itinerary endpoint
app.post("/itinerary", async (req, res) => {
  try {
    const { city, days } = req.body;

    const prompt = `
🌍 Plan a fantastic ${days}-day travel itinerary for the beautiful city of ${city}! ✈️🏙️
For each day, provide:
- 🕒 Timings
- 🏞️ Places to visit
- 🍴 Meals or snacks
- 🚗 Transportation tips
- 🎉 Fun activities

Format response clearly with headings like "Day 1", "Day 2".
Use emojis for fun.`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a travel itinerary planner." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let itineraryText = response.data.choices[0].message.content;

    // 🔹 Clean response
    // Remove markdown headers (#, ##, ### etc.)
    itineraryText = itineraryText.replace(/#+\s?/g, "");

    // Remove bold markers (**)
    itineraryText = itineraryText.replace(/\*\*/g, "");

    // Wrap "Day X" as <h3> with blue color
    itineraryText = itineraryText.replace(
      /(Day\s*\d+)/gi,
      `<h3 style="color:#226cb2;">$1</h3>`
    );

    res.json({ itinerary: itineraryText });
  } catch (error) {
    console.error(error.message, error.response?.data);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

// ================= BusBoardingPoint CRUD =================

// GET all BusBoardingPoints
app.get("/api/bus-boarding-points", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query(`
      SELECT TOP (1000) 
        [BusBoardingPointID], 
        [BusBooKingDetailID], 
        [BoardingPoint], 
        [BPArrivalTime], 
        [DroppingPoint], 
        [DropTime], 
        [Status], 
        [CreatedBy], 
        [CreatedDt], 
        [ModifiedBy], 
        [ModifiedDt] 
      FROM [dbo].[BusBoardingPoint]
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

// GET Boarding Point by ID
app.get("/api/bus-boarding-points/:id", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM [dbo].[BusBoardingPoint] WHERE BusBoardingPointID = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

// INSERT Boarding Point
app.post("/api/bus-boarding-points", async (req, res) => {
  const {
    BusBooKingDetailID,
    BoardingPoint,
    BPArrivalTime,
    DroppingPoint,
    DropTime,
    Status,
    CreatedBy,
  } = req.body;

  let pool;
  try {
    pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("BusBooKingDetailID", sql.Int, BusBooKingDetailID)
      .input("BoardingPoint", sql.NVarChar(250), BoardingPoint)
      .input("BPArrivalTime", sql.VarChar(50), BPArrivalTime) // keep varchar if stored as string
      .input("DroppingPoint", sql.NVarChar(250), DroppingPoint)
      .input("DropTime", sql.VarChar(50), DropTime) // keep varchar if stored as string
      .input("Status", sql.VarChar(50), Status)
      .input("CreatedBy", sql.Int, CreatedBy)
      .query(`
        INSERT INTO [dbo].[BusBoardingPoint]
          ([BusBooKingDetailID], [BoardingPoint], [BPArrivalTime], [DroppingPoint], [DropTime], [Status], [CreatedBy], [CreatedDt])
        VALUES
          (@BusBooKingDetailID, @BoardingPoint, @BPArrivalTime, @DroppingPoint, @DropTime, @Status, @CreatedBy, GETDATE());

        SELECT * FROM [dbo].[BusBoardingPoint] WHERE BusBoardingPointID = SCOPE_IDENTITY();
      `);

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("SQL Insert error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    if (pool) pool.close();
  }
});


// UPDATE Boarding Point
app.put("/api/bus-boarding-points/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      BusBooKingDetailID,
      BoardingPoint,
      BPArrivalTime,
      DroppingPoint,
      DropTime,
      Status,
      ModifiedBy,
    } = req.body;

    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input("id", sql.Int, id)
      .input("BusBooKingDetailID", sql.Int, BusBooKingDetailID)
      .input("BoardingPoint", sql.NVarChar(250), BoardingPoint)
      .input("BPArrivalTime", sql.VarChar(50), BPArrivalTime)
      .input("DroppingPoint", sql.NVarChar(250), DroppingPoint)
      .input("DropTime", sql.VarChar(50), DropTime)
      .input("Status", sql.VarChar(250), Status)
      .input("ModifiedBy", sql.Int, ModifiedBy)
      .query(`
        UPDATE [dbo].[BusBoardingPoint]
        SET 
          [BusBooKingDetailID] = @BusBooKingDetailID,
          [BoardingPoint] = @BoardingPoint,
          [BPArrivalTime] = @BPArrivalTime,
          [DroppingPoint] = @DroppingPoint,
          [DropTime] = @DropTime,
          [Status] = @Status,
          [ModifiedBy] = @ModifiedBy,
          [ModifiedDt] = GETDATE()
        WHERE BusBoardingPointID = @id;

        SELECT * FROM [dbo].[BusBoardingPoint] WHERE BusBoardingPointID = @id;
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});


// DELETE Boarding Point by ID
app.delete("/api/bus-boarding-points/:id", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM [dbo].[BusBoardingPoint] WHERE BusBoardingPointID = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Boarding Point not found" });
    }

    res.json({ message: "Boarding Point deleted successfully" });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

// ================= BusBoardingPoint CRUD =================



// ================= BusOperator CRUD =================

// GET all BusOperators
app.get("/api/bus-operators", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query(`
      SELECT TOP (1000) [BusOperatorID], [BusNo], [BusType], [BusSeats], 
             [FemaleSeatNo], [MaleSeatNo], [CreatedBy], [CreatedDt], 
             [ModifiedBy], [ModifiedDt] 
      FROM [dbo].[BusOperator]
    `);

    // ✅ Clean response
    const data = result.recordset.map(row => ({
      BusOperatorID: row.BusOperatorID,
      BusNo: row.BusNo,
      BusType: row.BusType,
      BusSeats: row.BusSeats,
      FemaleSeatNo: row.FemaleSeatNo,
      MaleSeatNo: row.MaleSeatNo,
      CreatedBy: row.CreatedBy
    }));

    res.json(data);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

// GET BusOperator by ID
app.get("/api/bus-operators/:id", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM [dbo].[BusOperator] WHERE BusOperatorID = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    const row = result.recordset[0];
    res.json({
      BusOperatorID: row.BusOperatorID,
      BusNo: row.BusNo,
      BusType: row.BusType,
      BusSeats: row.BusSeats,
      FemaleSeatNo: row.FemaleSeatNo,
      MaleSeatNo: row.MaleSeatNo,
      CreatedBy: row.CreatedBy
    });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
});

// INSERT BusOperator
app.post("/api/bus-operators", async (req, res) => {
  const { BusNo, BusType, BusSeats, FemaleSeatNo, MaleSeatNo, CreatedBy } = req.body;

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "I")
      .input("BusOperatorID", sql.Int, 0)
      .input("BusNo", sql.VarChar(200), BusNo)
      .input("BusType", sql.VarChar(500), BusType)
      .input("BusSeats", sql.VarChar(100), BusSeats)
      .input("FemaleSeatNo", sql.VarChar(150), FemaleSeatNo)
      .input("MaleSeatNo", sql.VarChar(150), MaleSeatNo)
      .input("CreatedBy", sql.Int, CreatedBy)
      .execute("sp_BusOperator");

    res.status(201).json({
      BusNo,
      BusType,
      BusSeats,
      FemaleSeatNo,
      MaleSeatNo,
      CreatedBy
    });
  } catch (err) {
    console.error("SQL Insert error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BusOperator
app.put("/api/bus-operators/:id", async (req, res) => {
  const { id } = req.params;
  const { BusNo, BusType, BusSeats, FemaleSeatNo, MaleSeatNo, CreatedBy } = req.body;

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "U")
      .input("BusOperatorID", sql.Int, id)
      .input("BusNo", sql.VarChar(200), BusNo)
      .input("BusType", sql.VarChar(500), BusType)
      .input("BusSeats", sql.VarChar(100), BusSeats)
      .input("FemaleSeatNo", sql.VarChar(150), FemaleSeatNo)
      .input("MaleSeatNo", sql.VarChar(150), MaleSeatNo)
      .input("CreatedBy", sql.Int, CreatedBy)
      .execute("sp_BusOperator");

    res.json({
      BusOperatorID: id,
      BusNo,
      BusType,
      BusSeats,
      FemaleSeatNo,
      MaleSeatNo,
      ModifiedBy: CreatedBy
    });
  } catch (err) {
    console.error("SQL Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE BusOperator
app.delete("/api/bus-operators/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "D")
      .input("BusOperatorID", sql.Int, id)
      .input("BusNo", sql.VarChar(200), null)
      .input("BusType", sql.VarChar(500), null)
      .input("BusSeats", sql.VarChar(100), null)
      .input("FemaleSeatNo", sql.VarChar(150), null)
      .input("MaleSeatNo", sql.VarChar(150), null)
      .input("CreatedBy", sql.Int, 0)
      .execute("sp_BusOperator");

    res.json({ BusOperatorID: id, message: "BusOperator deleted successfully" });
  } catch (err) {
    console.error("SQL Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= BusOperator CRUD =================


// ================= BusBoardingPoint CRUD =================

// GET all
app.get("/api/bus-boarding-points", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM [dbo].[BusBoardingPoint] ORDER BY BusBoardingPointID");
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL GET all error:", err);
    res.status(500).json({ error: "Server error fetching boarding points" });
  }
});

// GET by ID
app.get("/api/bus-boarding-points/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid BusBoardingPointID" });

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM [dbo].[BusBoardingPoint] WHERE BusBoardingPointID = @id");

    if (result.recordset.length === 0) return res.status(404).json({ message: "Boarding point not found" });

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("SQL GET by ID error:", err);
    res.status(500).json({ error: "Server error fetching boarding point" });
  }
});

// INSERT single or batch
app.post("/api/bus-boarding-points", async (req, res) => {
  let points = req.body;
  if (!Array.isArray(points)) points = [points]; // wrap single object into array

  try {
    const pool = await sql.connect(dbConfig);

    for (const pt of points) {
      const { BusBooKingDetailID, BoardingPoint, BPArrivalTime, DroppingPoint, DropTime, Status, CreatedBy } = pt;

      if (!BusBooKingDetailID || !BoardingPoint || !CreatedBy) {
        return res.status(400).json({ message: "BusBooKingDetailID, BoardingPoint, and CreatedBy are required" });
      }

      await pool.request()
        .input("Flag", sql.Char(1), "I")
        .input("BusBoardingPointID", sql.Int, 0)
        .input("BusBooKingDetailID", sql.Int, BusBooKingDetailID)
        .input("BoardingPoint", sql.NVarChar(250), BoardingPoint)
        .input("BPArrivalTime", sql.VarChar(50), BPArrivalTime || null)
        .input("DroppingPoint", sql.NVarChar(250), DroppingPoint || null)
        .input("DropTime", sql.VarChar(50), DropTime || null)
        .input("Status", sql.VarChar(50), Status || "Active")
        .input("CreatedBy", sql.Int, CreatedBy)
        .execute("sp_BusBoardingPoint");
    }

    res.status(201).json({ message: "Boarding points created successfully" });
  } catch (err) {
    console.error("SQL INSERT error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/api/bus-boarding-points/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid BusBoardingPointID" });

  const { BusBooKingDetailID, BoardingPoint, BPArrivalTime, DroppingPoint, DropTime, Status, ModifiedBy } = req.body;
  if (!ModifiedBy) return res.status(400).json({ message: "ModifiedBy is required" });

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "U")
      .input("BusBoardingPointID", sql.Int, id)
      .input("BusBooKingDetailID", sql.Int, BusBooKingDetailID || 0)
      .input("BoardingPoint", sql.NVarChar(250), BoardingPoint || null)
      .input("BPArrivalTime", sql.VarChar(50), BPArrivalTime || null)
      .input("DroppingPoint", sql.NVarChar(250), DroppingPoint || null)
      .input("DropTime", sql.VarChar(50), DropTime || null)
      .input("Status", sql.VarChar(50), Status || "Active")
      .input("ModifiedBy", sql.Int, ModifiedBy)
      .execute("sp_BusBoardingPoint");

    res.json({ message: "Boarding point updated successfully" });
  } catch (err) {
    console.error("SQL UPDATE error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/bus-boarding-points/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid BusBoardingPointID" });

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "D")
      .input("BusBoardingPointID", sql.Int, id)
      .input("BusBooKingDetailID", sql.Int, 0)
      .input("BoardingPoint", sql.NVarChar(250), null)
      .input("BPArrivalTime", sql.VarChar(50), null)
      .input("DroppingPoint", sql.NVarChar(250), null)
      .input("DropTime", sql.VarChar(50), null)
      .input("Status", sql.VarChar(50), null)
      .input("ModifiedBy", sql.Int, 0)
      .execute("sp_BusBoardingPoint");

    res.json({ message: "Boarding point deleted successfully" });
  } catch (err) {
    console.error("SQL DELETE error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= BusBoardingPoint CRUD =================

// ================= BusBookingDetails CRUD =================

// GET all BusBookingDetails
app.get("/api/bus-booking-details", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query(`
      SELECT TOP (1000) *
      FROM [dbo].[BusBookingDetails]
      ORDER BY BusBooKingDetailID
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL GET error:", err);
    res.status(500).json({ error: "Server error fetching bus booking details" });
  }
});

// GET BusBookingDetail by ID
app.get("/api/bus-booking-details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid BusBooKingDetailID" });

  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input("BusBooKingDetailID", sql.Int, id)
      .query("SELECT * FROM [dbo].[BusBookingDetails] WHERE BusBooKingDetailID = @BusBooKingDetailID");

    if (result.recordset.length === 0) return res.status(404).json({ message: "Bus booking detail not found" });
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("SQL GET by ID error:", err);
    res.status(500).json({ error: "Server error fetching bus booking detail" });
  }
});

// INSERT BusBookingDetail
app.post("/api/bus-booking-details", async (req, res) => {
  const { OperatorID, PackageID, WkEndSeatPrice, WkDaySeatPrice, DepartureTime, Arrivaltime, Status, CreatedBy } = req.body;

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "I")
      .input("BusBooKingDetailID", sql.Int, 0)
      .input("OperatorID", sql.Int, OperatorID)
      .input("PackageID", sql.Int, PackageID)
      .input("WkEndSeatPrice", sql.Numeric(18,0), WkEndSeatPrice)
      .input("WkDaySeatPrice", sql.Numeric(18,0), WkDaySeatPrice)
      .input("DepartureTime", sql.DateTime, DepartureTime)
      .input("Arrivaltime", sql.DateTime, Arrivaltime)
      .input("AvaialbleSeats", sql.DateTime, null)
      .input("Status", sql.VarChar(250), Status)
      .input("CreatedBy", sql.Int, CreatedBy)
      .execute("sp_BusBookingDetails");

    res.status(201).json({ message: "Bus booking detail created successfully" });
  } catch (err) {
    console.error("SQL INSERT error:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BusBookingDetail
app.put("/api/bus-booking-details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { OperatorID, PackageID, WkEndSeatPrice, WkDaySeatPrice, DepartureTime, Arrivaltime, Status, ModifiedBy } = req.body;

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "U")
      .input("BusBooKingDetailID", sql.Int, id)
      .input("OperatorID", sql.Int, OperatorID)
      .input("PackageID", sql.Int, PackageID)
      .input("WkEndSeatPrice", sql.Numeric(18,0), WkEndSeatPrice)
      .input("WkDaySeatPrice", sql.Numeric(18,0), WkDaySeatPrice)
      .input("DepartureTime", sql.DateTime, DepartureTime)
      .input("Arrivaltime", sql.DateTime, Arrivaltime)
      .input("AvaialbleSeats", sql.DateTime, null)
      .input("Status", sql.VarChar(250), Status)
      .input("CreatedBy", sql.Int, ModifiedBy)
      .execute("sp_BusBookingDetails");

    res.json({ message: "Bus booking detail updated successfully" });
  } catch (err) {
    console.error("SQL UPDATE error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE BusBookingDetail
app.delete("/api/bus-booking-details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid BusBooKingDetailID" });

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input("Flag", sql.Char(1), "D")
      .input("BusBooKingDetailID", sql.Int, id)
      .input("OperatorID", sql.Int, 0)
      .input("PackageID", sql.Int, 0)
      .input("WkEndSeatPrice", sql.Numeric(18,0), 0)
      .input("WkDaySeatPrice", sql.Numeric(18,0), 0)
      .input("DepartureTime", sql.DateTime, null)
      .input("Arrivaltime", sql.DateTime, null)
      .input("AvaialbleSeats", sql.DateTime, null)
      .input("Status", sql.VarChar(250), null)
      .input("CreatedBy", sql.Int, 0)
      .execute("sp_BusBookingDetails");

    res.json({ message: "Bus booking detail deleted successfully" });
  } catch (err) {
    console.error("SQL DELETE error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= BusBookingDetails CRUD =================



// GET all bus booking details with amenities
app.get("/api/bus-details", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);

    const result = await pool.request().query(`
      SELECT 
        b.[BusBooKingDetailID],
        b.[OperatorID],
        b.[PackageID],
        b.[WkEndSeatPrice],
        b.[WkDaySeatPrice],
        b.[DepartureTime],
        b.[Arrivaltime],
        b.[Status],
        b.[PackageName],
        b.[BusNo],
        b.[BusSeats],
        b.[BusType],
        b.[FemaleSeatNo],
        a.[AMName]
      FROM [dbo].[vw_BusBookingDetails] b
      LEFT JOIN [dbo].[vw_BusAmenities] a
        ON b.OperatorID = a.BusOperatorID
    `);

    // Now group amenities for each bus
    const buses = {};
    result.recordset.forEach(row => {
      if (!buses[row.BusBooKingDetailID]) {
        buses[row.BusBooKingDetailID] = {
          BusBooKingDetailID: row.BusBooKingDetailID,
          OperatorID: row.OperatorID,
          PackageID: row.PackageID,
          WkEndSeatPrice: row.WkEndSeatPrice,
          WkDaySeatPrice: row.WkDaySeatPrice,
          DepartureTime: row.DepartureTime,
          Arrivaltime: row.Arrivaltime,
          Status: row.Status,
          PackageName: row.PackageName,
          BusNo: row.BusNo,
          BusSeats: row.BusSeats,
          BusType: row.BusType,
          FemaleSeatNo: row.FemaleSeatNo,
          amenities: []
        };
      }
      if (row.AMName) {
        buses[row.BusBooKingDetailID].amenities.push(row.AMName);
      }
    });

    const finalData = Object.values(buses);
    console.log("Bus Details with amenities:", finalData);
    res.json(finalData);

  } catch (err) {
    console.error("Error fetching bus details:", err);
    res.status(500).json({ error: "Server error fetching bus details" });
  }
});


// API route to get bus seats
app.post("/api/bus-seats", async (req, res) => {
  const { BusBookingDetaislID, StartDate, CreatedBy } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool
      .request()
      .input("BusBookingDetaislID", sql.Int, BusBookingDetaislID)
      .input("StartDate", sql.DateTime, StartDate)
      .input("CreatedBy", sql.Int, CreatedBy)
      .execute("sp_BusBookedSeat");

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (err) {
    console.error("SQL Error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching bus seats",
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
