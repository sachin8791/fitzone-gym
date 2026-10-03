const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = 3000;

const JWT_SECRET = "fitzone_secret_key";

// =========================
// TEMPORARY USER STORAGE
// =========================

const users = [];

// =========================
// MIDDLEWARE
// =========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// =========================
// CONTACT FORM
// =========================

app.post("/api/contact", (req, res) => {

    const {
        name,
        email,
        phone,
        service,
        message
    } = req.body;

    if (!name || !email || !phone || !service || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });

    }

    console.log("\n==============================");
    console.log("NEW CONTACT FORM");
    console.log("==============================");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Service:", service);
    console.log("Message:", message);
    console.log("==============================\n");

    res.json({
        success: true,
        message: "Your message has been received."
    });

});

// =========================
// REGISTER
// =========================

app.post("/api/auth/register", async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    if (!name || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });

    }

    // Check if user already exists

    const existingUser = users.find(
        user => user.email === email.toLowerCase()
    );

    if (existingUser) {

        return res.status(400).json({
            success: false,
            message: "Email is already registered."
        });

    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword
    };

    users.push(newUser);

    // Show user in terminal

    console.log("\n==============================");
    console.log("NEW USER REGISTERED");
    console.log("==============================");
    console.log("ID:", newUser.id);
    console.log("Name:", newUser.name);
    console.log("Email:", newUser.email);
    console.log("Password: ********");
    console.log("==============================");
    console.log("Total Users:", users.length);
    console.log("==============================\n");

    res.status(201).json({
        success: true,
        message: "Account created successfully."
    });

});

// =========================
// LOGIN
// =========================

app.post("/api/auth/login", async (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please enter email and password."
        });

    }

    // Find user

    const user = users.find(
        user => user.email === email.toLowerCase()
    );

    if (!user) {

        return res.status(401).json({
            success: false,
            message: "Invalid email or password."
        });

    }

    // Check password

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {

        return res.status(401).json({
            success: false,
            message: "Invalid email or password."
        });

    }

    // Create login token

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    console.log("\n==============================");
    console.log("USER LOGIN");
    console.log("==============================");
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("Status: Login Successful");
    console.log("==============================\n");

    res.json({
        success: true,
        message: "Login successful.",
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });

});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `\nFitZone server running on http://localhost:${PORT}`
    );

});