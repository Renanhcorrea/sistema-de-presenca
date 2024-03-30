const Professor = class {
    constructor (codProfessor, nome){
        this.codProfessor = codProfessor;
        this.nome = nome;
    }

    // get all professors
    static async getProfessores (conn) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_professor");
            return rows;
        } catch (error) {
            console.error("Erro ao obter professores:", error);
            throw error;
        }
    }

    // get professor by codProfessor
    static async getProfessor (conn, codProfessor) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_professor WHERE codProfessor = ?", [codProfessor]);
            return rows;
        } catch (error) {
            console.error("Erro ao obter professor:", error);
            throw error;
        }
    }
}

module.exports = Professor;