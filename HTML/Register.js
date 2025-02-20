document.getElementById("UserForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = { username, password };

    console.log("🔍 Sending registration request:", JSON.stringify(data));

    try {
        const response = await fetch("http://localhost:5013/api/Users/Register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("❌ Server Response:", result);
            alert("❌ Registration failed. Check the console for details.");
            return;
        }

        if (result.token) {
            localStorage.setItem("authToken", result.token); // ✅ Store JWT token
            alert("✅ Registration successful!");
            window.location.href = "Adminpage.html"; // Redirect after registration
        } else {
            alert("❌ Registration successful, but token was not received.");
        }
    } catch (error) {
        console.error("❌ Error during registration:", error);
        alert("❌ An error occurred. Please check your connection and try again.");
    }
});
