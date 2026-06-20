module.exports = {
  voluntier_api: {
    output: {
      mode: 'tags-split',
      target: 'src/api/endpoints',
      schemas: 'src/api/model',
      client: 'axios',
    },
    input: {
      // Esta é a URL padrão do Swagger JSON no Spring Boot rodando localmente
      target: 'http://localhost:8080/v3/api-docs',
    },
  },
};