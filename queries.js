//Conexion con la base de datos
const { Client } = require('pg')

const connectionData = {
  user: 'egituliykvjiiy',
  host: 'ec2-54-155-226-153.eu-west-1.compute.amazonaws.com',
  database: 'd7bc39pq5tt2a4',
  password: 'ed8c746c45e02ff5dae1829c615e48677e2b1a2ecbfe4c6f63ed53e1d556c02e',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
}

const pool = new Client(connectionData)

pool.connect()

const get = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM x WHERE y', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const post = (request, response) => {
  const { a, b, c } = request.body
  pool.query('INSERT INTO x () VALUES ($1, $2, $3)', [a,b,c], 
    (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Ok`)
  })
}
const update = (request, response) => {
  const { a, b } = request.body
  pool.query(
    'UPDATE x.y SET a = $1, b = $2', [a, b],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Modified`)
    }
  )
}
const del = (request, response) => {
  const x = parseInt(request.params.id)

  pool.query('DELETE FROM y WHERE x = $1', [x], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Deleted`)
  })
}

// Queries:

const createAlumno = (request, response) => {
  const { NIA, nombre, apellido } = request.body
  pool.query('INSERT INTO public.alumnos ("NIA", "nombre", "apellido") VALUES ($1, $2, $3)', [NIA, nombre, apellido], 
    (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(201).send(`Ok`)
  })
}
const getAlumno = (request, response) => {
  const NIA = parseInt(request.params.NIA)
  pool.query('SELECT * FROM public.alumnos where "NIA" = $1', [NIA], (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const deleteAlumno = (request, response) => {
  const NIA = parseInt(request.params.NIA)

  pool.query('DELETE FROM public.alumnos WHERE "NIA" = $1', [NIA], (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).send(`Deleted`)
  })
}
const updateAlumno = (request, response) => {
  const { NIA, nombre, apellido } = request.body
  pool.query(
    'UPDATE public.alumnos SET "nombre" = $2, "apellido" = $3 WHERE "NIA" = $1', [NIA, nombre, apellido],
    (error, results) => {
      if (error) {
        response.status(400).send(`Error`)
        throw error
      }
      response.status(200).send(`Modified`)
    }
  )
}
const createAsignatura = (request, response) => {
  const { nombre, aula, dia, hora, ano } = request.body
  pool.query('INSERT INTO public.asignaturas ("nombre", "aula", "dia", "hora", "ano") VALUES ($1, $2, $3, $4, $5)', [nombre, aula, dia, hora, ano], 
    (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(201).send(`Ok`)
  })
}
const getAsignatura = (request, response) => {
  const ID = parseInt(request.params.ID)
  pool.query('SELECT * FROM public.asignaturas where "ID" = $1', [ID], (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).json(results.rows)
  })  
}
const updateAsignatura = (request, response) => {
  const { ID, nombre, aula, dia, hora, ano } = request.body
  pool.query(
    'UPDATE public.asignaturas SET "nombre" = $1, "aula" = $2, "dia" = $3, "hora" = $4, "ano" = $5 WHERE "ID" = $6', [nombre, aula, dia, hora, ano, ID],
    (error, results) => {
      if (error) {
        response.status(400).send(`Error`)
        throw error
      }
      response.status(200).send(`Modified`)
    }
  )
}
const deleteAsignatura = (request, response) => {
  const ID = parseInt(request.params.ID)

  pool.query('DELETE FROM public.asignaturas WHERE "ID" = $1', [ID], (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).send(`Deleted`)
  })
}
const createAlumnoAsignatura = (request, response) => {
  const { NIA, ID } = request.body
  pool.query('INSERT INTO public.alumnos_asignaturas ("ID", "NIA") VALUES ($1, $2)', [ID, NIA], 
    (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(201).send(`Ok`)
  })
}
const deleteAlumnoAsignatura = (request, response) => {
  const NIA = parseInt(request.params.NIA)
  const ID = parseInt(request.params.ID)

  pool.query('DELETE FROM public.alumnos_asignaturas WHERE "NIA" = $1 and "ID" = $2', [NIA, ID], (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).send(`Deleted`)
  })
}
const getAlumnos = (request, response) => {
  pool.query('SELECT * FROM public.alumnos', (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getAsignaturas = (request, response) => {
  pool.query('SELECT * FROM public.asignaturas', (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getAsignaturasAlumnoDia = (request, response) => {
  const NIA = parseInt(request.params.NIA)
  const dia = parseInt(request.params.dia)

  // Revisar
  pool.query('SELECT * FROM public.asignaturas WHERE "ID" IN (SELECT "ID" FROM public.alumnos_asignaturas where "NIA" = $1 ) and "dia" = $2', [NIA, dia], (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getAsignaturasAlumno = (request, response) => {
  const NIA = parseInt(request.params.NIA)

  pool.query('SELECT * FROM public.asignaturas WHERE "ID" IN (SELECT "ID" FROM public.alumnos_asignaturas where "NIA" = $1 )', [NIA], (error, results) => {
    if (error) {
      response.status(400).send(`Error`)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  createAlumno,
  getAlumno,
  deleteAlumno,
  updateAlumno,
  createAsignatura,
  getAsignatura,
  updateAsignatura,
  deleteAsignatura,
  createAlumnoAsignatura,
  deleteAlumnoAsignatura,
  getAlumnos,
  getAsignaturas,
  getAsignaturasAlumnoDia,
  getAsignaturasAlumno
}