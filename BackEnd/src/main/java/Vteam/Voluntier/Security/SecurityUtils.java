package Vteam.Voluntier.Security;

import Vteam.Voluntier.Pessoa.Enums.PerfilAcesso;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {}

    /**
     * Retorna o ID do usuário autenticado extraído do token JWT.
     */
    public static String getAuthenticatedId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("Nenhum usuário autenticado no contexto");
        }
        return (String) auth.getPrincipal();
    }

    /**
     * Retorna o perfil (role) do usuário autenticado extraído do token JWT.
     */
    public static PerfilAcesso getAuthenticatedRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("Nenhum usuário autenticado no contexto");
        }
        return auth.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .filter(a -> a.startsWith("ROLE_"))
                .map(a -> a.substring(5))
                .map(PerfilAcesso::valueOf)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Perfil não encontrado no token"));
    }

    /**
     * Lança 403 se o ID autenticado não corresponder ao ID do path.
     */
    public static void validarOwnership(String idDoPath) {
        if (!getAuthenticatedId().equals(idDoPath)) {
            throw new AcessoNegadoException("Acesso não permitido");
        }
    }
}
