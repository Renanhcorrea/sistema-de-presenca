import './Home.css';

import { Link } from 'react-router-dom';

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
                <li><Link to={'/registrar-presencas'}><button>Registrar Presenças</button></Link></li>
                <li><Link to={'/relatorio-geral'}><button>Gerar Relatório Geral</button></Link></li>
                <li><Link to={'/relatorio-aluno'}><button>Gerar Relatório de Aluno</button></Link></li>
              </ul>
          </div>
        </Col>
      </Row>
    </div>
  )
}