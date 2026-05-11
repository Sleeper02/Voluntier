import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import EventoDescricao from "./pages/Descrição do Evento"
import CadastroEvento from "./pages/Cadastro de Evento"
import CadastrarEvento from "./pages/Cadastrar Evento"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eventodescricao" element={<EventoDescricao />} />
        <Route path="/cadastroevento" element={<CadastroEvento />} />
        <Route path="/cadastrarevento" element={<CadastrarEvento />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
