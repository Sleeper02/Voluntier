package Vteam.Voluntier.Instituicao.Controller;

import Vteam.Voluntier.Instituicao.DTOs.CadastroInstituicaoDTO;
import Vteam.Voluntier.Instituicao.Service.InstituicaoService;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Security.LoginResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instituicao")
@Tag(name = "Instituição", description = "Operações de cadastro e autenticação de instituições")
public class InstituicaoController {

    private final InstituicaoService service;

    public InstituicaoController(InstituicaoService service) {
        this.service = service;
    }

    @PostMapping("/Cadastro")
    public ResponseEntity<String> cadastro(@Valid @RequestBody CadastroInstituicaoDTO dto) {
        boolean cadastro = service.cadastrar(dto);
        if (cadastro) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Instituição cadastrada com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email ou CNPJ já cadastrado!");
        }
    }

    @Operation(summary = "Autenticar instituição", description = "Valida credenciais e retorna JWT com o perfil do usuário (role=INSTITUICAO)")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Autenticado com sucesso",
                content = @Content(schema = @Schema(implementation = LoginResponseDTO.class))),
        @ApiResponse(responseCode = "401", description = "Email ou senha incorretos", content = @Content)
    })
    @PostMapping("/Login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
        try {
            LoginResponseDTO response = service.login(dto);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
