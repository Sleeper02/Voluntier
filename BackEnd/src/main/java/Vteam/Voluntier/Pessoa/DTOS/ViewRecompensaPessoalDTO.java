package Vteam.Voluntier.Pessoa.DTOS;

import Vteam.Voluntier.Pessoa.Enums.TierConta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ViewRecompensaPessoalDTO {

    private TierConta tierConta;
    private int pontosProxT;
    private List<RecompensaPessoaDTO>  recompensas;
}
