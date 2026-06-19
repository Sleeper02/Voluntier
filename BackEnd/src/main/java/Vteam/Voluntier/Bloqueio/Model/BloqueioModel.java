package Vteam.Voluntier.Bloqueio.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "bloqueios")
public class BloqueioModel {

    @Id
    private String id;

    private String idInstituicao;

    private String idPessoa;

    private Instant criadoEm = Instant.now();
}
