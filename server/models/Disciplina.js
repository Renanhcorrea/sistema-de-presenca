const Disciplina = class {
    constructor (codDisciplina, nome){
        this.codDisciplina = codDisciplina;
        this.nome = nome;
    }

    // get all disciplines
    static async getDisciplinas (conn) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_disciplina");
            return rows;
        } catch (error) {
            console.error("Erro ao obter disciplinas:", error);
            throw error;
        }
    }
}

module.exports = Disciplina;