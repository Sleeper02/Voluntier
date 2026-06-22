package Vteam.Voluntier.Pessoa.Repository;

import Vteam.Voluntier.Pessoa.Enums.PerfilConta;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PessoaRepository extends MongoRepository<PessoaModel, String> {

    boolean existsByCPF(String cpf);

    boolean existsByEmail(String email);

    Optional<PessoaModel> findByEmail(String email);

    List<PessoaModel> findAllByOrderByPontosDesc();

    List<PessoaModel> findByPerfilOrderByPontosDesc(
        PerfilConta perfil
    );
}