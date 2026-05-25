package Vteam.Voluntier.Evento.DTOS;

import Vteam.Voluntier.Pessoa.Enums.TierConta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ViewRecompensaDTO {

    private String eventoNome;
    private String eventoId;
    private String recompensa;
    private TierConta tierConta;
}
