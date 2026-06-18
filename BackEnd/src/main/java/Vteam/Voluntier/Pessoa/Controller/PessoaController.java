package Vteam.Voluntier.Pessoa.Controller;

import Vteam.Voluntier.Pessoa.DTOS.CadastroDTO;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Pessoa.DTOS.ViewRecompensaPessoalDTO;
import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import Vteam.Voluntier.Pessoa.Service.PessoaService;
import Vteam.Voluntier.Security.LoginResponseDTO;
import Vteam.Voluntier.Security.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/Cadastro")
    public ResponseEntity<String> Cadastro(@Valid @RequestBody CadastroDTO cadastroDTO){
        boolean cadastro = pessoaService.cadastroCliente(cadastroDTO);

        if(cadastro){
            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email ou CPF já cadastrado!");
        }
    }

    @PostMapping("/Login")
    public ResponseEntity<?> Login(@Valid @RequestBody LoginDTO loginDTO){
        try {
            LoginResponseDTO response = pessoaService.validarLogin(loginDTO);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<PessoaModel>> ranking(){ //Mudar isso pra DTO mais pra frente
        return ResponseEntity.ok(pessoaService.getRanking()); //Adicionar tratamento de erro
    }

    @GetMapping("/recompensas/{id}")
    public ResponseEntity<ViewRecompensaPessoalDTO> recompensas(@PathVariable String id){
        SecurityUtils.validarOwnership(id);
        ViewRecompensaPessoalDTO response = pessoaService.recompensaPessoa(id);
        return ResponseEntity.ok(response);
    }
}
