package Vteam.Voluntier.Security;

import Vteam.Voluntier.Pessoa.Enums.PerfilAcesso;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private String id;
    private PerfilAcesso role;
}
