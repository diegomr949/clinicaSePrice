package pp2.clinicaseprice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration // Marca esta clase como una fuente de definiciones de beans de Spring.
public class SecurityConfig {

    @Bean // Configura la cadena de filtros de seguridad HTTP para la aplicación.
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Deshabilita la protección CSRF (considerar habilitarla en producción).
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/css/**", "/js/**", "/login.html", "/registrarPaciente.html", "/favicon.ico").permitAll() // Permite acceso público a recursos estáticos y páginas de login/registro.
                        .requestMatchers("/api/pacientes/**").hasRole("SECRETARIA") // Restringe acceso a API de pacientes a SECRETARIA.
                        .requestMatchers("/api/turnos/paciente/**").hasRole("PACIENTE") // Restringe acceso a turnos por paciente a PACIENTE.
                        .requestMatchers("/api/turnos/**").hasAnyRole("PACIENTE", "SECRETARIA", "MEDICO") // Permite acceso a API de turnos a PACIENTE, SECRETARIA o MEDICO.
                        .requestMatchers("/api/atenciones/**").hasRole("MEDICO") // Restringe acceso a API de atenciones a MEDICO.
                        .anyRequest().authenticated() // Cualquier otra solicitud requiere autenticación.
                )
                .formLogin(form -> form
                        .successHandler(customAuthenticationSuccessHandler()) // Redirige por rol después del login exitoso.
                        .permitAll() // Permite acceso a la página de login.
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Define la URL para el cierre de sesión.
                        .logoutSuccessUrl("/login.html?logout") // Redirige a login.html después del cierre de sesión.
                        .invalidateHttpSession(true) // Invalida la sesión HTTP.
                        .deleteCookies("JSESSIONID") // Elimina la cookie de sesión.
                        .permitAll() // Permite acceso a la URL de logout.
                )
                .build(); // Construye la configuración de seguridad.
    }

    @Bean // Define un manejador de éxito de autenticación para redireccionar por rol.
    public AuthenticationSuccessHandler customAuthenticationSuccessHandler() {
        return (request, response, authentication) -> {
            String targetUrl = authentication.getAuthorities().stream() // Obtiene los roles del usuario autenticado.
                    .map(grantedAuthority -> {
                        String authority = grantedAuthority.getAuthority();
                        switch (authority) { // Mapea cada rol a su página de destino correspondiente.
                            case "ROLE_PACIENTE": return "/paciente.html";
                            case "ROLE_SECRETARIA": return "/secretaria.html";
                            case "ROLE_MEDICO": return "/medico.html";
                            default: return "/login.html"; // Redirección por defecto si el rol no se reconoce.
                        }
                    })
                    .findFirst() // Toma el primer rol y su URL de destino.
                    .orElseThrow(() -> new IllegalStateException("El usuario no tiene un rol válido.")); // Lanza excepción si no hay rol válido.

            response.sendRedirect(targetUrl); // Redirige la respuesta a la URL de destino.
        };
    }

    @Bean // Configura el servicio de detalles de usuario en memoria para demostración.
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager( // Crea usuarios de prueba en memoria.
                User.withUsername("paciente").password(encoder.encode("1234")).roles("PACIENTE").build(), // Usuario de prueba Paciente.
                User.withUsername("secretaria").password(encoder.encode("1234")).roles("SECRETARIA").build(), // Usuario de prueba Secretaría.
                User.withUsername("medico").password(encoder.encode("1234")).roles("MEDICO").build() // Usuario de prueba Médico.
        );
    }

    @Bean // Define el codificador de contraseñas (BCryptPasswordEncoder) para Spring Security.
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Devuelve una nueva instancia de BCryptPasswordEncoder.
    }
}
