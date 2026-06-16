package Vteam.Voluntier.Avaliacao.Repository;

import Vteam.Voluntier.Avaliacao.DTOs.ViewAvalicaoDTO;
import Vteam.Voluntier.Avaliacao.Model.AvaliacaoModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends MongoRepository<AvaliacaoModel, String> {
    boolean existsByIdPessoaAndIdEvento(String idPessoa, String idEvento);
    Optional<AvaliacaoModel> findByIdPessoaAndIdEvento(String idPessoa, String idEvento);
    List<AvaliacaoModel> findAllByIdEvento(String idEvento);
}
