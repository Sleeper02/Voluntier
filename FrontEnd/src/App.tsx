import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroUsuario from './pages/Cadastro Usuário'
import Login from './pages/Login'
import EventoDescricao from "./pages/Descrição do Evento"
import CadastroEvento from "./pages/Cadastro de Evento"
import CadastrarEvento from "./pages/Cadastrar Evento"
import Ranking from "./pages/Ranking"
import Recompensas from "./pages/Recompensas"
import RecompensasInstitucional from "./pages/Recompensas Institucional"
import VisualizacaoEventosInscritos from "./pages/Visualização Eventos Inscritos Voluntário"
import AvaliacaoEvento from "./pages/Avaliação Usuário"
import AvaliacaoInstituicao from "./pages/Avaliação Instituição"
import Eventos from "./pages/Eventos"
import Home from "./pages/Home"
import ForgotPassword from "./pages/Esqueci a senha"
import Acesso from "./pages/Papéis de acesso"
import RedefinirSenha from "./pages/Redefinir senha"
import CadastroInstituicao from "./pages/Cadastro Instituição"
import EventosCriados from "./pages/Meus eventos criados"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro-instituicao" element={<CadastroInstituicao />} />
         <Route path="/cadastro-voluntario" element={<CadastroUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/redefinir-senha" element={<RedefinirSenha/>}/>
         <Route path="/acesso" element={<Acesso/>}/>
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
        <Route path="/eventoscriados" element={<EventosCriados />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
