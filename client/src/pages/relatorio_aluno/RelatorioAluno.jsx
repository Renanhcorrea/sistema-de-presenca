import { useState, useEffect } from 'react';
//import './RegistrarPresencas.css';
import { getPresencasByAluno, getAlunos } from '../../api/utils';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

export default function RelatorioAluno() {
  //useState para armazenar a lista de alunos
  const [alunos, setAlunos] = useState([]);
  //useState para armazenar a lista de presencas
  const [presencas, setPresencas] = useState([]);
  // useState para armazenar o aluno selecionado
  const [selectedAluno, setSelectedAluno] = useState('');

  // useEffect para buscar a lista de alunos
  useEffect(() => {
    const fetchAlunosData = async () => {
      const alunosData = await getAlunos();
      if (alunosData) {
        setAlunos(alunosData);
      }
    };

    fetchAlunosData();
  }, []);

  // useEffect para buscar a lista de presencas de acordo com o aluno selecionado
  useEffect(() => {
    const fetchPresencasByAluno = async () => {
      if (selectedAluno) {
        const presencasData = await getPresencasByAluno(selectedAluno);
        if (presencasData) {
          setPresencas(presencasData)
        }
      };
    }
    fetchPresencasByAluno();
  }, []);

  // Função para lidar com a seleção de um aluno
  const handleAlunoChange = (event) => {
    setSelectedAluno(event.target.value);
  };

  return (
    <div className="relatorio-aluno">
      <Header />
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Container>
            <h1 className="mb-3">Relatório de Faltas do Aluno</h1>
            <label htmlFor="select-aula">Selecione o aluno:</label>
            <select id="select-aula" className="ms-2 mb-3" onChange={handleAlunoChange}>
              <option value="">Selecione um aluno</option>
              {alunos.map(aluno => {
                return (
                  <option key={aluno.codAluno} value={aluno.codAluno}>
                    {`${aluno.codAluno} - ${aluno.nome}`}
                  </option>
                );
              })}
            </select>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Nome do Professor</th>
                  <th>Faltas</th>
                </tr>
              </thead>
              <tbody>
                {presencas.map(presenca => (
                  <tr>
                    <td>{presenca.nomeDisciplina}</td>
                    <td>{presenca.nomeProf}</td>
                    <td>{presenca.presente}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </div>
  )
}