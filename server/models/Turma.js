const Turma = class {
    constructor (idTurma, codTurma, ano) {
        this.idTurma = idTurma;
        this.codTurma = codTurma;
        this.ano = ano;
    }

    // get all classes
    static async getTurmas (conn) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_turma");
            return rows;
        } catch (error) {
            console.error("Erro ao obter turmas:", error);
            throw error;
        }
    }
}

module.exports = Turma;