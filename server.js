// Express
const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + "/public"));

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
app.get("/Login", function(req, res)
{
    res.sendFile(__dirname + "/views/loginformular.html")
});

//Aufruf der Registrierung
app.get("/Registrierung", function(req, res)
{
    res.sendFile(__dirname + "/views/Registrierung.html")
});

//Aufruf der Hauptseite
app.get("/Hauptseite", function(req, res)
{
    res.sendFile(__dirname + "/views/Hauptseite.html")
});

//Aufruf von Thema1
app.get("/BinomischeFormeln", function(req, res)
{
    res.sendFile(__dirname + "/views/Thema1.html")
});

//Aufruf von Thema2
app.get("/QuadratischeFunktionen", function(req, res)
{
    res.sendFile(__dirname + "/views/Thema2.html")
});

//Aufruf von Thema3
app.get("/SatzDesPythagoras", function(req, res)
{
    res.sendFile(__dirname + "/views/Thema3.html")
});