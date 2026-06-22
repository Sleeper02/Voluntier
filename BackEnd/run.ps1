Write-Host "Iniciando Voluntier com MongoDB..." -ForegroundColor Cyan

& {
    $env:MONGO_ROOT_USERNAME = "admin"
    $env:MONGO_ROOT_PASSWORD = "admin"
    $env:MONGO_DATABASE = "voluntier"
    ./mvnw spring-boot:run
}
