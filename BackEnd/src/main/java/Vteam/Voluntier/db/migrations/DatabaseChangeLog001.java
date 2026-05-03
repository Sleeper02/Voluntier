package Vteam.Voluntier.db.migrations;

import Vteam.Voluntier.Pessoa.Model.PessoaModel;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

@ChangeUnit(id = "indices-unicos-pessoa", order = "001")
public class DatabaseChangeLog001 {

    // Método principal: O que deve ser executado no banco
    @Execution
    public void execucao(MongoTemplate mongoTemplate) {

        // Criando o índice único para o CPF
        mongoTemplate.indexOps(PessoaModel.class)
                .createIndex(new Index().on("CPF_pessoa", Sort.Direction.ASC).unique());

        // Criando o índice único para o Email
        mongoTemplate.indexOps(PessoaModel.class)
                .createIndex(new Index().on("email_pessoa", Sort.Direction.ASC).unique());
    }

    // Método de segurança: O que fazer se a migração falhar no meio do caminho
    @RollbackExecution
    public void rollback(MongoTemplate mongoTemplate) {
        // Desfaz (apaga) o índice do CPF caso dê algum erro na migração
        mongoTemplate.indexOps(PessoaModel.class).dropIndex("CPF_pessoa_1");

        // Desfaz (apaga) o índice do Email caso dê algum erro na migração
        mongoTemplate.indexOps(PessoaModel.class).dropIndex("email_pessoa_1");

        System.out.println("Rollback executado: Índices removidos por falha na migração.");
    }
}