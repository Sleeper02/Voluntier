package Vteam.Voluntier.Instituicao.Model;

import Vteam.Voluntier.Pessoa.Enums.PerfilAcesso;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "instituicao")
public class InstituicaoModel {

    @Id
    private String id;

    @NotBlank(message = "Nome da instituição não pode ser vazio")
    private String nome;

    @NotBlank(message = "CNPJ não pode ser vazio")
    @Indexed(unique = true)
    private String CNPJ;

    @NotBlank(message = "Email não pode ser vazio")
    @Email(message = "Formato de email inválido")
    @Indexed(unique = true)
    private String email;

    @NotBlank(message = "Senha não pode ser vazia")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    @JsonIgnore
    private String senha;

    @Pattern(regexp = "^\\d{10,11}$", message = "O telefone deve conter apenas números e ter entre 10 e 11 dígitos (com DDD)")
    private String telefone;

    private String descricao;

    private PerfilAcesso role = PerfilAcesso.INSTITUICAO;
}
