// Express
const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + "/public"));

// In express-session
const session = require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave: false
}));

// EJS
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//Datenbank
const DATABASE = "benutzer.db";
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






// loingErfolgreich
app.post("/erfolg", function(req, res){
    const params_name = req.body.benutzername;
    const params_key = req.body.passwort;
    const result = db.prepare("select * from benutzer where name = ? and passwort = ?").get(params_name, params_key);

    if(result!= undefined){
        req.session.username = params_name;
        res.render("loginErfolgreich",{"benutzername" : params_name});
        }
    else{
        res.render("loginFehlgeschlagen");
    }
});




//Aufruf der Registrierung
app.get("/Registrierung", function(req, res)
{
    res.render("Registrierung")
});

// neuer benutzer
app.post("/registrieren", function(req, res){
    const param_name = req.body.benutzername;
    const param_passwort = req.body.passwort;

    db.prepare("INSERT INTO benutzer (name, passwort) VALUES(?, ?)").run(param_name, param_passwort);
    res.redirect("/login");
});

//Aufruf der Hauptseite
app.get("/Hauptseite", function(req, res)
{
    if(req.session.username){

        res.sendFile(__dirname + "/views/Hauptseite.html")
    }
    else{
        res.redirect("/login")
    }
});

//Aufruf von Thema1
app.get("/BinomischeFormeln", function(req, res)
{
    
    if(req.session.username){

        res.sendFile(__dirname + "/views/Thema1.html")
    }
    else{
        res.redirect("/login")
    }
});

//Aufruf von Thema2
app.get("/QuadratischeFunktionen", function(req, res)
{
    if(req.session.username){

        res.sendFile(__dirname + "/views/Thema2.html")
    }
    else{
        res.redirect("/login")
    }
});

//Aufruf von Thema3
app.get("/SatzDesPythagoras", function(req, res)
{
    if(req.session.username){

        res.sendFile(__dirname + "/views/Thema3.html")
    }
    else{
        res.redirect("/login")
    }
});


// Initalisirung body-paser
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//logout
app.get("/logout", function(req, res){

    req.session.destroy()
    res.redirect("/LernenMitVideos")
})

