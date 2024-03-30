const Responsavel = class {
    constructor (codResp, nome, email, telefone) {
        this.codResp = codResp;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    // get all responsibles
    static async getResponsaveis (conn) {
        try {
            const [rows, fields] = await conn.execute("SELECT * FROM tb_responsavel");
            return rows;
        } catch (error) {
            console.error("Erro ao obter responsáveis:", error);
            throw error;
        }
    }
}

module.exports = Responsavel;