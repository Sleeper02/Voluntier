package Vteam.Voluntier.Inscricao.DTOs;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.mongodb.core.mapping.Field;

public class InscreverDTO {

    @NotBlank(message = "Error: IdPessoa faltando")
    @Field("IdPessoa")
    private String idPessoa;

    @NotBlank(message = "Error: IdEvento faltando")
    @Field("IdEvento")
    private String idEvento;
}
