require('dotenv').config();

// frameworks
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2/promise');

// importing classes
const Aluno = require('./models/Aluno');
const Responsavel = require('./models/Responsavel');
const Turma = require('./models/Turma');
const Professor = require('./models/Professor');
const Disciplina = require('./models/Disciplina');
const Aula = require('./models/Aula');
const ProfessorDisciplina = require('./models/ProfessorDisciplina');
const Presenca = require('./models/Presenca');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// endpoint for deal with options requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    Promise: global.Promise,
    connectionLimit: 10 // maximum number of connections
});

// endpoints

// get all students
app.get('/alunos', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Aluno.getAlunos(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get all responsibles
app.get('/responsaveis', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Responsavel.getResponsaveis(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get all classes
app.get('/turmas', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Turma.getTurmas(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get all professors
app.get('/professores', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Professor.getProfessores(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get professor by codProfessor
app.get('/professores/:codProfessor', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Professor.getProfessor(conn, req.params.codProfessor);
        conn.release();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get all disciplines
app.get('/disciplinas', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Disciplina.getDisciplinas(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get all classes
app.get('/aulas', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Aula.getAulas(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get all classes by codProfessor
app.get('/aulas/professor/:codProfessor', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Aula.getAulasByProfessor(conn, req.params.codProfessor);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/professor-disciplina', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await ProfessorDisciplina.getProfessorDisciplinas(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/presencas', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Presenca.getPresencas(conn);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// set presence
app.post('/presencas', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        await Presenca.setPresenca(conn, req.body.idAula, req.body.codAluno, req.body.presente);
        conn.release();
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get students by idTurma
app.get('/alunos/:idTurma', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await Aluno.getAlunoByTurma(conn, req.params.idTurma);
        conn.release();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});