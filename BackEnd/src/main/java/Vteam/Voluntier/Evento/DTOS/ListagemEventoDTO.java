package Vteam.Voluntier.Evento.DTOS;

import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListagemEventoDTO {
    private String id;
    private String titulo;
    private LocalDateTime dataHora;
    private EventoStatus status;
    private String idInstituicao;
}
