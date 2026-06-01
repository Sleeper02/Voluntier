package Vteam.Voluntier.Evento.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventosVoluntarioDTO {
    private List<ListagemEventoDTO> inscricoes;
    private List<ListagemEventoDTO> participacoes;
}
