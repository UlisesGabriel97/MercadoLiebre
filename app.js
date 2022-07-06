/* Livereload */
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();

/* Entry point */
const express = require('express')
const connectLivereload = require('connect-livereload')
const path = require('path')

const app=express()
const port=3000

/* Archivos estaticos */
app.use(express.static(path.resolve(__dirname,"public")))

/* Archivos estaticos monitoreados */
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

/* Rutas */
app.get("/",(req,res)=>res.sendFile(path.resolve(__dirname,"views","home.html")))

/* Funcion de actualizacion del servidor */
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

/* Levantamos el servidor con app listen */
app.listen(port,()=>console.log(`Servidor funcionando en http://localhost:${port}`))