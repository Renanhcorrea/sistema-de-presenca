const Sequelize = require('sequelize');

const sequelize = new Sequelize("db_aluno", "root", "10203040Squad", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log('Database Connected.');
}).catch(function(){
    console.log('error.');
});

module.exports = sequelize;

/*
const express = require ('express');
const bodyParser = require ('body-parser');
const mysql = require ('mysql');

const app = express ();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1020304050Squad',
    database: 'mysql',
    insecureAuth: true
});

db.connect((err) => {
    if (err) {
        throw err;
    } 
    console.log('conectado ao BD')
});


//Buscar aluno no front-end
app.get('./models/aluno', (req, res) => {
    const { turma, disciplina } = req.query;

    const query = 'SELECT * FROM alunos WHERE turma = ? AND disciplina = ?';
    db.query(query, [turma, disciplina], (err, results) => {
        if (err) {
            console.error('Erro ao buscar alunos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        return;
         }
        res.json(results);
    });
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
*/