package Vteam.Voluntier.Evento.Repository;

import Vteam.Voluntier.Evento.Model.EventoModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface EventoRepository extends MongoRepository<EventoModel, String> {
}
