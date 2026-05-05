package Vteam.Voluntier.Pessoa.Service;

import Vteam.Voluntier.Pessoa.DTOS.CadastroDTO;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import Vteam.Voluntier.Pessoa.Repository.PessoaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PessoaService {
    private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    public boolean cadastroCliente(CadastroDTO dto) {
        if (pessoaRepository.existsByEmail(dto.getEmail()) || pessoaRepository.existsByCPF(dto.getCPF())) {
            return false;
        }

        PessoaModel novaPessoa = new PessoaModel(
            null,
            dto.getNome(),
            dto.getDataNascimento(),
            dto.getTelefone(),
            dto.getCPF(),
            dto.getEmail(),
            dto.getSenha(),
            null,
            null
        );

        pessoaRepository.save(novaPessoa);
        return true;
    }

    public boolean validarLogin(LoginDTO loginDTO){ //Está mockado por enquanto
        String email = loginDTO.getEmail();
        String senha = loginDTO.getSenha();


        Optional<PessoaModel> emailEncontrado = pessoaRepository.findByEmail(email);

        if(emailEncontrado.isEmpty()){
            return false;
        }

        PessoaModel user = emailEncontrado.get();

        if(senha.equals(user.getSenha())){
            return true;
        }else {
            return false;
        }
    }
}
