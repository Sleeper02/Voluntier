package Vteam.Voluntier.Bloqueio.Repository;

import Vteam.Voluntier.Bloqueio.Model.BloqueioModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BloqueioRepository extends MongoRepository<BloqueioModel, String> {
    boolean existsByIdInstituicaoAndIdPessoa(String idInstituicao, String idPessoa);
    Optional<BloqueioModel> findByIdInstituicaoAndIdPessoa(String idInstituicao, String idPessoa);
    List<BloqueioModel> findAllByIdPessoa(String idPessoa);
    List<BloqueioModel> findAllByIdInstituicao(String idInstituicao);
}
