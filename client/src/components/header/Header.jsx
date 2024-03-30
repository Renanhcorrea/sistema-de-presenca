import './Header.css'
import logo from '../../assets/logo_branco-trbg.png'
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header>
      <div className="header-container">
        <header>
          <Link to={'/'}>
          <img src={logo} alt="Logotipo da Escola Octógono" />
          <h1>Sistema de Registro de Presença</h1>
          </Link>
        </header>
      </div>
    </header>
  )
}