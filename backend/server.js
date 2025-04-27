const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Testowy endpoint
app.get('/', (req, res) => {
  res.send('Planer Dnia API działa 🚀');
});

// WŁAŚCIWY ENDPOINT POST /plan !!!
app.post('/plan', (req, res) => {
  const { nauka, praca, odpoczynek, relaks, sen } = req.body;

  if (nauka === undefined || praca === undefined || odpoczynek === undefined || relaks === undefined || sen === undefined) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane!' });
  }

  const plan = [];

  let godzinaStart = 8; // Zaczynamy dzień od godziny 8:00

  function dodajDoPlanu(nazwa, ileGodzin) {
    const godzinaKoniec = godzinaStart + ileGodzin;
    plan.push({
      od: `${godzinaStart}:00`,
      do: `${godzinaKoniec}:00`,
      aktywnosc: nazwa
    });
    godzinaStart = godzinaKoniec;
  }

  dodajDoPlanu('Nauka', nauka);
  dodajDoPlanu('Praca', praca);
  dodajDoPlanu('Odpoczynek', odpoczynek);
  dodajDoPlanu('Relaks', relaks);
  dodajDoPlanu('Sen', sen);

  res.json(plan);
});

// Nasłuch na porcie
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
