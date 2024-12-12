document.getElementById("serviceForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const priority = document.getElementById("priority").value;

    const priorityDays = {
        "Tief": 12,
        "Standard": 7,
        "Express": 5
        };

    const today = new Date();
    today.setDate(today.getDate() + priorityDays[priority]);

    const pickupDate = today.toISOString().split('T')[0];

    const data = {
        name,
        email,
        phone,
        service,
        priority,
        created_at: new Date().toISOString().split('T')[0],
        pickup_date: pickupDate
    };

    console.log(data);

    // Senden an Backend (POST-Request)
    fetch("http://localhost:5013/api/ServiceOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result => alert("Anmeldung erfolgreich!"))
      .catch(error => console.error("Fehler:", error));
});


