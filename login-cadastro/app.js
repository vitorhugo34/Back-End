const express = require('express');
// para escrever nos campos
const bodyParser = require('body-parser');
//conexao de banco de dados
const mysql = require('mysql2');
const app = express();
const port = 3000;

//passo 2 conexao banco de dados 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Vitor1',
    password: 'SENAI123',
    database: 'padaria'
})
//passo 3 conexao banco de dados 
db.connect((error) => {
    if (error) {
        console.log('erro ao conectar o mysql')
    } else {
        console.log('conectado ao mysql')
    }
});


//erro de cannot get
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

app.use(bodyParser.urlencoded({ extended: true }));

// para escrever nos campos 
app.post("/login", (req, res) => {
    const username = req.body.user //nome esta na requisao do html exemplo login.html
    const password = req.body.senha

    //passo 4 para conexao de sql
    // **ficar bem atento com essa parte, em questão dos nomes e sintaxe
    db.query('select password from User where username= ?', [username], (error, results) => { // entre '' é a sintaxe do workbanch 

        if(error){
            console.log("Erro ao realizar consulta", error) 
        }else{
            if (results.length > 0) {
                const passwordBD = results[0].password;//results= vetor []=posição da senha do usuaario por isso é ".password"
                if (passwordBD == password) {
                    console.log('Login efetuado com sucesso!')
                     res.sendFile(__dirname + '/telas/pg.html')
                } else {
                    console.log('Senha incorreta!')
                };
    
    
            } else {
                console.log('Usuario Incorreto!')
            }
        }
    })
});

app.get("/cadastro", (req, res) => {
    res.sendFile(__dirname + '/cadastro.html')
})

app.post("/registro", (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    const confirm = req.body.repitpassword

    if (password === confirm){
        db.query('insert into user (username, password) values (?,?);', [username, password], (error, results)=>{ 
            if (error){
                console.log('Erro ao inserir usuário', error);
            }else {
                console.log('novo usuario autenticado');
                res.sendFile(__dirname+ '/login.html')
            }
        })
    } else {
        console.log('Senhas diferentes')
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando no endereço:http://localhost:${port}`);
});