package Vteam.Voluntier.Pessoa.Controller;

import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Pessoa.Service.PessoaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class PessoaController {

    private final PessoaService pessoaService;

    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @GetMapping("/teste")
    public String testeAPI(){
        return "Tá funcionando a rota";
    }

    @PostMapping("/Login")
    public ResponseEntity<String> Login(@Valid @RequestBody LoginDTO loginDTO){
        boolean login = pessoaService.validarLogin(loginDTO);

        if(login){
            return ResponseEntity.ok("Login realizado com sucesso!");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha incorretos!");
        }

    }
}
