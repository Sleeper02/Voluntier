package Vteam.Voluntier.Evento.Model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Document(collection = "eventos")
public class EventoModel {

    @Id
    private String id;

    @NotBlank
    @Field("nome")
    private String nome;

    @NotNull
    @Field("DataEvento")
    private LocalDate dataHora;

    @NotBlank
    @Field("IdInsituição")
    private String idInstituicao; //Verificar no service se existe

    @NotNull
    @Field("Lotação")
    private int lotacao;

    @NotNull
    @Field("Inscritos")
    private int inscritos;

    @Field("Descrição Evento")
    private String descricao;

    @Field("Solicitação")
    private boolean solicitacao;

    @Field("Tier")
    private TierEvento tier;

    @Field("Fotos")
    private String fotos; //Colocar URL da foto
}
