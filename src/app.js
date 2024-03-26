const express = require ('express');
const app = express ();
const mysql = require ('mysql');

const PORT = process.env.PORT || 3306;
const db_aluno = require('./database/Database');

app.listen (PORT, () => {
    console.log(`App listeing on port ${PORT}`)
});