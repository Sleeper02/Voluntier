package Vteam.Voluntier.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger auditLog = LoggerFactory.getLogger("AUDIT");

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.tokenValido(token)) {
                String id = jwtUtil.extrairId(token);
                String role = jwtUtil.extrairRole(token);

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        id, null,
                        List.of(new SimpleGrantedAuthority("ROLE_" + role))
                );

                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(auth);
                SecurityContextHolder.setContext(context);
            } else {
                auditLog.warn("TOKEN_INVALIDO | ip={} | uri={}",
                        request.getRemoteAddr(), request.getRequestURI());
            }
        }

        filterChain.doFilter(request, response);
    }
}
