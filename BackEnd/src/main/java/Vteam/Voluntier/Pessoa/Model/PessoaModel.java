package Vteam.Voluntier.Pessoa.Model;

import Vteam.Voluntier.Pessoa.Enums.PerfilConta;
import Vteam.Voluntier.Pessoa.Enums.TierConta;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data //Milani -> coloca isso aq pra fazer o getters/setters

@Document(collection = "usuario")
public class PessoaModel {

    @Id
    @JsonProperty("id")
    private String ID;

    @NotBlank (message = "Nome de usuario não pode ser vazio")
    @Field("nome")
    private String nome;

    @NotNull(message = "Data de nascimento do usuario não pode ser vazio")
    private LocalDate dataNascimento; //(ano, mes, dia)

    @NotNull(message = "Telefone de usuario não pode ser vazio")
    @Pattern(regexp = "^\\d{10,11}$", message = "O telefone deve conter apenas números e ter entre 10 e 11 dígitos (com DDD)")
    private String telefone;

    @NotBlank (message = "CPF de usuario não pode ser vazio")
    @CPF(message = "O CPF digitado é inválido") // O Spring já tem um validador pronto
    @Indexed(unique = true)
    private String CPF; //CPF tá em maiusculo então no json tbm tem q estár n esquece

    @NotBlank (message = "Email de usuario não pode ser vazio")
    @Indexed(unique = true)
    @Email(message = "O formato do email é inválido")
    private String email;

    @NotBlank(message = "A senha não pode ser vazia")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    @JsonIgnore
    private String senha;

    private TierConta tier;

    private PerfilConta perfil;

    private int pontos;

    private List<String> eventosParticipados = new ArrayList<>(); // salva o ID do evento

    @Field("RecompensasResgatadas")
    private List<String> recompensasResgatadas = new ArrayList<>(); // IDs de eventos cuja recompensa foi resgatada

    @Field("DataBronze")
    private LocalDateTime dataBronze; // quando atingiu BRONZE

    @Field("DataPrata")
    private LocalDateTime dataPrata; // quando atingiu PRATA

    @Field("DataOuro")
    private LocalDateTime dataOuro; // quando atingiu OURO

    @Field("DataDiamante")
    private LocalDateTime dataDiamante; // quando atingiu DIAMANTE

    public void recalcularTiers() {
        TierConta novoTier = TierConta.NENHUM;
        LocalDateTime agora = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));

        if (pontos >= 100) {
            novoTier = TierConta.DIAMANTE;
            if (tier != TierConta.DIAMANTE && dataDiamante == null) {
                dataDiamante = agora;
            }
        } else if (pontos >= 50) {
            novoTier = TierConta.OURO;
            if (tier != TierConta.OURO && dataOuro == null) {
                dataOuro = agora;
            }
        } else if (pontos >= 25) {
            novoTier = TierConta.PRATA;
            if (tier != TierConta.PRATA && dataPrata == null) {
                dataPrata = agora;
            }
        } else if (pontos >= 10) {
            novoTier = TierConta.BRONZE;
            if (tier != TierConta.BRONZE && dataBronze == null) {
                dataBronze = agora;
            }
        }

        this.tier = novoTier;
    }

}
