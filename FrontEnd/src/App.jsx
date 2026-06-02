import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import EventoDescricao from "./pages/Descrição do Evento"
import CadastroEvento from "./pages/Cadastro de Evento"
import CadastrarEvento from "./pages/Cadastrar Evento"
import Ranking from "./pages/Ranking"
import Recompensas from "./pages/Recompensas"
import RecompensasInstitucional from "./pages/Recompensas Institucional"
import VisualizacaoEventosInscritos from "./pages/Visualização Eventos Inscritos"
import Eventos from "./pages/Eventos"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eventodescricao" element={<EventoDescricao />} />
        <Route path="/cadastroevento" element={<CadastroEvento />} />
        <Route path="/cadastrarevento" element={<CadastrarEvento />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/recompensasinstitucional" element={<RecompensasInstitucional />} />
        <Route path="/eventosinscritos" element={<VisualizacaoEventosInscritos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
