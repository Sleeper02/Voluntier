package Vteam.Voluntier.Config;

import Vteam.Voluntier.Security.AcessoNegadoException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger auditLog = LoggerFactory.getLogger("AUDIT");

    @ExceptionHandler(AcessoNegadoException.class)
    public ResponseEntity<Map<String, String>> handleAcessoNegado(AcessoNegadoException ex,
                                                                   HttpServletRequest request) {
        auditLog.warn("OWNERSHIP_VIOLATION | ip={} | uri={} | motivo={}",
                request.getRemoteAddr(), request.getRequestURI(), ex.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("erro", ex.getMessage()));
    }
}
