# Segurança e Autenticação — Voluntier Backend

Branch: `feat/vol90/verificacao-endpoints`

---

## Visão geral

Implementação de autenticação JWT e autorização por perfil, garantindo que endpoints restritos sejam acessíveis apenas pelos perfis autorizados. Requisições incompatíveis com as permissões do usuário são rejeitadas automaticamente.

### Dois perfis de acesso

| Perfil | Entidade | Descrição |
|--------|----------|-----------|
| `VOLUNTARIO` | `PessoaModel` | Voluntário que se inscreve e avalia eventos |
| `INSTITUICAO` | `InstituicaoModel` | Organização que cria e gerencia eventos |

---

## Arquivos novos

### `src/main/java/Vteam/Voluntier/Pessoa/Enums/PerfilAcesso.java`
Enum com os dois perfis: `VOLUNTARIO` e `INSTITUICAO`.

### `src/main/java/Vteam/Voluntier/Instituicao/`
Módulo completo da entidade Instituição, que antes não existia:

| Arquivo | Descrição |
|---------|-----------|
| `Model/InstituicaoModel.java` | Documento MongoDB (`col. instituicao`). Campos: `id`, `nome`, `CNPJ` (único), `email` (único), `senha` (BCrypt), `telefone`, `descricao`, `role = INSTITUICAO` |
| `Repository/InstituicaoRepository.java` | `existsByCNPJ`, `existsByEmail`, `findByEmail` |
| `DTOs/CadastroInstituicaoDTO.java` | DTO de cadastro com validações |
| `Service/InstituicaoService.java` | `cadastrar()` com hash de senha, `login()` retorna JWT, `buscarPorId()` |
| `Controller/InstituicaoController.java` | `POST /instituicao/Cadastro`, `POST /instituicao/Login` |

### `src/main/java/Vteam/Voluntier/Security/`
Infraestrutura de segurança JWT:

| Arquivo | Descrição |
|---------|-----------|
| `JwtUtil.java` | Gera e valida tokens JWT (HMAC-SHA256). Payload: `sub=id`, `role=PERFIL`, `exp=+8h` |
| `JwtAuthFilter.java` | `OncePerRequestFilter` — lê `Authorization: Bearer <token>`, valida e injeta autenticação no `SecurityContext` |
| `CustomUserDetailsService.java` | `UserDetailsService` — resolve usuário pelo email buscando em Pessoa e depois em Instituição |
| `AuthEntryPoint.java` | Handler de `401 Unauthorized` — retorna `{"erro": "Autenticação necessária"}` e loga no audit |
| `CustomAccessDeniedHandler.java` | Handler de `403 Forbidden` — retorna `{"erro": "Acesso não permitido"}` e loga no audit |
| `AcessoNegadoException.java` | Exceção de domínio para violações de ownership → `403` |
| `SecurityUtils.java` | `getAuthenticatedId()` extrai o ID do token do contexto; `validarOwnership(id)` lança `AcessoNegadoException` se diferente |
| `LoginResponseDTO.java` | Resposta do login: `{ token, id, role }` |

### `src/main/java/Vteam/Voluntier/Config/SecurityConfig.java`
Configuração do Spring Security:
- Sessão stateless (sem cookies)
- CSRF desabilitado
- `BCryptPasswordEncoder` como bean
- `JwtAuthFilter` registrado antes do `UsernamePasswordAuthenticationFilter`
- Regras de acesso por role (ver tabela abaixo)

### `src/main/java/Vteam/Voluntier/Config/GlobalExceptionHandler.java`
`@RestControllerAdvice` que captura `AcessoNegadoException` → `403` + log de audit `OWNERSHIP_VIOLATION`.

---

## Arquivos modificados

### `pom.xml`
Dependências adicionadas:
```xml
<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security-test</artifactId>
    <scope>test</scope>
</dependency>

<!-- JWT (JJWT 0.12.6) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.6</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
```

### `application.properties`
```properties
# Valores com fallback para rodar sem variáveis de ambiente (ex: IntelliJ)
spring.data.mongodb.uri=mongodb://${MONGO_ROOT_USERNAME:admin}:${MONGO_ROOT_PASSWORD:admin}@localhost:27017/?authSource=admin
spring.data.mongodb.database=${MONGO_DATABASE:admin}

jwt.secret=${JWT_SECRET:voluntier-dev-secret-key-minimo-32-caracteres}
jwt.expiration=28800000
```

