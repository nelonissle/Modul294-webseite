const apiUrl = "http://localhost:5013/api/ServiceOrders"; // Update with your actual API

// 🔹 Check user authentication on page load
window.onload = async function () {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
        window.location.href = "index.html"; // Redirect if no token
        return;
    }

    const userRole = getUserRoleFromToken(storedToken);
    if (userRole !== "Admin") {
        alert("Access Denied: Admins only.");
        window.location.href = "index.html"; // Redirect unauthorized users
    } else {
        document.getElementById("adminFeatures").style.display = "block";
    }
};

// 🔹 Extract user role from JWT token
function getUserRoleFromToken(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        return payload.role || null;
    } catch (error) {
        return null;
    }
}

// 🔹 Logout function
function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "index.html"; // Redirect to homepage
}
