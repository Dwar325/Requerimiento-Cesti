import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import blogRoutes from './routes/routes.js'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv';

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/blogs', blogRoutes)
dotenv.config();
try{
    await db.authenticate()
    console.log('Conexion exitosa a la DB')
}
catch(error){
    console.log(`El error es: ${error}`)
}

app.listen(8000, () => {
    console.log("Server corriendo en el puerto 8000")
})
