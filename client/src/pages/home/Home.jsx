import './Home.css';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

// bootstrap imports
import { Row, Col } from 'react-bootstrap';

export default function Home() {
  

  return (
    <div className="home-container">
      <Header />
      <Row>
        {/* Row tem no maximo 12 colunas */}
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <div className="menu-navegacao">
              <ul>
                <li><Link to={'/registrar-presencas'}><Button variant="secondary">Registrar Presenças</Button></Link></li>
                <li><Link to={'/relatorio-geral'}><Button variant="secondary">Gerar Relatório Geral</Button></Link></li>
                <li><Link to={'/relatorio-aluno'}><Button variant="secondary">Gerar Relatório de Aluno</Button></Link></li>
              </ul>
          </div>
        </Col>
      </Row>
    </div>
  )
}