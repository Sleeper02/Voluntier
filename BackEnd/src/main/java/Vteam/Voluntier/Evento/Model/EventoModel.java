package Vteam.Voluntier.Evento.Model;

import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.EnumsEvento.EventoStatus;
import Vteam.Voluntier.Evento.EnumsEvento.TierEvento;
import Vteam.Voluntier.Pessoa.Model.TierConta;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Document(collection = "eventos")
public class EventoModel {

    @Id
    private String id;

    @NotBlank
    @Field("nome Evento")
    private String titulo;

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
    private List<String> inscritos = new ArrayList<>();

    @Field("Descrição Evento")
    private String descricao;

    @Field("Solicitação")
    private EventoStatus solicitacao;

    @Field("Area de atuação")
    private AreaAtuacao areaAtuacao;

    @Field("Tier")
    private TierEvento tier;

    @Field("Fotos")
    private String fotos; //Colocar URL da foto

    @Field("Recompensas")
    private Map<TierConta, String> recompensas = defaultRecompensas();

    public static Map<TierConta, String> defaultRecompensas() {
        Map<TierConta, String> map = new EnumMap<>(TierConta.class);
        for (TierConta tier : TierConta.values()) {
            map.put(tier, "NULL");
        }
        return map;
    }
}
