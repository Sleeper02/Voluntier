package Vteam.Voluntier.Evento.DTOS;

import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.EnumsEvento.TierEvento;
import Vteam.Voluntier.Pessoa.Enums.TierConta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class CadastroEventoDTO {


    private String titulo;
    private LocalDateTime dataHora;
    private String localizacao;
    private String idInstituicao;
    private int lotacao;
    private String descricao;
    private EventoStatus solicitacao;
    private AreaAtuacao areaAtuacao;
    private TierEvento tier;
    private List<String> fotos;
    private Map<TierConta, String> recompensas;
    private Map<TierConta, String> recompensasImagens;
}
