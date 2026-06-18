package Vteam.Voluntier.Instituicao.DTOs;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CadastroInstituicaoDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "CNPJ é obrigatório")
    private String CNPJ;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Formato de email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    private String senha;

    @Pattern(regexp = "^\\d{10,11}$", message = "O telefone deve conter apenas números e ter entre 10 e 11 dígitos (com DDD)")
    private String telefone;

    private String descricao;
}
