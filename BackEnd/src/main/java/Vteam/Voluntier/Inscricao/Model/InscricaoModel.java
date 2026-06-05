package Vteam.Voluntier.Inscricao.Model;

import Vteam.Voluntier.Inscricao.Enum.SolicitacaoEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "inscricoes")
public class InscricaoModel {

    @Id
    private String id;

    @NotBlank(message = "Error: IdPessoa faltando")
    @Field("IdPessoa")
    private String idPessoa;

    @NotBlank(message = "Error: IdEvento faltando")
    @Field("IdEvento")
    private String idEvento;

    @Field("DataEvento")
    private LocalDateTime dataEvento;

    @Field("Solicitacao")
    private SolicitacaoEnum solicitacao;
}
