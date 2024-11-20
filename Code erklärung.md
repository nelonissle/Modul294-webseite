Erklärung des Backend codes den wir für das Projekt erstellt haben. Ich werde euch unsern code in kleinen abschnitten erklären so das es auch jeder versteht. 
## Abschnitt 1: 
```javascript
document.getElementById("serviceForm").addEventListener("submit", function(e) { });
```
Der Code wartet auf das event, dass das Formular mit der ID serviceForm abgeschickt wird.
Wenn das Formular abgeschickt wird, wird die angegebene Funktion ausgeführt.

## Abschnitt 2:
```javascript 
e.preventDefault();
```
Das Standardverhalten des Formulars (die Seite neu zu laden) wird verhindert, sodass der Code die Daten programmgesteuert verarbeiten kann.

## Abschnitt 3: 
```javascript
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const service = document.getElementById("service").value;
const priority = document.getElementById("priority").value;
```
Die Werte aus den inputfeldern (name, email, phone, service, priority) werden abgerufen und in die Variablen gespeichert.
so Können  wir die daten später ausslesen unhd posten.