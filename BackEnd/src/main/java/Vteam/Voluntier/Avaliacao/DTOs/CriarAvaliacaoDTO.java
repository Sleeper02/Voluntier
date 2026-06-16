package Vteam.Voluntier.Avaliacao.DTOs;

import Vteam.Voluntier.Avaliacao.Enums.Termos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor


public class CriarAvaliacaoDTO {

    private List<Termos> termosAvaliacao;
    private int avaliacao;
    private String comentario;

}
