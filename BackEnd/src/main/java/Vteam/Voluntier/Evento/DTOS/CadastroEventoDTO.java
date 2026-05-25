package Vteam.Voluntier.Evento.DTOS;

import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.EnumsEvento.TierEvento;
import Vteam.Voluntier.Pessoa.Enums.TierConta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class CadastroEventoDTO {


    private String titulo;
    private LocalDate dataHora;
    private String idInstituicao; //Verificar no service se existe
    private int lotacao;
    private String descricao;
    private EventoStatus solicitacao;
    private AreaAtuacao areaAtuacao;
    private TierEvento tier;
    private String fotos;
    private Map<TierConta, String> recompensas;
}
