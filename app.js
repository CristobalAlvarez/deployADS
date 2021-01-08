const { Router } = require("express");
const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors());
app.enable("trust proxy");
app.use(express.json());

app.use("/client", require("./routes/motherRoute"));
app.use("/lactancia", require("./routes/lactanciaRoute"));
app.use("/nutricion", require("./routes/nutricionRoute"));
app.use("/child", require("./routes/childRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/calendar", require("./routes/calendarRoute"));
app.use("/payment", require("./routes/paymentRoute"));
app.use("/utilities", require("./routes/utilitiesRoute"))
app.use("/course", require("./routes/courseRoute"))

var port = process.env.PORT || 3000

app.listen(port, console.log("El servidor esta corriendo puerto " + port + "."));