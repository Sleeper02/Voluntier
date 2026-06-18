package Vteam.Voluntier.Security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class CustomAccessDeniedHandler implements org.springframework.security.web.access.AccessDeniedHandler {

    private static final Logger auditLog = LoggerFactory.getLogger("AUDIT");

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        String userId = request.getUserPrincipal() != null ? request.getUserPrincipal().getName() : "anonimo";

        auditLog.warn("ACESSO_NEGADO | ip={} | uri={} | userId={} | motivo={}",
                request.getRemoteAddr(), request.getRequestURI(), userId, accessDeniedException.getMessage());

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        new ObjectMapper().writeValue(response.getOutputStream(),
                Map.of("erro", "Acesso não permitido"));
    }
}
