package Vteam.Voluntier.Pessoa.DTOS;

import Vteam.Voluntier.Pessoa.Enums.TierConta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RecompensaPessoaDTO {

    private String nomeInstituicao;
    private String eventoNome;
    private String recompensa;
    private TierConta tierNecessario;
    private String imagem;
}
