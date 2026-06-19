package Vteam.Voluntier.Security;

import Vteam.Voluntier.Pessoa.Enums.PerfilAcesso;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Schema(description = "Resposta retornada após autenticação bem-sucedida")
public class LoginResponseDTO {

    @Schema(description = "JWT de acesso para uso nos headers das requisições", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String token;

    @Schema(description = "Identificador único do usuário autenticado", example = "64a3f2c1b8e4d700123abc")
    private String id;

    @Schema(description = "Perfil do usuário autenticado", example = "VOLUNTARIO")
    private PerfilAcesso role;
}
