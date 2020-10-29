const express = require("express");
const app = express();
const port = 4200;
app.use(express.json);

//Variables para la API
var nextSensorId = 0;
var nextMeasurementId = 0;
var sensors = [];

//Valores de referencia
var maxTemp = 19;
var minTemp = 32;

var sensorExample = {
  id: nextSensorId,
  nombre: "Sensor de temperatura - UAO - InfoLab",
  mediciones: [
    {
      idMeasurement: nextMeasurementId++,
      momento: new Date(),
      valor: Math.floor(Math.random() * (maxTemp - minTemp) + minTemp).toFixed(
        1
      ),
      unidad: "ºC"
    },
    {
      idMeasurement: nextMeasurementId++,
      momento: new Date(),
      valor: Math.floor(Math.random() * (maxTemp - minTemp) + minTemp).toFixed(
        1
      ),
      unidad: "ºC"
    }
  ]
};

//Agregar el sensor al arreglo con su id como posicion
sensors[nextSensorId++] = sensorExample;

//Retorna todos los sensores alamacenados
app.get("/sensores", (req, res) => {
  res.status(200).send(sensors);
});

app.post("/sensores", (req, res) => {
  let sensor = req.body;
  sensor.id = nextSensorId;
  sensors[nextSensorId++] = sensor;
  res.status(201).send(sensor);
});

app.get("sensores/:sensorId", (req, res) => {
  let sensorId = req.params.sensorId;
  let sensor = sensors[sensorId];

  if (sensor) {
    res.status(200).send(sensor);
  } else {
    res.status(400).send(`El sensor con id: ${sensorId} no existe`);
  }
});

app.post("/sensores/:sensorId/mediciones", (req, res) => {
  let sensorId = req.params.sensorId;
  let sensor = sensors[sensorId];

  if (sensor) {
    let measurement = req.body;
    measurement.id = nextMeasurementId++;
    if (sensor.mediciones) {
      sensor.mediciones = [];
    }
    sensor.mediciones.push(measurement);
    res.status(201).send(measurement);
  } else {
    res.status(404).send(`El sensor con id: ${sensorId} no existe`);
  }
});

// Inicializa el servidor para que escuche en el puerto determinado
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});
