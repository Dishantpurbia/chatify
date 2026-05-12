const express = require("express");
const dotenv = require("dotenv");
const connectdb = require(`./config/db`);
const cookieparser = require(`cookie-parser`);
const cors = require(`cors`);

const authroute = require(`./routes/authroutes`);
const messageroute = require(`./routes/messageroute`);

dotenv.config();


const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
     origin:
          process.env.CLIENT_URL,
     credentials: true
}));
app.use(cookieparser());

connectdb();

app.use(`/api/auth`, authroute);
app.use(`/api/message`, messageroute);

app.listen(port, () =>
     console.log("server is running on port : " + port)
)