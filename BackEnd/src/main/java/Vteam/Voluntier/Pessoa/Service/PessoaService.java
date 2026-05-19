package Vteam.Voluntier.Pessoa.Service;

import Vteam.Voluntier.Pessoa.DTOS.CadastroDTO;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import Vteam.Voluntier.Pessoa.Model.TierConta;
import Vteam.Voluntier.Pessoa.Repository.PessoaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {
    private final PessoaRepository pessoaRepository;
    private final ModelMapper mapper;

    public PessoaService(PessoaRepository pessoaRepository, ModelMapper mapper) {
        this.pessoaRepository = pessoaRepository;
        this.mapper = mapper;
    }

    public boolean cadastroCliente(CadastroDTO dto) {
        if (pessoaRepository.existsByEmail(dto.getEmail()) || pessoaRepository.existsByCPF(dto.getCPF())) {
            return false;
        }

        try {
            PessoaModel novaPessoa = mapper.map(dto, PessoaModel.class);
            novaPessoa.recalcularTiers();
            pessoaRepository.save(novaPessoa);
            return true;

        } catch (Exception e) {
            return false;
        }
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

    public void registrarParticipacao(String pId, String eId){
        PessoaModel pessoa = pessoaRepository.findById(pId).orElseThrow(()
        -> new RuntimeException("Usuário não encontrado"));

        pessoa.setPontos(pessoa.getPontos() + 1);
        pessoa.getEventosParticipados().add(eId);
        pessoa.recalcularTiers();
        pessoaRepository.save(pessoa);
    }

    public List<PessoaModel> getRanking(){
        return pessoaRepository.findAllByOrderByPontosDesc();
    }
}