### `Pessoa/Model/PessoaModel.java`
Campo adicionado:
```java
private PerfilAcesso role = PerfilAcesso.VOLUNTARIO;
```
Todo voluntário cadastrado recebe `role = VOLUNTARIO` automaticamente.

### `Pessoa/Service/PessoaService.java`
- `cadastroCliente()`: senha agora é hasheada com `BCryptPasswordEncoder` antes de salvar
- `validarLogin()`: usa `passwordEncoder.matches()` em vez de `.equals()` (plaintext removido), retorna `LoginResponseDTO` com o token JWT

### `Pessoa/Controller/PessoaController.java`
- `POST /user/Login`: retorna `LoginResponseDTO { token, id, role }` em vez de `String`
- `GET /user/recompensas/{id}`: adicionado `SecurityUtils.validarOwnership(id)`

### `Inscricao/Controller/InscricaoController.java`
- `POST /inscrever/{idPessoa}/{idEvento}`: adicionado `SecurityUtils.validarOwnership(idPessoa)`
- `DELETE /inscrever/{idPessoa}/{idEvento}`: adicionado `SecurityUtils.validarOwnership(idPessoa)`

### `Avaliacao/Controller/AvaliacaoController.java`
- `POST /avaliacao/{idPessoa}/{idEvento}`: adicionado `SecurityUtils.validarOwnership(idPessoa)`
- `GET /avaliacao/{idPessoa}/{idEvento}`: adicionado `SecurityUtils.validarOwnership(idPessoa)`
- `GET /avaliacao/eventos/{idInstituicao}/{idEvento}`: adicionado `SecurityUtils.validarOwnership(idInstituicao)`

### `Evento/Controller/EventoController.java`
- `POST /evento/criar`: adicionado `SecurityUtils.validarOwnership(cadastroEvento.getIdInstituicao())`
- `PATCH /evento/{id}/finalizar`: adicionado `service.validarDonoDoEvento(id, SecurityUtils.getAuthenticatedId())`
- `GET /evento/recompensas/{id}`: adicionado `SecurityUtils.validarOwnership(id)`

### `Evento/Service/EventoService.java`
- Método `validarDonoDoEvento(idEvento, idInstituicaoAutenticada)` adicionado: busca o evento e lança `AcessoNegadoException` se `idInstituicao` do evento não corresponder ao ID autenticado
- Bugs pré-existentes corrigidos: imports inválidos (`jdk.jfr.Event`, `javax.swing.text.View`), `HashSet` sem import

### `Evento/DTOS/ListagemEventoDTO.java`
- Campo `id` adicionado (era ausente)
- `dataCriacao` corrigido de `LocalDateTime` para `LocalDate`

---

## Mapa de permissões por endpoint

| Endpoint | Método | Perfil | Restrição adicional |
|----------|--------|--------|---------------------|
| `/user/Cadastro` | POST | Público | — |
| `/user/Login` | POST | Público | — |
| `/user/ranking` | GET | Público | — |
| `/evento/listar` | GET | Público | — |
| `/instituicao/Cadastro` | POST | Público | — |
| `/instituicao/Login` | POST | Público | — |
| `/user/recompensas/{id}` | GET | `VOLUNTARIO` | `id` == ID do token |
| `/inscrever/{idPessoa}/{idEvento}` | POST | `VOLUNTARIO` | `idPessoa` == ID do token |
| `/inscrever/{idPessoa}/{idEvento}` | DELETE | `VOLUNTARIO` | `idPessoa` == ID do token |
| `/avaliacao/{idPessoa}/{idEvento}` | POST | `VOLUNTARIO` | `idPessoa` == ID do token |
| `/avaliacao/{idPessoa}/{idEvento}` | GET | `VOLUNTARIO` | `idPessoa` == ID do token |
| `/evento/criar` | POST | `INSTITUICAO` | `body.idInstituicao` == ID do token |
| `/evento/{id}/finalizar` | PATCH | `INSTITUICAO` | `evento.idInstituicao` == ID do token |
| `/evento/recompensas/{id}` | GET | `INSTITUICAO` | `id` == ID do token |
| `/avaliacao/eventos/{idInst}/{idEvento}` | GET | `INSTITUICAO` | `idInst` == ID do token |

