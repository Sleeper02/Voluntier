package Vteam.Voluntier.Inscricao.Controller;

import Vteam.Voluntier.Inscricao.Service.InscricaoService;
import Vteam.Voluntier.Security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/inscrever")
@RestController
public class InscricaoController {

    @Autowired
    private InscricaoService inscricaoService;

    @PostMapping("/{idPessoa}/{idEvento}")
    public ResponseEntity<String> inscrever(@PathVariable String idPessoa, @PathVariable String idEvento){
        SecurityUtils.validarOwnership(idPessoa);
        try {
            inscricaoService.inscrever(idPessoa, idEvento);
            return ResponseEntity.status(HttpStatus.CREATED).body("Inscrito com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{idPessoa}/{idEvento}")
    public ResponseEntity<String> cancelarInscricao(@PathVariable String idPessoa, @PathVariable String idEvento){
        SecurityUtils.validarOwnership(idPessoa);
        try {
            inscricaoService.cancelarInscricao(idPessoa, idEvento);
            return ResponseEntity.status(HttpStatus.OK).body("Inscrição cancelada com sucesso!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
