package Vteam.Voluntier.Instituicao.Repository;

import Vteam.Voluntier.Instituicao.Model.InstituicaoModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InstituicaoRepository extends MongoRepository<InstituicaoModel, String> {

    boolean existsByCNPJ(String cnpj);

    boolean existsByEmail(String email);

    Optional<InstituicaoModel> findByEmail(String email);
}
