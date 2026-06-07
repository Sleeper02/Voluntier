package Vteam.Voluntier.Evento.Repository;

import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.Model.EventoModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface EventoRepository extends MongoRepository<EventoModel, String> {

    List<EventoModel> findByAreaAtuacao(AreaAtuacao areaAtuacao);
}
