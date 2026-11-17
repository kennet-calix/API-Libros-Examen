
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

app.listen(PORT, ()=>{
    console.log(`El servidor esta ejecutando en http://localhost:${PORT}`);
});
    
