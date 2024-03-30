class Aluno {
    constructor(conn, codAluno, codResp, nome, ano, idTurma) {
        this.conn = conn;
        this.codAluno = codAluno;
        this.codAResp = codResp;
        this.nome = nome;
        this.ano = ano;
        this.idTurma = idTurma;
    }

    static async getAlunos(conn) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_aluno");
            return rows;
        } catch (error) {
            console.error("Erro ao obter alunos:", error);
            throw error;
        }
    }

    static async getAluno(conn, codAluno) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_aluno WHERE codAluno = ?", [codAluno]);
            return rows;
        } catch (error) {
            console.error("Erro ao obter aluno:", error);
            throw error;
        }
    }

    // get student by idTurma
    static async getAlunoByTurma(conn, idTurma) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_aluno WHERE idTurma = ?", [idTurma]);
            return rows;
        } catch (error) {
            console.error("Erro ao obter aluno:", error);
            throw error;
        }
    }
}

module.exports = Aluno;
