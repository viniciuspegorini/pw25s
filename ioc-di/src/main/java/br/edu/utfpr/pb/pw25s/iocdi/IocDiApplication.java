package br.edu.utfpr.pb.pw25s.iocdi;

import br.edu.utfpr.pb.pw25s.iocdi.controller.CategoryController;
import br.edu.utfpr.pb.pw25s.iocdi.reflection.TestReflection;
import br.edu.utfpr.pb.pw25s.iocdi.repository.CategoryRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.lang.reflect.Field;
import java.util.Arrays;

@SpringBootApplication
public class IocDiApplication {

	public static void main(String[] args) {

		try {
			Field privateField =
				Class.forName("br.edu.utfpr.pb.pw25s.iocdi.reflection.TestReflection")
						.getDeclaredField("test");
			privateField.setAccessible(true);

			TestReflection test = new TestReflection("Test 1234");

			System.out.println( privateField.get(test) );

			privateField.set(test, "Test updated!");
			System.out.println( privateField.get(test) );

		} catch (NoSuchFieldException e) {
			throw new RuntimeException(e);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		}


		ConfigurableApplicationContext app =
				SpringApplication.run(IocDiApplication.class, args);

		Arrays.stream(app.getBeanDefinitionNames())
				.forEach(System.out::println);
	}

}
