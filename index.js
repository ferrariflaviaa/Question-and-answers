const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

//Batabase
connection.authenticate()
  .then(() => {
    console.log("conexão com sucesso")
  })
  .catch((msgError) => {
    console.log(msgError)
  })


connection
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
  //FindAll pesquisa todos os registro na tabela
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas
    })
  })
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar")
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/")
  })
})

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  //FindOne busca um dado com uma condição
  Pergunta.findOne({
    where: { id: id }
  }).then((pergunta) => {
    // console.log(pergunta)
    if (pergunta !== null) {
      Resposta.findAll({
        raw: true, 
        order: [["id", "DESC"]], 
        where: {
          perguntasID: pergunta.id
        }
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    } else {
      res.redirect("/")
    }
  })
})

app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.perguntaId;
  Resposta.create({
    corpo: corpo,
    perguntasID: perguntaId,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId)
  })
})

app.listen(8080, () => { console.log("App rodando"); })