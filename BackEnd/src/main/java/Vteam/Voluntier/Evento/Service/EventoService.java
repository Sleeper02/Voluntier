package Vteam.Voluntier.Evento.Service;

import Vteam.Voluntier.Evento.DTOS.CadastroEventoDTO;
import Vteam.Voluntier.Evento.DTOS.EventosVoluntarioDTO;
import Vteam.Voluntier.Evento.DTOS.ListagemEventoDTO;
import Vteam.Voluntier.Evento.DTOS.ViewRecompensaDTO;
import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.Model.EventoModel;
import Vteam.Voluntier.Evento.Repository.EventoRepository;
import Vteam.Voluntier.Inscricao.Enum.SolicitacaoEnum;
import Vteam.Voluntier.Inscricao.Repository.InscricaoRepository;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import Vteam.Voluntier.Pessoa.Service.PessoaService;
import jdk.jfr.Event;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.swing.text.View;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EventoService {

    private final EventoRepository repository;
    private final ModelMapper mapper;
    private final PessoaService pessoaService;
    private final InscricaoRepository inscricaoRepository;

    public EventoService(EventoRepository repository, ModelMapper mapper, PessoaService pessoaService, InscricaoRepository inscricaoRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.pessoaService = pessoaService;
        this.inscricaoRepository = inscricaoRepository;
    }

    public Boolean criarEvento(CadastroEventoDTO cadastroEvento){

//            if (!instituicaoRepository.existsById(cadastroEvento.getIdInstituicao())) { adicionar ao criar classe Instituição
//                throw new RuntimeException("Instituição não encontrada");
//            }
        try {
            EventoModel evento = mapper.map(cadastroEvento, EventoModel.class);
            evento.setId(null);
            evento.setDataCriacao(LocalDate.now(ZoneId.of("America/Sao_Paulo")));
            evento.setSolicitacao(EventoStatus.APROVADO);
            if (evento.getRecompensas() == null) {
                evento.setRecompensas(EventoModel.defaultRecompensas());
            }
            if (cadastroEvento.getRecompensasImagens() != null) {
                evento.setRecompensasImagens(cadastroEvento.getRecompensasImagens());
            }
            repository.save(evento);

            return true;

        }catch (Exception e){
            return false;
        }
    }

    public Boolean finalizarEvento(String id){
        try {
            EventoModel evento = repository.findById(id).orElseThrow(()
                    -> new RuntimeException("Evento não encontrado"));

            evento.setSolicitacao(EventoStatus.FINALIZADO);
            repository.save(evento);

            for (String pId : evento.getInscritos()){
                pessoaService.registrarParticipacao(pId, id);
            }

            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public ListagemEventoDTO buscarPorId(String id) {
        EventoModel evento = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
        return toListagemDTO(evento);
    }

    public List<ListagemEventoDTO> listarEventosInstituicao(String idInstituicao, String ordem) {
        List<EventoModel> eventos = "desc".equalsIgnoreCase(ordem)
                ? repository.findAllByIdInstituicaoOrderByDataHoraDesc(idInstituicao)
                : repository.findAllByIdInstituicaoOrderByDataHoraAsc(idInstituicao);
        return eventos.stream().map(this::toListagemDTO).toList();
    }

    public EventosVoluntarioDTO listarEventosVoluntario(String idPessoa, String ordem) {
        LocalDateTime agora = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));

        Comparator<EventoModel> comparator = "desc".equalsIgnoreCase(ordem)
                ? Comparator.comparing(EventoModel::getDataHora).reversed()
                : Comparator.comparing(EventoModel::getDataHora);

        // ids inscritos iniciais (sem filtro de participados ainda)
        List<String> todosInscritos = inscricaoRepository.findAllByIdPessoa(idPessoa).stream()
                .filter(i -> i.getSolicitacao() != SolicitacaoEnum.CANCELADO)
                .map(i -> i.getIdEvento())
                .toList();

        // auto-finaliza eventos passados que ainda estão APROVADOS
        repository.findAllById(todosInscritos).stream()
                .filter(e -> e.getDataHora() != null && e.getDataHora().isBefore(agora))
                .filter(e -> e.getSolicitacao() == EventoStatus.APROVADO)
                .forEach(e -> finalizarEvento(e.getId()));

        // recarrega pessoa para capturar pontos e eventosParticipados atualizados
        PessoaModel pessoaAtualizada = pessoaService.buscarPorId(idPessoa);
        Set<String> participadosSet = new HashSet<>(pessoaAtualizada.getEventosParticipados());

        List<String> idsFinal = todosInscritos.stream()
                .filter(id -> !participadosSet.contains(id))
                .toList();

        List<ListagemEventoDTO> inscricoes = repository.findAllById(idsFinal).stream()
                .sorted(comparator)
                .map(this::toListagemDTO)
                .toList();

        List<ListagemEventoDTO> participacoes = repository.findAllById(participadosSet).stream()
                .sorted(comparator)
                .map(this::toListagemDTO)
                .toList();

        return new EventosVoluntarioDTO(inscricoes, participacoes);
    }

    private ListagemEventoDTO toListagemDTO(EventoModel e) {
        LocalDateTime dataCriacao = e.getDataCriacao() != null ? e.getDataCriacao().atStartOfDay() : null;
        return new ListagemEventoDTO(e.getId(), e.getTitulo(), e.getDescricao(), dataCriacao, e.getDataHora(), e.getLocalizacao(), e.getIdInstituicao(), e.getFotos());
    }

    public List<ViewRecompensaDTO> recompensasEvento (String id){
        List<EventoModel> eventoInst = repository.findAllByIdInstituicao(id)
                .orElse(List.of());

        return eventoInst.stream()
                .flatMap(evento -> evento.getRecompensas().entrySet().stream()
                        .filter(entrada -> entrada.getValue() != null && !entrada.getValue().equals("NULL") && !entrada.getValue().isBlank())
                        .map(entrada -> {
                            String imagem = evento.getRecompensasImagens() != null
                                    ? evento.getRecompensasImagens().get(entrada.getKey())
                                    : null;
                            return new ViewRecompensaDTO(
                                    evento.getTitulo(),
                                    evento.getId(),
                                    entrada.getValue(),
                                    entrada.getKey(),
                                    imagem
                            );
                        })
                )
                .toList();
    }

    public List<ListagemEventoDTO> listarEventos(String ordenar, AreaAtuacao tag){
        List<EventoModel> eventos = repository.findAll();

        Comparator<EventoModel> comparator = switch (ordenar){
            case "realizacao" -> Comparator.comparing(EventoModel::getDataHora, Comparator.nullsLast(Comparator.naturalOrder()));
            default -> Comparator.comparing(EventoModel::getDataCriacao, Comparator.nullsLast(Comparator.naturalOrder()));
        };

        LocalDateTime agora = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
        return eventos.stream()
                .filter(e -> e.getSolicitacao() == EventoStatus.APROVADO)
                .filter(e -> e.getDataHora() != null && e.getDataHora().isAfter(agora))
                .filter(e -> tag == null || e.getAreaAtuacao() == tag)
                .sorted(comparator)
                .map(this::toListagemDTO)
                .toList();
    }
}
