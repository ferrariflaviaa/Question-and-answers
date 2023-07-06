const { DataTypes, Sequelize } = require('sequelize')
const connection = require('./database')

//Criando a estrutura da tabela no banco
const Pergunta = connection.define('pergunta', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

//Sincronizando com banco de dados para criar, caso tenha não cria.
//Force para não forçar outra criação
Pergunta.sync({ force: false });


module.exports = Pergunta;