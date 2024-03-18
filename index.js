require("dotenv").config();
const sequelize = require("./db");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

const messagesHandler = require("./websocketStuff/websocketStuff");
const router = require("./api/rootRouter");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();

const expressWs = require("express-ws")(app);
const aWss = expressWs.getWss();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(__dirname));

app.ws("/", (ws, req) => {
    ws.on("message", (message) => messagesHandler(message, ws, aWss));
});
app.use("/api", router);
app.use(errorHandler);

// Mb static useless
app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server is working on port ${PORT}`));
    } catch (e) {
        console.log(e);
    };
};

startApp();