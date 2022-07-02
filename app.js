const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

WEB_PORT = process.env.WEB_PORT || 3000;

const currRouter = require("./routes/currenciesRoute");
app.use("/convert", currRouter);




app.listen(WEB_PORT, () => {
    console.log(`App started and can be accessed through localhost:${WEB_PORT}`);
});