package Vteam.Voluntier.Inscricao.Repository;

import Vteam.Voluntier.Inscricao.Model.InscricaoModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InscricaoRepository extends MongoRepository<InscricaoModel, String> {
    boolean existsByIdPessoaAndIdEvento(String idPessoa, String idEvento);
    void deleteByIdPessoaAndIdEvento(String idPessoa, String idEvento);
    List<InscricaoModel> findAllByIdPessoa(String idPessoa);

}
