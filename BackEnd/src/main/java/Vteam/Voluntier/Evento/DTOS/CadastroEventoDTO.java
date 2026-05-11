package Vteam.Voluntier.Evento.DTOS;

import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.EnumsEvento.TierEvento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

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
}
