package Vteam.Voluntier.Avaliacao.Controller;

import Vteam.Voluntier.Avaliacao.DTOs.CriarAvaliacaoDTO;
import Vteam.Voluntier.Avaliacao.Service.AvaliacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService service;

    @PostMapping("/{idPessoa}/{idEvento}")
    public ResponseEntity<String> avaliar(@Valid @RequestBody CriarAvaliacaoDTO avaliacaoDTO,
                                     @PathVariable String idPessoa,
                                     @PathVariable String idEvento){

        try{
            service.avaliar(idPessoa,idEvento,avaliacaoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Evento avaliado com sucesso!");
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{idPessoa}/{idEvento}")
    public ResponseEntity<?> visualizarAvaliacao(@PathVariable String idPessoa,
                                                 @PathVariable String idEvento){
        try {
            return ResponseEntity.ok(service.visualizarAvaliacao(idPessoa, idEvento));

        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/eventos/{idInstituicao}/{idEvento}")
    public ResponseEntity<?> visualizarAvaliacoes(@PathVariable String idInstituicao,
                                                  @PathVariable String idEvento){
        try{
            return ResponseEntity.ok(service.visualizarAvaliacoes(idInstituicao, idEvento));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
