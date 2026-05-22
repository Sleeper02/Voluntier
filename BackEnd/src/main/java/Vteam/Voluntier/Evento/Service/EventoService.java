package Vteam.Voluntier.Evento.Service;

import Vteam.Voluntier.Evento.DTOS.CadastroEventoDTO;
import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.Model.EventoModel;
import Vteam.Voluntier.Evento.Repository.EventoRepository;
import Vteam.Voluntier.Pessoa.Service.PessoaService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class EventoService {

    private final EventoRepository repository;
    private final ModelMapper mapper;
    private PessoaService pessoaService;

    public EventoService(EventoRepository repository, ModelMapper mapper, PessoaService pessoaService) {
        this.repository = repository;
        this.mapper = mapper;
        this.pessoaService = pessoaService;
    }

    public Boolean criarEvento(CadastroEventoDTO cadastroEvento){

//            if (!instituicaoRepository.existsById(cadastroEvento.getIdInstituicao())) { adicionar ao criar classe Instituição
//                throw new RuntimeException("Instituição não encontrada");
//            }
        try {
            EventoModel evento = mapper.map(cadastroEvento, EventoModel.class);
            if (evento.getRecompensas() == null) {
                evento.setRecompensas(EventoModel.defaultRecompensas());
            }
            repository.save(evento);

            return true;

        }catch (Exception e){
            return false;
        }
    }

    public Boolean finalizarEvento(String id){
        try {
            EventoModel evento = repository.findById(id).orElseThrow(()
                    -> new RuntimeException("Evento não encontrado"));

            evento.setSolicitacao(EventoStatus.FINALIZADO);
            repository.save(evento);

            for (String pId : evento.getInscritos()){
                pessoaService.registrarParticipacao(pId, id);
            }

            return true;
        } catch (Exception e) {
            return false;
        }

    }
}
