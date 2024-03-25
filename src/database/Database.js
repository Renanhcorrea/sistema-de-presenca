const express = require ('express');
const bodyParser = require ('body-parser');
const mysql = require ('mysql');

const app = express ();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '1020304050Squad',
    database: 'mysql'
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