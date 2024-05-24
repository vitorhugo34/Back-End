const express = require('express');
const bodyParser = ('body-parser');

const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Vitor1',
    password: 'SENAI123',
    database: 'biblioteca'
})
db.connect((error) => {
    if (error){
        console.log('nao foi possivel conectar ao mysql')
    } else {
        console.log('conectado com sucesso !')
    }
})

app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/view/')
 });

 app.use(bodyParser.urlencoded({extends: true}));

 app.post("/", (req, res) =>{
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    if(error){
        db.query('',[username], (error, results) => { //arumar email
            if(error){
                console.log("error ao realizar a consulta", error)
            }{
                if (results.length > 0){
                    const passwordBD = results[0].password;
                    if (passwordBD == password) {
                        console.log('login efetuado!')
                        res.sendFile(__dirname + '/viws/')
                    } else {
                        console.log('Senha incorreta!')
                    }
                }
            }
        })
    }
 });
  // 
 app.get("/", (req,res) =>{
    res.sendFile(__dirname + '/view/')
 })
 app.post("/registro", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const confirm = req.body.repitpassword

    if( password !== confirm){
        return console.log("as senhas não coincidem")}

  
    db.query('insert into User (username, password) values (?, ?)', [username, password], (error, results) => { 
        
                if (error) {
                    console.log('Erro ao inserir usuário',error);
                    
                } else {
                    console.log('novo usuario autenticado')
                    res.sendFile(__dirname+ '/login.html')
                }
            });
        }
    );


 app.get("/", (req, res) =>{
    res.sendFile(__dirname + '/views/')
})


app.post ("/views/index.html", (req, res)=> {
    const rua = req.body.rua 
    const numero  = req.body.numero
    const bairro = req.body.bairro
    const cidade = req.body.cidade
    const estado = req.body.estado
    const cep = req.body.cep
})
db.query('',[rua, numero, bairro, cidade, estado, cep], (error, results) =>{
     if (error){
        console.log('erro ao inserir endereço', error)
     } else {
        console ('endereco adicionado')
        res.sendFile(__dirname + '/views/cadastro.html')
     }

});

app.listen(port, () => {
    console.log(`Servidor rodando no endereçp: http://localhost:${port}`);
})