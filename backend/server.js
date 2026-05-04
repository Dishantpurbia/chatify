const  express = require("express");
const dotenv = require("dotenv");
const authroute = require(`./routes/authroutes`);
const connectdb = require(`./config/db`);
const cookieparser = require(`cookie-parser`); 

dotenv.config();


const  app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cookieparser());

connectdb();

app.use(`/api/auth`,authroute);

app.listen( port ,() => 
     console.log("server is running on port : "+port)
)