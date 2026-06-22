package Vteam.Voluntier.Inscricao.DTOs;

import Vteam.Voluntier.Pessoa.Enums.TierConta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InscritoDTO {
    private String id;
    private String nome;
    private TierConta tier;
    private int pontos;
}
