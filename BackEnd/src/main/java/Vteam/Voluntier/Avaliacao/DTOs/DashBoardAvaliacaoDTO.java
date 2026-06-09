package Vteam.Voluntier.Avaliacao.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class DashBoardAvaliacaoDTO {

    private List<ViewAvalicaoDTO> avaliacoes;
    private float mediaAvaliacao;
    private Map<Integer, Long> distribuicao;
    private Map<String, Long> frequenciaTermos;
}
