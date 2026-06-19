package Vteam.Voluntier.Inscricao.Service;

import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.Model.EventoModel;
import Vteam.Voluntier.Evento.Repository.EventoRepository;
import Vteam.Voluntier.Inscricao.Enum.SolicitacaoEnum;
import Vteam.Voluntier.Inscricao.Model.InscricaoModel;
import Vteam.Voluntier.Inscricao.Repository.InscricaoRepository;
import Vteam.Voluntier.Pessoa.Repository.PessoaRepository;
import Vteam.Voluntier.Bloqueio.Repository.BloqueioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InscricaoService {

    @Autowired
    private InscricaoRepository inscricaoRepository;
    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private PessoaRepository  pessoaRepository;
    @Autowired
    private BloqueioRepository bloqueioRepository;

    public boolean inscrever(String idPessoa, String idEvento){
        if(idPessoa.isEmpty() || idEvento.isEmpty()){
            throw new IllegalArgumentException("Error: IdPesosa ou IdEvento faltando");
        }
        if(!pessoaRepository.existsById(idPessoa)){
            throw new IllegalArgumentException("Error: Pessoa não encontrada!");
        }
        if(inscricaoRepository.existsByIdPessoaAndIdEvento(idPessoa, idEvento)){
            throw new IllegalArgumentException("Error: User já inscrito no evento");
        }

        EventoModel evento = eventoRepository.findById(idEvento).
                orElseThrow(() -> new IllegalArgumentException("Error: Evento não encontrado"));

        List<InscricaoModel> inscricaoPessoa = inscricaoRepository.findAllByIdPessoa(idPessoa);

        if(evento.getSolicitacao() == EventoStatus.RECUSADO){
            throw new IllegalArgumentException("Evento cancelado!");
        }

        // Verifica se a pessoa foi bloqueada pela instituição organizadora
        if (bloqueioRepository.existsByIdInstituicaoAndIdPessoa(evento.getIdInstituicao(), idPessoa)) {
            throw new IllegalArgumentException("Você foi bloqueado por esta instituição e não pode se inscrever");
        }

        if(evento.getInscritos().size() >= evento.getLotacao()){
            throw new IllegalArgumentException("Evento lotado!");
        }

        if(inscricaoPessoa.stream()
                .anyMatch(i -> i.getDataEvento()
                        .equals(evento.getDataHora()))){
            throw new IllegalArgumentException("Você já tem um evento nesse dia e horário!");
        }

        SolicitacaoEnum status = SolicitacaoEnum.PENDENTE;

        if(inscricaoPessoa.stream()
                .anyMatch(i -> i.getDataEvento().toLocalDate()
                .equals(evento.getDataHora().toLocalDate()))){
           status = SolicitacaoEnum.PENDENTE_AVISO;
        }


        InscricaoModel inscricao = new InscricaoModel(
                null,
                idPessoa,
                idEvento,
                evento.getDataHora(),
                status
        );

        inscricaoRepository.save(inscricao);
        evento.getInscritos().add(idPessoa);
        eventoRepository.save(evento);
        return true;
    }

    public boolean cancelarInscricao(String idPessoa, String idEvento){
        if(idPessoa.isEmpty() || idEvento.isEmpty()){
            throw new IllegalArgumentException("Error: IdPesosa ou IdEvento faltando");
        }
        if(!pessoaRepository.existsById(idPessoa)){
            throw new IllegalArgumentException("Error: Pessoa não encontrada!");
        }
        if(!inscricaoRepository.existsByIdPessoaAndIdEvento(idPessoa, idEvento)){
            throw new IllegalArgumentException("Error: inscrição não encontrada!");
        }


        EventoModel evento = eventoRepository.findById(idEvento).
                orElseThrow(() -> new IllegalArgumentException("Error: Evento não encontrado"));

        inscricaoRepository.deleteByIdPessoaAndIdEvento(idPessoa, idEvento);
        evento.getInscritos().remove(idPessoa);
        eventoRepository.save(evento);
        return true;
    }

}
