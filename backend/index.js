const path = require("path")
const express = require("express");
const app = express();
const { Info, User } = require("./mongodb")
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const cors = require("cors");
const hbs = require("hbs");

const templatePath = path.join(__dirname, './templates')
app.use(express.json());
app.use(cors()); //For Using Razorpay  

app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))

// Login And Signup Start
app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
        confirmPassword: req.body.Cpassword
    }
    const checkuser = await User.findOne({ name: req.body.name })
    // const checkuser = await User.findOne({ name: req.body.name })
    if (checkuser) {
        return res.send('<script>alert("User already exists!");  window.location.href="/signup";</script>');
    } else {
        await User.insertMany([data])
        res.redirect("index.html")
    }
})

app.post("/login", async (req, res) => {
    try {
        const check = await User.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.redirect("index.html")
        }
        else {
            return res.send('<script>alert("Wrong passsword!"); window.location.href="/login";</script>');
        }
    }
    catch {
        return res.send('<script>alert("Invalid Input!"); window.location.href="/login";</script>');
    }
})
// Login And Signup End

// Registration Start
//Middleware for HTML files
const staticPath = path.join(__dirname, "../frontend")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticPath));

//Getting HTML file
app.get("/registration", function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + "registration.html");
});

//Data Entered And Posted By User
app.post("/registration", async function (req, res) {
    try {
        // Check If Required Fields Are Filled
        if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.guest || !req.body.state || !req.body.zip) {
            // If Any Required Field Is Missing, Send An Alert
            return res.send('<script>alert("Please fill all the required fields."); window.location.href="/registration.html";</script>');
        }

        let newInfo = new Info({
            Event: req.body.event,
            First_Name: req.body.fname,
            Last_Name: req.body.lname,
            Email: req.body.email,
            Address: req.body.address,
            City: req.body.city,
            State: req.body.state,
            Zip: req.body.zip,
            Guest: req.body.guest
        });

        await newInfo.save();

        // If Everything Is Successful, Redirect To "payment.html"
        res.redirect("payment.html");
    } catch (error) {
        // Handle Any Errors That Occur During Database Save Operation
        console.error(error);
        res.status(500).send('<script>alert("An error occurred while saving your information."); window.location.href="/registration.html";</script>');
    }
});
// Registration End

//Razorpay Payment API Start
app.post("/payment", async (req, res) => {
    let { amount } = req.body;
    let instance = new Razorpay({ key_id: 'rzp_test_JFFFUL2hS2Euas', key_secret: 'iCq21HUXLVgv4fAkjh5exkms' })
    let order = await instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
    });

    res.status(201).json({
        success: true,
        order,
        amount
    })
})
//Razorpay Payment API End

//Server Connection
app.listen(80, function () {
    console.log("Server is Running on Port:80")
})