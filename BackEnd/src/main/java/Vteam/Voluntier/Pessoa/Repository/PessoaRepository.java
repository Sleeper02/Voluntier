package Vteam.Voluntier.Pessoa.Repository;

import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PessoaRepository extends MongoRepository<PessoaModel, String> { //O id do mongoDB utiliza String pois usa um Hash
    boolean existsByCPF(String cpf);
    boolean existsByEmail(String email);
    Optional<PessoaModel> findByEmail(String email);
}
