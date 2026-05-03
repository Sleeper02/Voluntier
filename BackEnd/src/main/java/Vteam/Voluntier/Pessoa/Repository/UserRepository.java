package Vteam.Voluntier.Pessoa.Repository;

import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<PessoaModel, String> { //O id do mongoDB utiliza String pois usa um Hash
    boolean existsByCPF(String cpf);
    boolean existsByEmail(String email);
}
