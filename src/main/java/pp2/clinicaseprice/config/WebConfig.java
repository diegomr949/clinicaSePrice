package pp2.clinicaseprice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Marca esta clase como una fuente de definiciones de beans de Spring.
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) { // Configura los mapeos CORS para la aplicación.
        registry.addMapping("/**") // Permite CORS para todas las rutas.
                .allowedOrigins("http://localhost:3000") // Define los orígenes permitidos (cambiar en producción).
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Define los métodos HTTP permitidos.
                .allowedHeaders("*"); // Permite todos los encabezados.
    }
}