---

## Códigos de resposta de segurança

| Situação | HTTP | Body |
|----------|------|------|
| Token ausente em rota protegida | `401` | `{"erro": "Autenticação necessária"}` |
| Token inválido ou expirado | `401` | `{"erro": "Autenticação necessária"}` |
| Role incorreta para o endpoint | `403` | `{"erro": "Acesso não permitido"}` |
| ID do path diferente do ID do token | `403` | `{"erro": "Acesso não permitido"}` |

---

## Rastreabilidade (logs de audit)

Todos os eventos de segurança são logados com o logger `AUDIT` (nível `WARN`) no console:

| Evento | Log gerado |
|--------|-----------|
| Token inválido/malformado | `TOKEN_INVALIDO \| ip=... \| uri=...` |
| Acesso sem autenticação | `ACESSO_NAO_AUTENTICADO \| ip=... \| uri=... \| motivo=...` |
| Role insuficiente | `ACESSO_NEGADO \| ip=... \| uri=... \| userId=... \| motivo=...` |
| Ownership violado | `OWNERSHIP_VIOLATION \| ip=... \| uri=... \| motivo=...` |

---

## Guia de testes no Postman

### Pré-requisitos
1. Docker rodando com MongoDB: `docker-compose up -d`
2. Aplicação rodando (IntelliJ ou `.\mvnw.cmd spring-boot:run`)
3. Base URL: `http://localhost:8080`

---

### 1. Cadastrar voluntário
```
POST /user/Cadastro
Content-Type: application/json

{
  "nome": "João Silva",
  "dataNascimento": "2000-05-10",
  "telefone": "11987654321",
  "CPF": "529.982.247-25",
  "email": "joao@email.com",
  "senha": "senha123"
}
```
**Esperado:** `201 Created` — `"Cadastro realizado com sucesso!"`

---

### 2. Login de voluntário (obter token)
```
POST /user/Login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "senha123"
}
```
**Esperado:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "id": "6a347a6f1cedd46a28f2c772",
  "role": "VOLUNTARIO"
}
```
> Salve o `token` e o `id` para as próximas requisições.

---

### 3. Acessar endpoint protegido com token válido
```
GET /user/recompensas/{id}
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```
Substitua `{id}` pelo `id` retornado no login.

**Esperado:** `200 OK`
```json
{
  "tierConta": "NENHUM",
  "pontosProxT": 10,
  "recompensas": []
}
```

---

### 4. Testar sem token → 401
```
GET /user/recompensas/{id}
(sem header Authorization)
```
**Esperado:** `401 Unauthorized`
```json
{ "erro": "Autenticação necessária" }
```

---

### 5. Testar ownership errado → 403
```
GET /user/recompensas/qualquer-id-diferente
Authorization: Bearer <token válido>
```
**Esperado:** `403 Forbidden`
```json
{ "erro": "Acesso não permitido" }
```

---

### 6. Testar role errada (voluntário em rota de instituição) → 403
```
POST /evento/criar
Authorization: Bearer <token de VOLUNTARIO>
Content-Type: application/json

{
  "titulo": "Teste",
  "idInstituicao": "qualquer"
}
```
**Esperado:** `403 Forbidden`
```json
{ "erro": "Acesso não permitido" }
```

---

### 7. Cadastrar instituição
```
POST /instituicao/Cadastro
Content-Type: application/json

{
  "nome": "ONG Esperança",
  "CNPJ": "12.345.678/0001-99",
  "email": "ong@email.com",
  "senha": "senha123",
  "telefone": "11912345678",
  "descricao": "ONG de apoio social"
}
```
**Esperado:** `201 Created` — `"Instituição cadastrada com sucesso!"`

---

### 8. Login de instituição
```
POST /instituicao/Login
Content-Type: application/json

{
  "email": "ong@email.com",
  "senha": "senha123"
}
```
**Esperado:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "id": "abc123...",
  "role": "INSTITUICAO"
}
```

