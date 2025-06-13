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

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Deshabilita CSRF para simplificar, considera habilitarlo en producción.
                .authorizeHttpRequests(auth -> auth
                        // Permite el acceso a los archivos estáticos (CSS, JS, HTML de login/registro) sin autenticación
                        .requestMatchers("/css/**", "/js/**", "/login.html", "/registrarPaciente.html", "/favicon.ico").permitAll()
                        // Restringe el acceso a las APIs según los roles
                        .requestMatchers("/api/pacientes/**").hasRole("SECRETARIA")
                        .requestMatchers("/api/turnos/paciente/**").hasRole("PACIENTE")
                        // CAMBIO: Se añadió el rol MEDICO para acceder a /api/turnos
                        .requestMatchers("/api/turnos/**").hasAnyRole("PACIENTE", "SECRETARIA", "MEDICO")
                        .requestMatchers("/api/atenciones/**").hasRole("MEDICO")
                        // Cualquier otra solicitud requiere autenticación
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        // En lugar de una URL fija, usamos un manejador de éxito para redirigir por rol.
                        .successHandler(customAuthenticationSuccessHandler())
                        .permitAll() // Permite el acceso a la página de login sin autenticación
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Define la URL para el cierre de sesión (POST por defecto)
                        .logoutSuccessUrl("/login.html?logout") // Redirige a la página de login después de un cierre exitoso
                        .invalidateHttpSession(true) // Invalida la sesión HTTP
                        .deleteCookies("JSESSIONID") // Elimina la cookie de sesión
                        .permitAll() // Permite el acceso a la URL de logout sin autenticación previa
                )
                .build();
    }

    /**
     * Define el manejador que decidirá a dónde redirigir al usuario
     * después de un inicio de sesión exitoso, basándose en su rol.
     */
    @Bean
    public AuthenticationSuccessHandler customAuthenticationSuccessHandler() {
        return (request, response, authentication) -> {
            // Obtenemos los roles del usuario autenticado
            String targetUrl = authentication.getAuthorities().stream()
                    .map(grantedAuthority -> {
                        String authority = grantedAuthority.getAuthority();
                        switch (authority) {
                            case "ROLE_PACIENTE":
                                return "/paciente.html";
                            case "ROLE_SECRETARIA":
                                return "/secretaria.html";
                            case "ROLE_MEDICO":
                                return "/medico.html";
                            default:
                                return "/login.html"; // O una página de error genérica
                        }
                    })
                    .findFirst() // Tomamos el primer rol que coincida
                    .orElseThrow(() -> new IllegalStateException("El usuario no tiene un rol válido."));

            response.sendRedirect(targetUrl);
        };
    }

    /**
     * Configura el servicio de detalles de usuario en memoria para demostración.
     * En una aplicación real, esto se conectaría a una base de datos.
     */
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(
                User.withUsername("paciente").password(encoder.encode("1234")).roles("PACIENTE").build(),
                User.withUsername("secretaria").password(encoder.encode("1234")).roles("SECRETARIA").build(),
                User.withUsername("medico").password(encoder.encode("1234")).roles("MEDICO").build()
        );
    }

    /**
     * Define el codificador de contraseñas utilizado por Spring Security.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
