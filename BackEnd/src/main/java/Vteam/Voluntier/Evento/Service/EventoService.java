package Vteam.Voluntier.Evento.Service;

import Vteam.Voluntier.Evento.DTOS.CadastroEventoDTO;
import Vteam.Voluntier.Evento.Model.EventoModel;
import Vteam.Voluntier.Evento.Repository.EventoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class EventoService {

    private final EventoRepository repository;
    private final ModelMapper mapper;

    public EventoService(EventoRepository repository, ModelMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Boolean criarEvento(CadastroEventoDTO cadastroEvento){

//            if (!instituicaoRepository.existsById(cadastroEvento.getIdInstituicao())) { adicionar ao criar classe Instituição
//                throw new RuntimeException("Instituição não encontrada");
//            }
        try {
            EventoModel evento = mapper.map(cadastroEvento, EventoModel.class);
            evento.setInscritos(0);
            repository.save(evento);

            return true;

        }catch (Exception e){
            return false;
        }
    }
}
