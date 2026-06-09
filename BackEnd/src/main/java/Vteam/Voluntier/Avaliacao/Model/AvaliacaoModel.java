package Vteam.Voluntier.Avaliacao.Model;

import Vteam.Voluntier.Avaliacao.Enums.Termos;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "avaliacao")
public class AvaliacaoModel {

    @Id
    private String id;

    @NotBlank(message = "Error: Idpessoa faltando")
    @Field("idPessoa")
    private String idPessoa;

    @NotBlank(message = "Error: idEvento faltando")
    @Field("idEvento")
    private String idEvento;

    @Min(value = 1, message = "Nota mínima é 1")
    @Max(value = 5, message = "Nota máxima é 5")
    @Field("avaliacao")
    private int avaliacao;

    @Field("termosAvaliacao")
    private List<Termos> termosAvaliacao;

    @Field("comentario")
    private String comentario;
}
