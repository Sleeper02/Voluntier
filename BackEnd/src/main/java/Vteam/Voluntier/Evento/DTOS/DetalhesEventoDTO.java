package Vteam.Voluntier.Evento.DTOS;

import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.EnumsEvento.TierEvento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class DetalhesEventoDTO {

    @Id
    private String id;

    @NotBlank
    @Field("nome Evento")
    private String titulo;

    @NotNull
    @Field("DataEvento")
    private LocalDate dataHora;

    @NotNull
    @Field("Inscritos")
    private int inscritos;

    @Field("Descrição Evento")
    private String descricao;

    @Field("Area de atuação")
    private AreaAtuacao areaAtuacao;

    @Field("Tier")
    private TierEvento tier;

    @Field("Fotos")
    private String fotos; //Colocar URL da foto
}
