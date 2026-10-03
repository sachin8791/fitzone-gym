// =========================
// CHECK LOGIN
// =========================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


// =========================
// GET USER DATA
// =========================

const userData = JSON.parse(
    localStorage.getItem("user")
);


// =========================
// DISPLAY USER DATA
// =========================

if (userData) {

    document.getElementById("userName").textContent =
        userData.name;

    document.getElementById("profileName").textContent =
        userData.name;

    document.getElementById("profileEmail").textContent =
        userData.email;


    const firstLetter =
        userData.name.charAt(0).toUpperCase();

    document.getElementById("profileAvatar").textContent =
        firstLetter;
}


// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";
}


document
    .getElementById("logoutBtn")
    .addEventListener("click", logout);


document
    .getElementById("logoutBtn2")
    .addEventListener("click", logout);