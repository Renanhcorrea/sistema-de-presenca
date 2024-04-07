import { useState, useEffect } from 'react';
import './RelatorioAluno.css';
import { getPresencasByAluno, getAlunos } from '../../api/utils';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

export default function RelatorioAluno() {
  const [alunos, setAlunos] = useState([]);
  const [presencas, setPresencas] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState('');
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [showTable, setShowTable] = useState(false);
  const [relatorio, setRelatorio] = useState({}); // Adicionado estado para armazenar o relatório calculado

  useEffect(() => {
    const fetchAlunosData = async () => {
      const alunosData = await getAlunos();
      if (alunosData) {
        setAlunos(alunosData);
      }
    };

    fetchAlunosData();
  }, []);

  useEffect(() => {
    const fetchPresencasByAluno = async () => {
      if (selectedAluno) {
        const presencasData = await getPresencasByAluno(selectedAluno);
        if (presencasData) {
          setPresencas(presencasData);
        }
      }
    }
    fetchPresencasByAluno();
  }, [selectedAluno]); // Adicionado selectedAluno como dependência

  const handleAlunoChange = (event) => {
    setSelectedAluno(event.target.value);
    setShowTable(false); // Resetar a exibição da tabela quando o aluno é alterado
  };

  const handleDataInicialChange = (event) => {
    setDataInicial(event.target.value);
  };

  const handleDataFinalChange = (event) => {
    setDataFinal(event.target.value);
  };

  const handleSubmit = () => {
    const relatorioCalculado = calculaFaltas(presencas, dataInicial, dataFinal);
    setRelatorio(relatorioCalculado); // Atualiza o estado do relatório com o resultado calculado
    setShowTable(true);
  };

  function calculaFaltas(presencas, dataInicial, dataFinal) {
    const faltasPorDisciplinaProfessor = {};
  
    presencas.forEach(presenca => {
      const dataAula = new Date(presenca.dataAula);
      const dataInicio = new Date(dataInicial);
      const dataFim = new Date(dataFinal);
  
      if (dataAula >= dataInicio && dataAula <= dataFim) {
        const chave = `${presenca.nomeDisciplina}-${presenca.nomeProf}`;
        if (!faltasPorDisciplinaProfessor[chave]) {
          faltasPorDisciplinaProfessor[chave] = { faltas: 0, aulas: new Set(), presencas: 0 };
        }
        faltasPorDisciplinaProfessor[chave].aulas.add(presenca.idAula);
        if (presenca.presente === 0) {
          faltasPorDisciplinaProfessor[chave].faltas++;
        } else {
          faltasPorDisciplinaProfessor[chave].presencas++;
        }
      }
    });
  
    // Calcula a frequência e transforma os Sets de aulas em seus tamanhos para contagem de aulas distintas
    Object.keys(faltasPorDisciplinaProfessor).forEach(chave => {
      const disciplina = faltasPorDisciplinaProfessor[chave];
      disciplina.aulas = disciplina.aulas.size;
      disciplina.frequencia = disciplina.presencas / disciplina.aulas; // Calcula a frequência
    });
  
    return faltasPorDisciplinaProfessor;
  }
  

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
            <section className = "filtros">
              <div className='seleciona-aluno'>
                <label htmlFor="select-aluno">Selecione o aluno:</label>
                <select id="select-aluno" className="ms-2 mb-3" onChange={handleAlunoChange}>
                  <option value="">Selecione um aluno</option>
                  {alunos.map(aluno => (
                    <option key={aluno.codAluno} value={aluno.codAluno}>
                      {`${aluno.codAluno} - ${aluno.nome}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className='seleciona-datas'>
              <label htmlFor="input-dataInicial">Data inicial:</label>
              <input className="ms-2 mb-3"
                type="date"
                id="input-dataInicial"
                value={dataInicial}
                onChange={handleDataInicialChange}
              />
              </div>
              <div className = "seleciona-datas">
              <label htmlFor="input-dataFinal">Data final:</label>
                <input className="ms-2 mb-3"
                  type="date"
                  id="input-dataFinal"
                  value={dataFinal}
                  onChange={handleDataFinalChange}
                />
              </div>
                <Button variant="secondary" className='w-25' onClick={handleSubmit}>Gerar relatório</Button>
            </section>
            {showTable && (
              <Table bordered hover>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Nome do Professor</th>
                  <th>Faltas</th>
                  <th>Total de Aulas</th>
                  <th>Frequência (%)</th> {/* Nova coluna para Frequência */}
                </tr>
              </thead>
              <tbody>
                {Object.entries(relatorio).map(([chave, valor]) => {
                  const [nomeDisciplina, nomeProf] = chave.split("-");
                  return (
                    <tr key={chave}>
                      <td>{nomeDisciplina}</td>
                      <td>{nomeProf}</td>
                      <td>{valor.faltas}</td>
                      <td>{valor.aulas}</td>
                      <td>{(valor.frequencia * 100).toFixed(2)}%</td> {/* Exibe a frequência como percentual */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
}
