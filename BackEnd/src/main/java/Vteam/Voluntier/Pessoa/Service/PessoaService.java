package Vteam.Voluntier.Pessoa.Service;

import Vteam.Voluntier.Evento.Repository.EventoRepository;
import Vteam.Voluntier.Pessoa.DTOS.CadastroDTO;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Pessoa.DTOS.RecompensaPessoaDTO;
import Vteam.Voluntier.Pessoa.DTOS.ViewRecompensaPessoalDTO;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import Vteam.Voluntier.Pessoa.Repository.PessoaRepository;
import Vteam.Voluntier.Security.JwtUtil;
import Vteam.Voluntier.Security.LoginResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {
    private final PessoaRepository pessoaRepository;
    private final EventoRepository eventoRepository;
    private final ModelMapper mapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public PessoaService(PessoaRepository pessoaRepository, EventoRepository eventoRepository,
                         ModelMapper mapper, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.pessoaRepository = pessoaRepository;
        this.eventoRepository = eventoRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    public boolean cadastroCliente(CadastroDTO dto) {
        if (pessoaRepository.existsByEmail(dto.getEmail()) || pessoaRepository.existsByCPF(dto.getCPF())) {
            return false;
        }

        try {
            PessoaModel novaPessoa = mapper.map(dto, PessoaModel.class);
            novaPessoa.setSenha(passwordEncoder.encode(novaPessoa.getSenha()));
            novaPessoa.recalcularTiers();
            pessoaRepository.save(novaPessoa);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public LoginResponseDTO validarLogin(LoginDTO loginDTO) {
        PessoaModel user = pessoaRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou senha incorretos"));

        if (!passwordEncoder.matches(loginDTO.getSenha(), user.getSenha())) {
            throw new IllegalArgumentException("Email ou senha incorretos");
        }

        String token = jwtUtil.gerarToken(user.getID(), user.getRole().name());
        return new LoginResponseDTO(token, user.getID(), user.getRole());
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

    public ViewRecompensaPessoalDTO recompensaPessoa(String pessoaId){
        PessoaModel pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<RecompensaPessoaDTO> recompensa = pessoa.getEventosParticipados().stream()
                .map(eventoId -> eventoRepository.findById(eventoId))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(evento -> new RecompensaPessoaDTO(
                        "mock instituição",
                        evento.getTitulo(),
                        evento.getRecompensas().get(pessoa.getTier()),
                        pessoa.getTier()
                ))
                .toList();

        return new ViewRecompensaPessoalDTO(
                pessoa.getTier(),
                proxTier(pessoa.getPontos()),
                recompensa
        );
    }

    public PessoaModel buscarPorId(String id) {
        return pessoaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pessoa não encontrada"));
    }

    private int proxTier(int pontos){
        if (pontos < 10)  return 10  - pontos;
        if (pontos < 25)  return 25  - pontos;
        if (pontos < 50)  return 50  - pontos;
        if (pontos < 100) return 100 - pontos;
        return 0; // já é DIAMANTE
    }
}
