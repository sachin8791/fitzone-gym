const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const response = await fetch("/api/contact", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                phone,
                service,
                message
            })
        });

        const data = await response.json();

        if (data.success) {
            formMessage.textContent = data.message;
            formMessage.style.color = "#22c55e";

            contactForm.reset();
        } else {
            formMessage.textContent = data.message;
            formMessage.style.color = "#ff3b30";
        }

    } catch (error) {
        console.error("Error:", error);

        formMessage.textContent =
            "Something went wrong. Please try again.";

        formMessage.style.color = "#ff3b30";
    }

    // Restore button
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
});