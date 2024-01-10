const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./db');
const verifyToken = require('./authMiddleware');

const router = express.Router();

router.post('/register', async (req,res) => {
    const {username , password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    try {
        const conn = await pool.getConnection();
        await conn.query('INSERT INTO tb_login(username,password) VALUES(?,?)',[username,hashedPassword]);
        conn.release();
        res.status(201).send('Usuario criado com sucesso')
    }catch(err){
        res.status(500).send('Algo deu errado')
    }
})


router.post('/login',async(req,res) => {
    const {username,password}= req.body;

    try{
        const conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM tb_login WHERE username = ?',[username])
        conn.release()
        if(result.length === 0){
            return res.status(401).send("Usuario nao encontrado")
        }
        const user = result[0];

        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(401).send("Credenciais invalidas")
        }

        const token = jwt.sign({userId:user.id},'1234',{expiresIn:'1h'})
        res.status(200).send(token)
    }
    catch(err){
        res.status(500).send("Erro ao fazer login")
    }
})

router.get('/dados',verifyToken,(req,res)=> {
    res.json({usuario:req.authData});
})

module.exports= router;