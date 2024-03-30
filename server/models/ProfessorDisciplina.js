class ProfessorDisciplina {
    constructor(conn, codProfessor, codDisciplina) {
        this.conn = conn;
        this.codProfessor = codProfessor;
        this.codDisciplina = codDisciplina;
    }

    static async getProfessorDisciplinas(conn) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_professor_disciplina");
            return rows;
        } catch (error) {
            console.error("Erro ao obter professor_disciplina:", error);
            throw error;
        }
    }
}

module.exports = ProfessorDisciplina;
