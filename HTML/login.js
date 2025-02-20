document.getElementById("UserLoginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = { username, password };

    console.log("Sending login data:", data);

    try {
        const response = await fetch("http://localhost:5013/api/Users/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert("Invalid username or password.");
            } else {
                alert("An error occurred during login. Please try again.");
            }
            return;
        }

        const result = await response.json();

        if (result.token) {
            localStorage.setItem("authToken", result.token); // 🔥 Store JWT token

            alert("Login successful!");
            window.location.href = "Adminpage.html"; // Redirect to admin page
        } else {
            alert("Login failed. Token not received.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please check your connection and try again.");
    }
});
