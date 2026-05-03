package Vteam.Voluntier;

import io.mongock.runner.springboot.EnableMongock;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableMongock
@SpringBootApplication
public class VoluntierApplication {

	public static void main(String[] args) {
		SpringApplication.run(VoluntierApplication.class, args);
		System.out.println("TESTE ENV: " + System.getenv("MONGO_DB"));
	}

}
