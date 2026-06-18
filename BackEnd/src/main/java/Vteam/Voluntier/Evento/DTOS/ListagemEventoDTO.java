package Vteam.Voluntier.Evento.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ListagemEventoDTO {

    private String id;
    private String titulo;
    private String descricao;
    private LocalDate dataCriacao;
    private LocalDateTime dataHora;
    private String localizacao;
    private String idInstituicao;
}
