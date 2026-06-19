package Vteam.Voluntier.Bloqueio.Service;

import Vteam.Voluntier.Bloqueio.Model.BloqueioModel;
import Vteam.Voluntier.Bloqueio.Repository.BloqueioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloqueioService {

    private final BloqueioRepository repository;

    public BloqueioService(BloqueioRepository repository) {
        this.repository = repository;
    }

    public void bloquear(String idInstituicao, String idPessoa) {
        if (repository.existsByIdInstituicaoAndIdPessoa(idInstituicao, idPessoa)) {
            return; // já bloqueado
        }
        BloqueioModel b = new BloqueioModel();
        b.setIdInstituicao(idInstituicao);
        b.setIdPessoa(idPessoa);
        repository.save(b);
    }

    public boolean isBloqueado(String idInstituicao, String idPessoa) {
        return repository.existsByIdInstituicaoAndIdPessoa(idInstituicao, idPessoa);
    }

    public List<BloqueioModel> buscarPorPessoa(String idPessoa) {
        return repository.findAllByIdPessoa(idPessoa);
    }

    public List<BloqueioModel> buscarPorInstituicao(String idInstituicao) {
        return repository.findAllByIdInstituicao(idInstituicao);
    }
}
