package juegosenred.practica4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class App implements WebSocketConfigurer {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
	public void registerWebSocketHandler(WebSocketHandlerRegistry registry) {
		registry.addHandler(gameHandler(), "/race51").setAllowedOrigins("*");
	}
	
	@Bean
	public Handler gameHandler() {
		return new Handler();
	}
}