# Backend Code

Erklärung des Backend codes den wir für das Projekt erstellt haben. Ich werde euch unsern code in kleinen abschnitten erklären so das es auch jeder versteht.

## Abschnitt 1

```javascript
document.getElementById("serviceForm").addEventListener("submit", function(e) { });
```

Der Code wartet auf das event, dass das Formular mit der ID serviceForm abgeschickt wird.
Wenn das Formular abgeschickt wird, wird die angegebene Funktion ausgeführt.

## Abschnitt 2

```javascript
e.preventDefault();
```

Das Standardverhalten des Formulars (die Seite neu zu laden) wird verhindert, sodass der Code die Daten programmgesteuert verarbeiten kann.

## Abschnitt 3

```javascript
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const service = document.getElementById("service").value;
const priority = document.getElementById("priority").value;
```

Die Werte aus den inputfeldern (name, email, phone, service, priority) werden abgerufen und in die Variablen gespeichert.
so Können  wir die daten später ausslesen unhd posten.

## Abschnitt 4

```javascript
const priorityDays = {
    "Tief": 12,
    "Standard": 7,
    "Express": 5
};
```

Ein Objekt wird erstellt, das für jede Priorität (Tief, Standard, Express) eine Anzahl von Tagen enthält, die zu einem bestimmten Datum hinzugerechnet werden.

## Abschnitt 5

```javascript
const today = new Date();
today.setDate(today.getDate() + priorityDays[priority]);
```

Ein neues Datum (today) wird erstellt, das den aktuellen Tag repräsentiert.
Basierend auf der gewählten Priorität wird die Anzahl der Tage (aus dem priorityDays-Objekt) zum aktuellen Datum hinzugefügt.

## Abschnitt 6

```javascript
const pickupDate = today.toISOString().split('T')[0];
```

Das Datum wird in ISO-Format (z.B. "2024-11-20T12:34:56.789Z") umgewandelt und anschließend mit .split['T'](0) nur das Datum (ohne Uhrzeit) extrahiert.

## Abschnitt 7

```javascript
const data = {
    name,
    email,
    phone,
    service,
    priority,
    created_at: new Date().toISOString().split('T')[0],
    pickup_date: pickupDate
};
```

Ein data-Objekt wird erstellt, das alle erfassten Formulardaten enthält.
Zusätzlich wird das Erstellungsdatum (created_at) in einem ähnlichen Format wie das Pickup-Datum gespeichert.

## Abschnitt 8

```javascript
console.log(data);
```

Die erstellten Daten werden in der Konsole ausgegeben, um zu überprüfen, was gesendet wird.

## Abschnitt 9

```javascript
fetch("http://localhost:5000/api/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
})
```

Eine POST-Anfrage wird an das Backend gesendet. Die URL <http://localhost:5000/api/registration> ist der Endpunkt, an den die Formulardaten gesendet werden.
Der Content-Type-Header gibt an, dass die gesendeten Daten im JSON-Format sind.
Der body enthält die Formulardaten, die in einen JSON-String umgewandelt werden.

## Abschnitt 10

```javascript
.then(response => response.json())
  .then(result => alert("Anmeldung erfolgreich!"))
  .catch(error => console.error("Fehler:", error));
```

Wenn die Anfrage erfolgreich ist, wird die Antwort als JSON verarbeitet und eine Erfolgsmeldung angezeigt.
Wenn ein Fehler auftritt, wird dieser in der Konsole protokolliert.


```html 
<link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
```
Das ist der HTML LInk für Bootstrap 

Und das ist der alte HTml Code für die Forms Page: 
```html 
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service-Anmeldung</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
     <!-- Navbar -->
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="index.html">Jetstream Skiservice</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Menü umschalten">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.html">Startseite</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="form.html">Service anmelden</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html">Kontakt</a>
                    </li>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="aboutus.html">Über Uns</a>
                </li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="text-center py-4 bg-primary text-white">
        <h1>Service-Anmeldung</h1>
    </header>
    <main class="container mt-5">
        <form id="serviceForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="email">E-Mail:</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="phone">Telefon:</label>
                <input type="tel" id="phone" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="service">Dienstleistung:</label>
                <select id="service" class="form-control" required>
                    <option>Kleiner Service</option>
                    <option>Grosser Service</option>
                    <option>Rennski-Service</option>
                    <option>Bindung montieren und einstellen</option>
                    <option>Fell zuschneiden</option>
                    <option>Heisswachsen</option>
                </select>
            </div>
            <div class="form-group">
                <label for="priority">Priorität:</label>
                <select id="priority" class="form-control" required>
                    <option value="Tief">Tief (+5 Tage)</option>
                    <option value="Standard">Standard (7 Tage)</option>
                    <option value="Express">Express (-2 Tage)</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Absenden</button>
        </form>
    </main>
    <footer class="text-center py-4 bg-dark text-white">
        <p>&copy; 2024 Jetstream Skiservice</p>
    </footer>
    <script src="app.js"></script>
</body>
</html>
```