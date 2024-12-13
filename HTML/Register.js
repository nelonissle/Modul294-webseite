document.getElementById("UserForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
        username,
        password
    };

    console.log(data);

    // Senden an Backend (POST-Request)
    fetch("http://localhost:5013/api/Users/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result => alert("Anmeldung erfolgreich!"))
      .catch(error => console.error("Fehler:", error));
});


