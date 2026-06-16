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
import java.time.ZoneId;
import java.util.Comparator;
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
            if (evento.getRecompensas() == null) {
                evento.setRecompensas(EventoModel.defaultRecompensas());
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

    public List<ListagemEventoDTO> listarEventosInstituicao(String idInstituicao, String ordem) {
        List<EventoModel> eventos = "desc".equalsIgnoreCase(ordem)
                ? repository.findAllByIdInstituicaoOrderByDataHoraDesc(idInstituicao)
                : repository.findAllByIdInstituicaoOrderByDataHoraAsc(idInstituicao);
        return eventos.stream().map(this::toListagemDTO).toList();
    }

    public EventosVoluntarioDTO listarEventosVoluntario(String idPessoa, String ordem) {
        PessoaModel pessoa = pessoaService.buscarPorId(idPessoa);

        Set<String> participadosSet = new HashSet<>(pessoa.getEventosParticipados());

        Comparator<ListagemEventoDTO> comparator = "desc".equalsIgnoreCase(ordem)
                ? Comparator.comparing(ListagemEventoDTO::getDataHora).reversed()
                : Comparator.comparing(ListagemEventoDTO::getDataHora);

        List<String> idsInscritos = inscricaoRepository.findAllByIdPessoa(idPessoa).stream()
                .filter(i -> i.getSolicitacao() != SolicitacaoEnum.CANCELADO)
                .map(i -> i.getIdEvento())
                .filter(id -> !participadosSet.contains(id))
                .toList();

        List<ListagemEventoDTO> inscricoes = repository.findAllById(idsInscritos).stream()
                .map(this::toListagemDTO)
                .sorted(comparator)
                .toList();

        List<ListagemEventoDTO> participacoes = repository.findAllById(participadosSet).stream()
                .map(this::toListagemDTO)
                .sorted(comparator)
                .toList();

        return new EventosVoluntarioDTO(inscricoes, participacoes);
    }

    private ListagemEventoDTO toListagemDTO(EventoModel e) {
        return new ListagemEventoDTO(e.getId(), e.getTitulo(), e.getDataHora(), e.getSolicitacao(), e.getIdInstituicao());
    }

    public List<ViewRecompensaDTO> recompensasEvento (String id){
        List<EventoModel> eventoInst = repository.findAllByIdInstituicao(id)
                .orElse(List.of());

        return eventoInst.stream()
                .flatMap(evento -> evento.getRecompensas().entrySet().stream()
                        .map(entrada -> new ViewRecompensaDTO(
                                evento.getTitulo(),
                                evento.getId(),
                                entrada.getValue(), // recompensa (descrição)
                                entrada.getKey() // tierConta
                        ))
                )
                        .toList();
    }

    public List<ListagemEventoDTO> listarEventos(String ordenar, AreaAtuacao tag){
        List<EventoModel> eventos = repository.findAll();

        Comparator<EventoModel> comparator = switch (ordenar){
            case "realizacao" -> Comparator.comparing(EventoModel :: getDataHora);
            default -> Comparator.comparing(EventoModel :: getDataCriacao);
        };

        return eventos.stream()
                .filter(e -> e.getSolicitacao() == EventoStatus.APROVADO)
                .filter(e -> tag == null || e.getAreaAtuacao() == tag)
                .sorted(comparator)
                .map(e -> mapper.map(e, ListagemEventoDTO.class))
                .toList();
    }
}
