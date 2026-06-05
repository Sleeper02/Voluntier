package Vteam.Voluntier.Evento.Repository;

import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.Model.EventoModel;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EventoRepository extends MongoRepository<EventoModel, String> {
    Optional<List<EventoModel>> findAllByIdInstituicao(String email);
    List<EventoModel> findBySolicitacao(EventoStatus solicitacao, Sort sort);


}
