package Vteam.Voluntier.Instituicao.Service;

import Vteam.Voluntier.Instituicao.DTOs.CadastroInstituicaoDTO;
import Vteam.Voluntier.Instituicao.Model.InstituicaoModel;
import Vteam.Voluntier.Instituicao.Repository.InstituicaoRepository;
import Vteam.Voluntier.Pessoa.DTOS.LoginDTO;
import Vteam.Voluntier.Pessoa.Enums.PerfilAcesso;
import Vteam.Voluntier.Security.JwtUtil;
import Vteam.Voluntier.Security.LoginResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class InstituicaoService {

    private final InstituicaoRepository repository;
    private final ModelMapper mapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public InstituicaoService(InstituicaoRepository repository, ModelMapper mapper,
                               BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.repository = repository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public boolean cadastrar(CadastroInstituicaoDTO dto) {
        if (repository.existsByEmail(dto.getEmail()) || repository.existsByCNPJ(dto.getCNPJ())) {
            return false;
        }

        InstituicaoModel instituicao = mapper.map(dto, InstituicaoModel.class);
        instituicao.setSenha(passwordEncoder.encode(instituicao.getSenha()));
        repository.save(instituicao);
        return true;
    }

    public LoginResponseDTO login(LoginDTO dto) {
        InstituicaoModel inst = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou senha incorretos"));

        if (!passwordEncoder.matches(dto.getSenha(), inst.getSenha())) {
            throw new IllegalArgumentException("Email ou senha incorretos");
        }

        PerfilAcesso role = inst.getRole() != null ? inst.getRole() : PerfilAcesso.INSTITUICAO;
        String token = jwtUtil.gerarToken(inst.getId(), role.name());
        return new LoginResponseDTO(token, inst.getId(), role);
    }

    public InstituicaoModel buscarPorId(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Instituição não encontrada"));
    }
}
