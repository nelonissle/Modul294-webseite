const apiUrl = "http://localhost:5013/api/ServiceOrders"; // Adjust to your API

// 🔹 Check user authentication on page load
window.onload = async function () {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken || isTokenExpired(storedToken)) {
        alert("Session expired. Please log in again.");
        logout();
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

// 🔹 Check if the token is expired
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        const expiry = payload.exp * 1000; // Convert to milliseconds
        return Date.now() >= expiry; // 🔥 True if expired
    } catch (error) {
        return true; // Assume expired if decoding fails
    }
}
