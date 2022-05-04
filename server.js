// Express
const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + "/images"));

// EJS
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//Datenbank
const DATABASE = "daten.db";
const db = require("better-sqlite3")(DATABASE);

//Server starten
app.listen(3000, function()
{
    console.log("listening on 3000")
});

// Aufruf der Startseite
app.get("/LernenMitVideos", function(req, res)
{
    res.sendFile(__dirname + "/views/startseite.html")
});

//Aufruf vom Login
app.get("/login", function(req, res)
{
    res.sendFile(__dirname + "/views/loginformular.html")
});