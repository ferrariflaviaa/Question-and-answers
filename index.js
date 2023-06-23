const express = require("express");
const app = express();
const bodyParser = require("body-parser")

//Esse comando permite que usuário envie os dados pelo formulario e bodyParser vai traduzir esses dados em uma estrutura JS
app.use(bodyParser.urlencoded({ extended: false }))

//Permite ler formulario de forma json
app.use(bodyParser.json())

//Estou dizendo o Express usar o EJS como view engine
app.set('view engine', 'ejs');

//Configuração para poder aceitar arquivos estaticos
app.use(express.static('public'))

//Rotas
app.get("/", (req, res) => {
  res.render("index")
});
app.get("/perguntar", (req, res) => {
  res.render("perguntar")
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send("Formulário recebido! " + titulo + " " + descricao)
})

app.listen(8080, () => { console.log("App rodando"); })