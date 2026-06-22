package Vteam.Voluntier.Pessoa.Service;

import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.Model.EventoModel;
import Vteam.Voluntier.Evento.Repository.EventoRepository;
import Vteam.Voluntier.Pessoa.Enums.TierConta;
import Vteam.Voluntier.Pessoa.DTOS.CadastroDTO;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Pessoa.DTOS.RecompensaPessoaDTO;
import Vteam.Voluntier.Pessoa.DTOS.ViewRecompensaPessoalDTO;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import Vteam.Voluntier.Pessoa.Repository.PessoaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import Vteam.Voluntier.Pessoa.Enums.PerfilConta;

@Service
public class PessoaService {
    private final PessoaRepository pessoaRepository;
    private final EventoRepository eventoRepository;
    private final ModelMapper mapper;

    public PessoaService(PessoaRepository pessoaRepository, EventoRepository eventoRepository, ModelMapper mapper) {
        this.pessoaRepository = pessoaRepository;
        this.eventoRepository = eventoRepository;
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
    finalizarEventosPassados();

    return pessoaRepository.findByPerfilOrderByPontosDesc(
            PerfilConta.VOLUNTARIO
    );
}

    private void finalizarEventosPassados() {
        LocalDateTime agora = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
        eventoRepository.findAll().stream()
                .filter(e -> e.getDataHora() != null && e.getDataHora().isBefore(agora))
                .filter(e -> e.getSolicitacao() == EventoStatus.APROVADO)
                .forEach(e -> {
                    e.setSolicitacao(EventoStatus.FINALIZADO);
                    eventoRepository.save(e);
                    for (String pId : e.getInscritos()) {
                        try { registrarParticipacao(pId, e.getId()); } catch (Exception ignored) {}
                    }
                });
    }

    public ViewRecompensaPessoalDTO recompensaPessoa(String pessoaId){
        PessoaModel pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        TierConta tierAtual = pessoa.getTier() != null ? pessoa.getTier() : TierConta.NENHUM;

        List<RecompensaPessoaDTO> recompensa = pessoa.getEventosParticipados().stream()
                .map(eventoId -> eventoRepository.findById(eventoId))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .filter(evento -> {
                    String desc = evento.getRecompensas().get(tierAtual);
                    return desc != null && !desc.equals("NULL") && !desc.isBlank();
                })
                .map(evento -> {
                    String nomeInst = pessoaRepository.findById(evento.getIdInstituicao())
                            .map(inst -> inst.getNome())
                            .orElse("Instituição");
                    String imagem = evento.getRecompensasImagens() != null
                            ? evento.getRecompensasImagens().get(tierAtual)
                            : null;
                    return new RecompensaPessoaDTO(
                            nomeInst,
                            evento.getTitulo(),
                            evento.getRecompensas().get(tierAtual),
                            tierAtual,
                            imagem
                    );
                })
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

    public boolean resgatarRecompensa(String pessoaId, String idEvento) {
        PessoaModel pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new IllegalArgumentException("Pessoa não encontrada"));

        if (!pessoa.getRecompensasResgatadas().contains(idEvento)) {
            pessoa.getRecompensasResgatadas().add(idEvento);
            pessoaRepository.save(pessoa);
        }
        return true;
    }
}
