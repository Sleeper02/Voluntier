#!/bin/bash
# Script para rodar Voluntier com variáveis de ambiente do .env
# Compatível com bash/MinGW

echo "✓ Iniciando Voluntier com MongoDB..."
echo ""

export MONGO_ROOT_USERNAME=admin
export MONGO_ROOT_PASSWORD=password
export MONGO_DATABASE=voluntier

./mvnw spring-boot:run
