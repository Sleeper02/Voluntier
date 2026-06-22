# Voluntier

## Sobre o Projeto

O **Voluntier** é uma plataforma digital desenvolvida para conectar voluntários e instituições, facilitando a criação, divulgação e participação em ações de voluntariado.

A proposta da plataforma é centralizar oportunidades de impacto social em um único ambiente, permitindo que instituições organizem eventos e que voluntários encontrem causas alinhadas aos seus interesses, acompanhem sua participação e construam um histórico de contribuições.

Além disso, o sistema conta com recursos como:

* Cadastro de voluntários e instituições;
* Gerenciamento de eventos;
* Inscrição em ações voluntárias;
* Ranking de voluntários;
* Sistema de recompensas;
* Avaliações de eventos;
* Controle de acesso baseado em perfis de usuário.

---

## Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Java
* Spring Boot
* MongoDB
* Docker

---

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir as seguintes ferramentas instaladas:

### Para o Frontend

* Node.js
* npm

Verifique a instalação com:

```bash
node -v
npm -v
```

---

### Para o Backend

* Docker Desktop
* Java (JDK)

Verifique a instalação com:

```bash
java -version
docker --version
```

> É necessário que o Docker Desktop esteja em execução antes de iniciar o backend.

---

## Executando o Backend

Acesse a pasta do backend:

```bash
cd BackEnd
```

Execute o script:

```powershell
.\run.ps1
```

O script será responsável por iniciar os serviços necessários para a aplicação.

---

## Executando o Frontend

Acesse a pasta do frontend:

```bash
cd FrontEnd
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

Após a inicialização, o Vite exibirá uma URL semelhante a:

```text
http://localhost:5173
```

Abra o endereço no navegador para acessar a aplicação.

---
