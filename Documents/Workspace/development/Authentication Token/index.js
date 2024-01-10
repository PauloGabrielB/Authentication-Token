const express = require('express');
const app = express();
const db = require('./db');
const userRouter = require('./userRoutes');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

db.connect();

app.use('/api/users', userRouter);

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`);
});