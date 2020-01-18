
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const routes = require("./routes");
const http = require("http"); 
const { setupWebsocket } = require("./webSocket")
 

const app = express();
const server = http.Server(app)

setupWebsocket(server)

mongoose.connect("mongodb+srv://guiselair:guiselair@cluster0-wg69j.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(3333, () => {console.log("Server Up on http://localhost:3333")});

