package Vteam.Voluntier.Avaliacao.Service;

import Vteam.Voluntier.Avaliacao.DTOs.CriarAvaliacaoDTO;
import Vteam.Voluntier.Avaliacao.DTOs.DashBoardAvaliacaoDTO;
import Vteam.Voluntier.Avaliacao.DTOs.ViewAvalicaoDTO;
import Vteam.Voluntier.Avaliacao.Model.AvaliacaoModel;
import Vteam.Voluntier.Avaliacao.Repository.AvaliacaoRepository;
import Vteam.Voluntier.Evento.Model.EventoModel;
import Vteam.Voluntier.Evento.Repository.EventoRepository;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import Vteam.Voluntier.Pessoa.Repository.PessoaRepository;
import Vteam.Voluntier.Pessoa.Service.PessoaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaorepository;
    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private ModelMapper mapper;

    public Boolean avaliar(String idPessoa, String idEvento, CriarAvaliacaoDTO dto){
        Optional<PessoaModel> p = pessoaRepository.findById(idPessoa);

        if(p.isEmpty()){
            throw new IllegalArgumentException(("Id do voluntario não existe"));
        }

        PessoaModel pessoa = p.get();

        boolean participou = pessoa.getEventosParticipados().stream().anyMatch(id -> id.equals(idEvento));
        boolean inscrito = eventoRepository.findById(idEvento)
                .map(e -> e.getInscritos().contains(idPessoa))
                .orElse(false);

        if (!participou && !inscrito) {
            throw new IllegalArgumentException("Voluntario não está inscrito nesse evento!");
        }
        if(avaliacaorepository.existsByIdPessoaAndIdEvento(idPessoa, idEvento)){
            throw new IllegalArgumentException("Voluntario já avaliou esse evento");
        }

        AvaliacaoModel avaliacao = mapper.map(dto, AvaliacaoModel.class);
        avaliacao.setIdPessoa(idPessoa);
        avaliacao.setIdEvento(idEvento);
        avaliacaorepository.save(avaliacao);

        return true;


    }

    public ViewAvalicaoDTO visualizarAvaliacao(String idPessoa, String idEvento){
        if(!pessoaRepository.existsById(idPessoa)){
            throw new IllegalArgumentException("Voluntario não encontrado!");
        }

        if(!eventoRepository.existsById(idEvento)){
            throw new IllegalArgumentException("Evento não encontrado!");
        }

        AvaliacaoModel avaliacao = avaliacaorepository.findByIdPessoaAndIdEvento(idPessoa, idEvento).
                orElseThrow(() -> new IllegalArgumentException("Avaliação não encontrada!"));

           return mapper.map(avaliacao, ViewAvalicaoDTO.class);
    }

    public DashBoardAvaliacaoDTO visualizarAvaliacoes(String idInst, String idEvento){
        EventoModel dashBoard = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new IllegalArgumentException("Evento não encontrado!"));

        if(!dashBoard.getIdInstituicao().equals(idInst)){
            throw new IllegalArgumentException("Esse evento não pertence a sua instituição!");
        }

        List<AvaliacaoModel> avaliacoes = avaliacaorepository.findAllByIdEvento(idEvento);

        if (avaliacoes.isEmpty()){
            throw new IllegalArgumentException("Nenhuma avaliação feita nesse evento");
        }

        List<ViewAvalicaoDTO> avalicaoDTOS = avaliacoes.stream()
                .map(a -> mapper.map(a, ViewAvalicaoDTO.class))
                .toList();

        float media = (float) avaliacoes.stream()
                .mapToInt(a -> a.getAvaliacao())
                .average().orElse(0);

        Map<Integer, Long> distribuicao = avaliacoes.stream()
                .collect(Collectors.groupingBy(a -> a.getAvaliacao(), Collectors.counting()));

        Map<String, Long> frequenciaTermo = avaliacoes.stream()
                .flatMap(a -> a.getTermosAvaliacao().stream())
                .collect(Collectors.groupingBy(a -> a.name() , Collectors.counting()));

        return new DashBoardAvaliacaoDTO(avalicaoDTOS, media, distribuicao, frequenciaTermo);


    }

}
