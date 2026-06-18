package Vteam.Voluntier.Instituicao.Controller;

import Vteam.Voluntier.Instituicao.DTOs.CadastroInstituicaoDTO;
import Vteam.Voluntier.Instituicao.Service.InstituicaoService;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Security.LoginResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instituicao")
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
