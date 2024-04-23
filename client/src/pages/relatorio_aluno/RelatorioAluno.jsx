import { useState, useEffect } from 'react';
import './RelatorioAluno.css';
import { getPresencasByAluno, getAlunos } from '../../api/utils';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';

export default function RelatorioAluno() {
  const [alunos, setAlunos] = useState([]);
  const [presencas, setPresencas] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState('');
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [showTable, setShowTable] = useState(false);
  const [relatorio, setRelatorio] = useState({}); // Adicionado estado para armazenar o relatório calculado
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro
  const [fontSize, setFontSize] = useState(16);

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
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a seleção
  };

  const handleDataInicialChange = (event) => {
    setDataInicial(event.target.value);
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a data
  };

  const handleDataFinalChange = (event) => {
    setDataFinal(event.target.value);
    setErrorMessage(''); // Limpar mensagens de erro ao mudar a data
  };

  const handleSubmit = () => {
    if (!selectedAluno || !dataInicial || !dataFinal) {
      setErrorMessage('Todos os campos são obrigatórios.');
      setShowTable(false);
    } else if (new Date(dataInicial) >= new Date(dataFinal)) {
      setErrorMessage('A data inicial deve ser menor que a data final.');
      setShowTable(false);
    } else {
      const relatorioCalculado = calculaFaltas(presencas, dataInicial, dataFinal);
      setRelatorio(relatorioCalculado); // Atualiza o estado do relatório com o resultado calculado
      setShowTable(true);
      setErrorMessage('');
    }
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
  
  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 1, 10));

  return (
    <div className="relatorio-aluno" style={{ fontSize: `${fontSize}px` }}>
      <Header />
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Container>
            <Button onClick={increaseFontSize} variant="outline-primary" style={{ margin: '5px', fontSize: `${fontSize}px` }}>A+</Button>
            <Button onClick={decreaseFontSize} variant="outline-secondary" style={{ margin: '5px', fontSize: `${fontSize}px` }}>A-</Button>
            <h1 className="mb-3">Relatório de Faltas do Aluno</h1>
            {errorMessage && <Alert variant="warning" style={{ fontSize: `${fontSize}px` }}>{errorMessage}</Alert>}
            <div className='seleciona-aluno'>
              <label htmlFor="select-aluno">Selecione o aluno:</label>
              <select id="select-aluno" className="ms-2 mb-3" onChange={handleAlunoChange} style={{ fontSize: `${fontSize}px` }}>
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
              <input
                type="date"
                id="input-dataInicial"
                value={dataInicial}
                onChange={handleDataInicialChange}
                className="ms-2 mb-3"
                style={{ fontSize: `${fontSize}px` }}
              />
              <label htmlFor="input-dataFinal">Data final:</label>
              <input
                type="date"
                id="input-dataFinal"
                value={dataFinal}
                onChange={handleDataFinalChange}
                className="ms-2 mb-3"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <Button variant="secondary" className='w-25' onClick={handleSubmit} style={{ fontSize: `${fontSize}px` }}>Gerar relatório</Button>
            {showTable && (
              <Table bordered hover style={{ fontSize: `${fontSize}px` }}>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Nome do Professor</th>
                    <th>Faltas</th>
                    <th>Total de Aulas</th>
                    <th>Frequência (%)</th>
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
                        <td>{(valor.frequencia * 100).toFixed(2)}</td>
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
