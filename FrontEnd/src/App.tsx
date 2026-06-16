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
import AvaliacaoEvento from "./pages/Avaliação Usuário"
import AvaliacaoInstituicao from "./pages/Avaliação Instituição"
import Eventos from "./pages/Eventos"
import Home from "./pages/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/eventodescricao" element={<EventoDescricao />} />
        <Route path="/cadastroevento" element={<CadastroEvento />} />
        <Route path="/cadastrarevento" element={<CadastrarEvento />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/recompensasinstitucional" element={<RecompensasInstitucional />} />
        <Route path="/eventosinscritos" element={<VisualizacaoEventosInscritos />} />
        <Route path="/evento/:id/avaliacao" element={<AvaliacaoEvento />} />
        <Route path="/evento/:id/avaliacaoresumo" element={<AvaliacaoInstituicao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
