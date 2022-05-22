const express = require('express')
const Contenedor = require('./contenedor');

const contenedor = new Contenedor('productos.txt');

const app = express()

const PORT = process.env.PORT || 8080

app.get('/productos',async (request,response)=>{
  const products = await contenedor.getAll();

  let htmlProducts="";

  products.forEach(p => {
      htmlProducts = htmlProducts + `<tr><td scope="row">${p.id}</td><td>${p.title}</td><td>${p.price}</td><td>${p.thumbnail}</td></tr>`;
  });

  const html = `<table >
  <caption>Listado de Productos</caption>
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Thumbnail</th>
      </tr>
    </thead>
    <tbody>
      `+htmlProducts+`
     </tbody>
  </table>`

  response.send(html)
})

app.get('/productoRandom',async (request,response)=>{
  const id = Math.floor(Math.random() * 5) + 1;
  const product = await contenedor.getById(id);

  const htmlProducts = `<tr><td scope="row">${product.id}</td><td>${product.title}</td><td>${product.price}</td><td>${product.thumbnail}</td></tr>`;

  const html = `<table >
  <caption>Producto aleatorio</caption>
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Thumbnail</th>
      </tr>
    </thead>
    <tbody>
      `+htmlProducts+`
     </tbody>
  </table>`  

  response.send(html)
})

const server = app.listen(PORT,()=>{
  console.log(`Server http on ${PORT}...`)
})

server.on('error',error=> console.log('Error on server',error))