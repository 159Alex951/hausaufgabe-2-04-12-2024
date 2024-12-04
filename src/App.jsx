import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";

// Funktion zur Umrechnung von WGS84 in LV95
const wgs84ToLv95 = (lat, lon) => {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;

  const a = 6378137.0; // Halbmesser Äquator
  const f = 1 / 298.257223563; // Abplattung
  const b = a * (1 - f); // Halbmesser Pol
  const e2 = (a ** 2 - b ** 2) / a ** 2; // Exzentrizität
  const k = Math.sqrt(1 - e2 * Math.sin(latRad) ** 2);

  const x = lonRad * (a / k) - 26782.5;
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2)) * (a / k) - 169028.66;

  return {
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
  };
};

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [result, setResult] = useState(null);

  const convertCoordinates = () => {
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);

    if (isNaN(parsedLat) || isNaN(parsedLon)) {
      setResult({
        error: "Ungültige Eingabe. Bitte geben Sie gültige Zahlen ein.",
      });
      return;
    }

    const converted = wgs84ToLv95(parsedLat, parsedLon);
    setResult(converted);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        WGS84 zu LV95 Konverter
      </Typography>
      <TextField
        label="Breitengrad (Latitude)"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Längengrad (Longitude)"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={convertCoordinates}
        style={{ marginTop: "20px" }}
      >
        Umrechnen
      </Button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.error ? (
            <Typography color="error">{result.error}</Typography>
          ) : (
            <>
              <Typography variant="h6">Ergebnis (LV95):</Typography>
              <Typography>X: {result.x} m</Typography>
              <Typography>Y: {result.y} m</Typography>
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export default App;
