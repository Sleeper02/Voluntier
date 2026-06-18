package Vteam.Voluntier.Evento.Controller;

import Vteam.Voluntier.Evento.DTOS.CadastroEventoDTO;
import Vteam.Voluntier.Evento.DTOS.ListagemEventoDTO;
import Vteam.Voluntier.Evento.DTOS.ViewRecompensaDTO;
import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.Service.EventoService;
import Vteam.Voluntier.Security.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RequestMapping("/evento")
@RestController
public class EventoController {
    private EventoService service;

    public EventoController(EventoService service) {
        this.service = service;
    }

    @PostMapping("/criar")
    public ResponseEntity<String> criarEvento(@RequestBody CadastroEventoDTO cadastroEvento){
        // Garante que a instituição só cria eventos em nome próprio
        SecurityUtils.validarOwnership(cadastroEvento.getIdInstituicao());
        Boolean response = service.criarEvento(cadastroEvento);

        if(response){
            return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso!");
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar evento!");
        }
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<String> finalizarEvento(@PathVariable String id){
        service.validarDonoDoEvento(id, SecurityUtils.getAuthenticatedId());
        boolean response = service.finalizarEvento(id);

        if(response) {
            return ResponseEntity.status(HttpStatus.OK).body("Evento Finalizado com sucesso!");
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao finalizar evento!");
        }
    }

    @GetMapping("/recompensas/{id}")
    public ResponseEntity<List<ViewRecompensaDTO>> recompensasEvento(@PathVariable String id){
        SecurityUtils.validarOwnership(id);
        List<ViewRecompensaDTO> list = service.recompensasEvento(id);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/listar") //evento/listar?ordenar=realizacao&tag=MEIO_AMBIENTE
    public ResponseEntity<?> listarEvento(
            @RequestParam(defaultValue = "criacao") String ordenar,
            @RequestParam(required = false) String tag) {
        try {
            AreaAtuacao areaAtuacao = null;
            if (tag != null && !tag.isBlank()) {
                try {
                    areaAtuacao = AreaAtuacao.valueOf(tag.toUpperCase());
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Tag inválida: '" + tag + "'. Tags disponíveis: " + Arrays.toString(AreaAtuacao.values()));
                }
            }
            List<ListagemEventoDTO> eventos = service.listarEventos(ordenar, areaAtuacao);
            return ResponseEntity.ok(eventos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao listar eventos: " + e.getMessage());
        }
    }
}
