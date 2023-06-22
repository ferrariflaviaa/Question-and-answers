const express = require("express");
const app = express();

//Estou dizendo o Express usar o EJS como view engine
app.set('view engine', 'ejs');

//Configuração para poder aceitar arquivos estaticos
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("index")
});

app.listen(8080, () => { console.log("App rodando"); })