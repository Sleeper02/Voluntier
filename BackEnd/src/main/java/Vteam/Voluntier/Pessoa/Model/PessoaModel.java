package Vteam.Voluntier.Pessoa.Model;

import Vteam.Voluntier.Pessoa.TierConta;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data //Milani -> coloca isso aq pra fazer o getters/setters

@Document(collection = "usuario")
public class PessoaModel {

    @Id
    private String ID_pessoa;

    @NotBlank (message = "Nome de usuario não pode ser vazio")
    @Field("nome")
    private String nome_pessoa;

    @NotNull(message = "Data de nascimento do usuario não pode ser vazio")
    private LocalDate dataNascimento_pessoa; //(ano, mes, dia)

    @Pattern(regexp = "^\\d{10,11}$", message = "O telefone deve conter apenas números e ter entre 10 e 11 dígitos (com DDD)")
    private String telefone_pessoa;

    @NotBlank (message = "CPF de usuario não pode ser vazio")
    @CPF(message = "O CPF digitado é inválido") // O Spring já tem um validador pronto
    @Indexed(unique = true)
    private String CPF_pessoa;

    @NotBlank (message = "Email de usuario não pode ser vazio")
    @Indexed(unique = true)
    private String email_pessoa;

    @NotBlank(message = "A senha não pode ser vazia")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    @JsonIgnore
    private String senha_pessoa;

    private TierConta tier_pessoa; //mock

    private Object evento_pessoa; //mock
}