---

### 9. Criar evento com token de instituição
```
POST /evento/criar
Authorization: Bearer <token de INSTITUICAO>
Content-Type: application/json

{
  "titulo": "Mutirão Verde",
  "dataHora": "2026-07-15T09:00:00",
  "idInstituicao": "{id retornado no login da instituição}",
  "lotacao": 50,
  "descricao": "Plantio de árvores",
  "solicitacao": "APROVADO",
  "areaAtuacao": "MEIO_AMBIENTE"
}
```
**Esperado:** `201 Created` — `"Evento criado com sucesso!"`

---

### 10. Testar instituição criando evento com idInstituicao de outra → 403
Use o token da sua instituição mas coloque o ID de outra no body:
```
POST /evento/criar
Authorization: Bearer <token da sua instituição>

{
  "idInstituicao": "id-de-outra-instituicao",
  ...
}
```
**Esperado:** `403 Forbidden`
```json
{ "erro": "Acesso não permitido" }
```

---

### Dica: automatizar com variáveis no Postman

Na aba **Tests** do endpoint de Login, adicione:
```javascript
pm.collectionVariables.set("token", pm.response.json().token);
pm.collectionVariables.set("userId", pm.response.json().id);
```

Nas demais requisições, use:
- **Authorization → Bearer Token:** `{{token}}`
- **URL:** `{{baseUrl}}/user/recompensas/{{userId}}`

---

## vol89 — Identificação de perfil na autenticação

Branch: `feat/vol89/adaptar-autenticacao`

### Objetivo

Garantir que o processo de autenticação identifique o tipo do usuário autenticado e exponha essa informação tanto na resposta da API quanto nas demais camadas do sistema.

---

### Contrato do endpoint de autenticação

Ambos os endpoints de login retornam o mesmo contrato:

**`POST /user/Login`** e **`POST /instituicao/Login`**

**Response `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "id": "64a3f2c1b8e4d700123abc",
  "role": "VOLUNTARIO"
}
```

| Campo | Tipo | Valores possíveis |
|-------|------|-------------------|
| `token` | `String` | JWT assinado (HMAC-SHA256), expira em 8h |
| `id` | `String` | ID MongoDB do usuário autenticado |
| `role` | `String (enum)` | `VOLUNTARIO` ou `INSTITUICAO` |

O campo `role` também está embarcado no payload do JWT (`claim "role"`), de forma que as rotas protegidas não precisam consultar o banco para identificar o perfil.

---

### Acesso ao perfil nas camadas internas

`SecurityUtils.getAuthenticatedRole()` retorna o `PerfilAcesso` do usuário autenticado direto do `SecurityContext`, sem round-trip ao banco:

```java
PerfilAcesso perfil = SecurityUtils.getAuthenticatedRole();
// retorna PerfilAcesso.VOLUNTARIO ou PerfilAcesso.INSTITUICAO
```

Útil em serviços que precisam adaptar comportamento conforme o tipo de usuário.

---

### Compatibilidade com usuários existentes

Documentos MongoDB sem o campo `role` (cadastrados antes da implementação da segurança) são tratados com fallback seguro nos serviços de login:

- `PessoaService.validarLogin()`: se `role == null` → assume `VOLUNTARIO`
- `InstituicaoService.login()`: se `role == null` → assume `INSTITUICAO`

Isso evita `NullPointerException` e garante que usuários legados continuem funcionando sem necessidade de migração.

---

### Arquivos modificados

| Arquivo | Alteração |
|---------|-----------|
| `Security/LoginResponseDTO.java` | Adicionadas anotações `@Schema` (Swagger) em todos os campos |
| `Security/SecurityUtils.java` | Método `getAuthenticatedRole()` adicionado |
| `Pessoa/Service/PessoaService.java` | Fallback null-safe para `role` no `validarLogin()` |
| `Pessoa/Controller/PessoaController.java` | `@Tag`, `@Operation`, `@ApiResponses` no endpoint de login |
| `Instituicao/Service/InstituicaoService.java` | Fallback null-safe para `role` no `login()` |
| `Instituicao/Controller/InstituicaoController.java` | `@Tag`, `@Operation`, `@ApiResponses` no endpoint de login |
