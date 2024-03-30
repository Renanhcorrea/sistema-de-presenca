import { useState, useEffect } from 'react';
import './RegistrarPresencas.css';
import { getAulasByProfessor, getAlunosByTurma, setPresenca, getDisciplinas } from '../../api/utils';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

export default function RegistrarPresencas() {
  // useState para armazenar a lista de aulas
  const [aulas, setAulas] = useState([]);
  // useState para armazenar a lista de alunos	
  const [alunos, setAlunos] = useState([]);
  // useState para armazenar a aula selecionada
  const [selectedAula, setSelectedAula] = useState('');
  // useState para armazenar a lista de disciplinas
  const [disciplinas, setDisciplinas] = useState([]);

  // useEffect para buscar a lista de aulas
  useEffect(() => {
    const fetchAulasData = async () => {
      const aulasData = await getAulasByProfessor();
      if (aulasData) {
        setAulas(aulasData);
      }
    };

    fetchAulasData();
  }, []);

  useEffect (() => {
    const fetchDisciplinas = async () => {
      const disciplinasData = await getDisciplinas();
      if (disciplinasData) {
        setDisciplinas(disciplinasData);
      }
    };

    fetchDisciplinas();
  }, []);

  // useEffect para buscar a lista de alunos de acordo com a turma da aula selecionada
  useEffect(() => {
    const fetchAlunosByTurma = async () => {
      if (selectedAula) {
        const aulaSelecionada = aulas.find(aula => aula.idAula === Number(selectedAula));
        if (aulaSelecionada) {
          const alunosData = await getAlunosByTurma(aulaSelecionada.idTurma);
          if (alunosData) {
            setAlunos(alunosData);
          }
        }
      }
    };

    fetchAlunosByTurma();
  }, [selectedAula, aulas]);

  // Função para lidar com a mudança de aula selecionada
  const handleAulaChange = (event) => {
    setSelectedAula(event.target.value);
  };

  // Função para marcar as presenças
  const marcarPresencas = () => {
     // Exibe a caixa de confirmação
    const confirmacao = confirm('Deseja confirmar o envio das faltas e presenças marcadas?');

      if (confirmacao) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        setPresenca(alunos[index].codAluno, selectedAula, checkbox.checked);
      });
      
      // Exibe uma mensagem de sucesso e redireciona
      alert('Presenças marcadas com sucesso!');
      window.location.href = "/";
    } else {
      // Se o usuário não confirmar, apenas fecha a mensagem
      // Não é necessário fazer mais nada aqui
    }
};

  return (
    <div className="registrar-presencas">
      <Header />
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Container>
            <h1 className="mb-3">Registrar Presenças</h1>
            <label htmlFor="select-aula">Selecione a aula:</label>
            <select id="select-aula" className="ms-2 mb-3" onChange={handleAulaChange}>
              <option value="">Selecione uma aula</option>
              {aulas.map(aula => {
                const disciplina = disciplinas.find(disciplina => disciplina.codDisciplina === aula.codDisciplina);
                console.log("Aula:", aula);
                console.log("Disciplina encontrada:", disciplina);
                return (
                  <option key={aula.idAula} value={aula.idAula}>
                    {`${disciplina.nomeDisciplina} - ${aula.horaInicio} às ${aula.horaFim} - ${aula.idTurma}`}
                  </option>
                );
              })}
            </select>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Presença</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => (
                  <tr key={aluno.codAluno}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.codAluno}</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
              <Button variant="secondary" type="submit" className='w-25' onClick={marcarPresencas}>Marcar Presenças</Button>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
