package Vteam.Voluntier.Evento.Controller;

import Vteam.Voluntier.Evento.DTOS.CadastroEventoDTO;
import Vteam.Voluntier.Evento.DTOS.DetalhesEventoDTO;
import Vteam.Voluntier.Evento.EnumsEvento.AreaAtuacao;
import Vteam.Voluntier.Evento.Service.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.List;

@RequestMapping("/evento")
@Controller
public class EventoController {
    private EventoService service;

    public EventoController(EventoService service) {
        this.service = service;
    }

    @PostMapping("/criar")
    public ResponseEntity<String> criarEvento(@RequestBody CadastroEventoDTO cadastroEvento){
        Boolean response = service.criarEvento(cadastroEvento);

        if(response){
            return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso!");
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar evento!");
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorTag(@RequestParam String tag) {
        try {
            List<DetalhesEventoDTO> eventos = service.buscarPorTag(tag);
            if (eventos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Nenhum evento encontrado para a tag: " + tag);
            }
            return ResponseEntity.ok(eventos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Tag inválida: \"" + tag + "\". Tags disponíveis: " + Arrays.toString(AreaAtuacao.values()));
        }
    }
}
