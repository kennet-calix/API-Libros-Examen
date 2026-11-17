
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let libros = [];

// GET: Obtener todos los libros
app.get('/libros',(req, res)=>{
    res.json({
        status:200,
        message:"success",
        data:libros
    });
});

 // POST: Registrar un libro
app.post('/libros', (req, res)=>{
    const libro = req.body;

    // Validar campos obligatorios
    if(!libro || libro.id === undefined ||
       !libro.titulo || !libro.autor ||
       libro.anioPublicacion === undefined ||
       !libro.estado){

        return res.status(400).json({
            status:400,
            message:"Todos los campos son obligatorios..."
        });
    }

    // Validar datos
    if(!Number.isInteger(libro.id) ||
       !Number.isInteger(libro.anioPublicacion) ||
       typeof libro.titulo !== 'string' ||
       !libro.titulo.trim() ||
       typeof libro.autor !== 'string' ||
       !libro.autor.trim() ||
       typeof libro.estado !== 'string' ||
       !libro.estado.trim()){

        return res.status(400).json({
            status:400,
            message:"Datos no validos..."
        });
    }

    // Verificar que el ID no exista
    let isBook = false;

    libros.forEach(registro => {
        if(registro.id === libro.id){
            isBook = true;
        }
    });

    if(isBook){
        res.status(400).json({
            status:400,
            message:"El ID existe"
        });
    }else{
        // Guardar el libro
        libros.push(libro);

        res.status(201).json({
            status:201,
            message:"success",
            data:libro
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta ejecutando en http://localhost:${PORT}`);
});
    
