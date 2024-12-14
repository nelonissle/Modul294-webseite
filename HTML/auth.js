// Function to validate the token
async function validateToken(myApiUrl) {
    const tokenInput = document.getElementById("authToken").value;

    if (!tokenInput) {
        document.getElementById("authMessage").textContent =
            "Error: Token cannot be empty.";
        return;
    }

    try {
        const response = await fetch(myApiUrl, {
            headers: {
                Authorization: `Bearer ${tokenInput}`,
            },
        });

        if (response.ok) {
            authToken = tokenInput; // Store the valid token
            document.getElementById("authMessage").textContent =
                "Token is valid.";
            document
                .getElementById("authMessage")
                .classList.remove("text-danger");
            document
                .getElementById("authMessage")
                .classList.add("text-success");
            localStorage.setItem("authToken", tokenInput); // Store token in local storage
        } else {
            throw new Error("Error: Invalid token.");
        }
    } catch (error) {
        authToken = null;
        document.getElementById("authMessage").textContent =
            "Error: Invalid token. Please try again.";
        document
            .getElementById("authMessage")
            .classList.remove("text-success");
        document.getElementById("authMessage").classList.add("text-danger");
    }
}
