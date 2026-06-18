package Vteam.Voluntier.Config;

import Vteam.Voluntier.Security.AuthEntryPoint;
import Vteam.Voluntier.Security.CustomAccessDeniedHandler;
import Vteam.Voluntier.Security.JwtAuthFilter;
import Vteam.Voluntier.Security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final AuthEntryPoint authEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;

    public SecurityConfig(JwtUtil jwtUtil,
                          AuthEntryPoint authEntryPoint,
                          CustomAccessDeniedHandler accessDeniedHandler) {
        this.jwtUtil = jwtUtil;
        this.authEntryPoint = authEntryPoint;
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler))
                .authorizeHttpRequests(auth -> auth
                        // Endpoints públicos
                        .requestMatchers(
                                "/user/Cadastro",
                                "/user/Login",
                                "/user/ranking",
                                "/evento/listar",
                                "/instituicao/Cadastro",
                                "/instituicao/Login",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/error"
                        ).permitAll()
                        // Endpoints exclusivos de instituição
                        .requestMatchers(
                                "/evento/criar",
                                "/evento/*/finalizar",
                                "/evento/recompensas/**",
                                "/avaliacao/eventos/**"
                        ).hasRole("INSTITUICAO")
                        // Endpoints exclusivos de voluntário
                        .requestMatchers(
                                "/inscrever/**",
                                "/avaliacao/**",
                                "/user/recompensas/**"
                        ).hasRole("VOLUNTARIO")
                        // Qualquer outra rota requer autenticação
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
