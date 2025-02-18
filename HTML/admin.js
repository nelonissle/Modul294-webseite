const apiUrl = "http://localhost:5013/api/ServiceOrders"; // Update if necessary
let authToken = localStorage.getItem("authToken") || null;

// ✅ Validate Token
async function validateToken(myApiUrl) {
    const tokenInput = document.getElementById("authToken").value;
    if (!tokenInput) {
        document.getElementById("authMessage").textContent = "Token cannot be empty.";
        return;
    }

    try {
        const response = await fetch(myApiUrl, {
            headers: { Authorization: `Bearer ${tokenInput}` },
        });

        if (response.ok) {
            authToken = tokenInput;
            document.getElementById("authMessage").textContent = "Token is valid.";
            document.getElementById("authMessage").classList.remove("text-danger");
            document.getElementById("authMessage").classList.add("text-success");
            localStorage.setItem("authToken", tokenInput);
        } else {
            throw new Error("Invalid token.");
        }
    } catch (error) {
        document.getElementById("authMessage").textContent = "Invalid token. Try again.";
    }
}

// ✅ Fetch Service Orders
async function fetchServiceOrders() {
    if (!authToken) return;

    try {
        const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${authToken}` } });
        const serviceOrders = await response.json();
        const tableBody = document.getElementById("serviceOrdersTable");
        tableBody.innerHTML = "";

        serviceOrders.forEach((order) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.name || ""}</td>
                <td>${order.email || ""}</td>
                <td>${order.phone || ""}</td>
                <td>${order.priority || ""}</td>
                <td>${order.service || ""}</td>
                <td>${order.assignedUser ? order.assignedUser.userId : "Not Assigned"}</td>
                <td>${order.status || "Not Set"}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="openUpdateModal('${order.orderId}', '${order.name}', '${order.email}', '${order.phone}', '${order.priority}', '${order.service}', '${order.status}')">✏️ Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteOrder('${order.orderId}')">🗑️ Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching service orders:", error);
    }
}

// ✅ Open Modal for Editing
function openUpdateModal(orderId, name, email, phone, priority, service, status) {
    document.getElementById("updateOrderId").value = orderId;
    document.getElementById("updateName").value = name;
    document.getElementById("updateEmail").value = email;
    document.getElementById("updatePhone").value = phone;
    document.getElementById("updatePriority").value = priority;
    document.getElementById("updateService").value = service;
    document.getElementById("updateStatus").value = status;

    const modal = new bootstrap.Modal(document.getElementById("updateModal"));
    modal.show();
}

// ✅ Save Edited Order
async function saveUpdate() {
    const orderId = document.getElementById("updateOrderId").value;
    const name = document.getElementById("updateName").value;
    const email = document.getElementById("updateEmail").value;
    const phone = document.getElementById("updatePhone").value;
    const priority = document.getElementById("updatePriority").value;
    const service = document.getElementById("updateService").value;
    const status = document.getElementById("updateStatus").value;

    const updatedOrder = {
        orderId,
        name,
        email,
        phone,
        priority,
        service,
        status
    };

    try {
        const response = await fetch(`${apiUrl}/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedOrder),
        });

        if (response.ok) {
            alert("Order updated successfully!");
            fetchServiceOrders(); // Refresh list
            const modal = bootstrap.Modal.getInstance(document.getElementById("updateModal"));
            modal.hide();
        } else {
            throw new Error("Failed to update order.");
        }
    } catch (error) {
        console.error("Error updating order:", error);
        alert("Failed to update order.");
    }
}

// ✅ Delete Order
async function deleteOrder(orderId) {
    if (confirm("Are you sure you want to delete this order?")) {
        try {
            const response = await fetch(`${apiUrl}/${orderId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.ok) {
                alert("Order deleted successfully!");
                fetchServiceOrders(); // Refresh list
            } else {
                throw new Error("Failed to delete order.");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Failed to delete order.");
        }
    }
}

// ✅ Auto-load orders when the page loads
fetchServiceOrders();
