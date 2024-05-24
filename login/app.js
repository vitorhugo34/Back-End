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
    const username = req.body.user
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
                } else {
                    console.log('Senha incorreta!')
                };
    
    
            } else {
                console.log('Usuario Incorreto!')
            }
        }
    })
});



app.listen(port, () => {
    console.log(`Servidor rodando no endereço: localhost:${port}`);
});