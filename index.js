const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())
 
//Requerimos el fichero queries.js
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/api/alumno/:NIA', db.getAlumno)
app.get('/api/alumnos', db.getAlumnos)
app.post('/api/alumno', db.createAlumno)
app.delete('/api/alumno/:NIA', db.deleteAlumno)
app.put('/api/alumno', db.updateAlumno)

app.get('/api/asignatura/:ID', db.getAsignatura)
app.get('/api/asignaturas', db.getAsignaturas)
app.post('/api/asignatura', db.createAsignatura)
app.put('/api/asignatura', db.updateAsignatura)
app.delete('/api/asignatura/:ID', db.deleteAsignatura)

app.get('/api/alumno/:NIA/asingaturas', db.getAsignaturasAlumno)
app.get('/api/alumno/:NIA/asingaturas/:dia', db.getAsignaturasAlumnoDia)
app.post('/api/alumnoAsignatura', db.createAlumnoAsignatura)
app.delete('/api/asignatura/:ID/alumno/:NIA', db.deleteAlumnoAsignatura)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})