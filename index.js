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

app.post('/api/alumno', db.createAlumno)
app.delete('/api/alumno/:NIA', db.deleteAlumno)
app.put('/api/alumno', db.updateAlumno)
app.post('/api/asignatura', db.createAsignatura)
app.put('/api/asignatura', db.updateAsignatura)
app.post('/api/alumnoAsignatura', db.createAlumnoAsignatura)
app.delete('/api/asignatura/:id/alumno/:NIA', db.deleteAlumnoAsignatura)
app.get('/api/alumnos', db.getAlumnos)
app.get('/api/asignaturas', db.getAsignaturas)
app.get('/api/alumno/:NIA/asingaturas/:dia', db.getAsignaturasAlumnoDia)
app.get('/api/alumno/:NIA/asingaturas', db.getAsignaturasAlumno)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})