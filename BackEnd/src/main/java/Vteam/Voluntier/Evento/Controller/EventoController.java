package Vteam.Voluntier.Evento.Controller;

import Vteam.Voluntier.Evento.DTOS.CadastroEventoDTO;
import Vteam.Voluntier.Evento.Service.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/evento")
@Controller
public class EventoController {
    private EventoService service;

    public EventoController(EventoService service) {
        this.service = service;
    }

    @GetMapping("/criar")
    public ResponseEntity<String> criarEvento(CadastroEventoDTO cadastroEvento){
        Boolean response = service.criarEvento(cadastroEvento);

        if(response){
            return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso!");
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar evento!");
        }

    }
}
