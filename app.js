
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

 // PUT: Actualizar un libro
app.put('/libros/:id',(req, res)=>{
    const id = Number(req.params.id);
    const libro = req.body;

    if(!Number.isInteger(id)){
        return res.status(400).json({
            status:400,
            message:"El ID debe ser un numero entero"
        });
    }

    if(!libro || typeof libro !== 'object' ||
       Array.isArray(libro)){
        return res.status(400).json({
            status:400,
            message:"Debe enviar los datos del libro"
        });
    }

    let isBook = false;
    let libroActualizado;

    libros.forEach(registro => {
        if(registro.id === id){
            isBook = true;
            libroActualizado = registro;
        }
    });

    if(!isBook){
        return res.status(404).json({
            status:404,
            message:"No se encontraron registros"
        });
    }

    // Validar los campos enviados
    if((libro.titulo !== undefined &&
        (typeof libro.titulo !== 'string' ||
         !libro.titulo.trim())) ||
       (libro.autor !== undefined &&
        (typeof libro.autor !== 'string' ||
         !libro.autor.trim())) ||
       (libro.anioPublicacion !== undefined &&
        !Number.isInteger(libro.anioPublicacion)) ||
       (libro.estado !== undefined &&
        (typeof libro.estado !== 'string' ||
         !libro.estado.trim()))){

        return res.status(400).json({
            status:400,
            message:"Datos no validos..."
        });
    }

    // Actualizar solo los campos enviados
    if(libro.titulo !== undefined){
        libroActualizado.titulo = libro.titulo;
    }

    if(libro.autor !== undefined){
        libroActualizado.autor = libro.autor;
    }

    if(libro.anioPublicacion !== undefined){
        libroActualizado.anioPublicacion = libro.anioPublicacion;
    }

    if(libro.estado !== undefined){
        libroActualizado.estado = libro.estado;
    }

    res.status(200).json({status:200,message:"success",data:libroActualizado
    });
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta ejecutando en http://localhost:${PORT}`);
});
    
