const  express = require("express");
const dotenv = require("dotenv");
const authroute = require(`./routes/authroutes`);
const connectdb = require(`./config/db`);

dotenv.config();


const  app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

connectdb();

app.use(`/api/auth`,authroute);

app.listen( port ,() => 
     console.log("server is running on port : "+port)
)