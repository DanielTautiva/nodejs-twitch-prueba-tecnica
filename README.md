
# DOCUMENTACION PRUEBA TÉCNICA

## INSTALACION BASE DE DATOS

Gestor BD: MySQL(8+)

Nota: Es requerido que exista la conexión local para el funcionamiento del proyecto.

- Usuario: root 
- Contraseña: ""
- Puerto : 3306
- Host : 127.0.0.1

## INSTALACION - BACKEND

Node.JS

Framework: Express.js
ORM: TypeORM
Nodejs: 14.17+

1. npm install
5. npm run dev (Inicializa proyecto backend)
6. Ruta api http://localhost:3000/api


RUTAS BACKEND API: 

1. /api/get-games-top -> Retornar games mas vistos del momento
2.  /api/game/:id      -> Retornar juego por ID [mongo, msql]
3. /api/games         -> Listar juegos en BD local [mongo, msql]
4. /api/create        -> Crear juego [mongo, msql]
5. /api/update/:id    -> Actualizar juego [mongo, msql]
6. /api/delete/:id    -> Eliminar juego [mongo, msql]


## BIBLOTECAS USADAS

1. Express.js
2. Type ORM
3. Mongoose
4. Node Twitch

## POSTMAN COLLECTION

Nota: Adjunto en el resositorio agrego el archivo para consumir los servicios desde postman



### Hecho por: Daniel Tautiva S. @ 2021
