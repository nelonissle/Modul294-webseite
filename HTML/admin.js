let authToken = localStorage.getItem("authToken");

// 🔹 Fetch service orders
async function fetchServiceOrders() {
    if (!authToken) {
        alert("Unauthorized: No valid token.");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const serviceOrders = await response.json();
        const tableBody = document.getElementById("serviceOrdersTable");
        tableBody.innerHTML = ""; // Clear table before populating

        serviceOrders.forEach((order) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.name || ""}</td>
                <td>${order.email || ""}</td>
                <td>${order.phone || ""}</td>
                <td>${order.priority || ""}</td>
                <td>${order.service || ""}</td>
                <td>${order.assignedUser ? order.assignedUser.name : "Not Assigned"}</td>
                <td>${order.status || "Not Set"}</td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="editOrder(${order.orderId})">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteOrder(${order.orderId})">Delete</button>
                </td>
              `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching service orders:", error);
        alert("Failed to load service orders.");
    }
}

// 🔹 Delete order function
async function deleteOrder(orderId) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
        const response = await fetch(`${apiUrl}/${orderId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.ok) {
            alert("Order deleted successfully");
            fetchServiceOrders(); // Refresh list
        } else {
            throw new Error("Failed to delete order.");
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        alert("Failed to delete order.");
    }
}
