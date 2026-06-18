package Vteam.Voluntier.Security;

import Vteam.Voluntier.Instituicao.Repository.InstituicaoRepository;
import Vteam.Voluntier.Pessoa.Repository.PessoaRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PessoaRepository pessoaRepository;
    private final InstituicaoRepository instituicaoRepository;

    public CustomUserDetailsService(PessoaRepository pessoaRepository,
                                    InstituicaoRepository instituicaoRepository) {
        this.pessoaRepository = pessoaRepository;
        this.instituicaoRepository = instituicaoRepository;
    }

    // Usado pelo Spring Security para autenticação via formulário/basic — não é o fluxo principal.
    // O fluxo principal usa JwtAuthFilter diretamente.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var pessoa = pessoaRepository.findByEmail(email);
        if (pessoa.isPresent()) {
            var p = pessoa.get();
            return new User(p.getID(), p.getSenha(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + p.getRole().name())));
        }

        var instituicao = instituicaoRepository.findByEmail(email);
        if (instituicao.isPresent()) {
            var i = instituicao.get();
            return new User(i.getId(), i.getSenha(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + i.getRole().name())));
        }

        throw new UsernameNotFoundException("Usuário não encontrado: " + email);
    }
}
