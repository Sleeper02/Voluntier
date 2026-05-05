package Vteam.Voluntier.Pessoa.Model;

import Vteam.Voluntier.Pessoa.TierConta;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

@NoArgsConstructor
@AllArgsConstructor
@Data //Milani -> coloca isso aq pra fazer o getters/setters

@Document(collection = "usuario")
public class PessoaModel {

    @Id
    private String ID;

    @NotBlank (message = "Nome de usuario não pode ser vazio")
    @Field("nome")
    private String nome;

    @NotNull(message = "Data de nascimento do usuario não pode ser vazio")
    private LocalDate dataNascimento; //(ano, mes, dia)

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

    private TierConta tier; //mock

    private Object evento; //mock
}
