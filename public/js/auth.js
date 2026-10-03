const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const authMessage = document.getElementById("authMessage");


// ==================================================
// REGISTER
// ==================================================

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Basic validation
        if (!name || !email || !password) {

            authMessage.textContent = "Please fill all fields.";
            authMessage.style.color = "#ff3b30";

            return;
        }

        if (password.length < 6) {

            authMessage.textContent =
                "Password must be at least 6 characters.";

            authMessage.style.color = "#ff3b30";

            return;
        }

        // Loading message
        authMessage.textContent = "Creating account...";
        authMessage.style.color = "#aaa";

        try {

            const response = await fetch("/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            });


            const data = await response.json();


            // =========================
            // REGISTER SUCCESS
            // =========================

            if (response.ok && data.success) {

                authMessage.textContent =
                    data.message || "Account created successfully.";

                authMessage.style.color = "#22c55e";

                registerForm.reset();


                // Redirect to login
                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1500);


            } else {

                authMessage.textContent =
                    data.message || "Registration failed.";

                authMessage.style.color = "#ff3b30";

            }


        } catch (error) {

            console.error("Register Error:", error);

            authMessage.textContent =
                "Server error. Please try again.";

            authMessage.style.color = "#ff3b30";

        }

    });

}


// ==================================================
// LOGIN
// ==================================================

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        // Basic validation
        if (!email || !password) {

            authMessage.textContent =
                "Please enter email and password.";

            authMessage.style.color = "#ff3b30";

            return;
        }


        // Loading message
        authMessage.textContent = "Signing in...";
        authMessage.style.color = "#aaa";


        try {

            const response = await fetch("/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });


            const data = await response.json();


            // =========================
            // LOGIN SUCCESS
            // =========================

            if (response.ok && data.success) {

                // Save JWT token
                localStorage.setItem(
                    "token",
                    data.token
                );


                // Save user information
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                authMessage.textContent =
                    "Login successful!";

                authMessage.style.color = "#22c55e";


                // Redirect to account page
                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 1000);


            } else {

                authMessage.textContent =
                    data.message || "Invalid email or password.";

                authMessage.style.color = "#ff3b30";

            }


        } catch (error) {

            console.error("Login Error:", error);

            authMessage.textContent =
                "Server error. Please try again.";

            authMessage.style.color = "#ff3b30";

        }

    });

}