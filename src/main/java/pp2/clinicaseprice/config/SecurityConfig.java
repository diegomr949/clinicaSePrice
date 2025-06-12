package pp2.clinicaseprice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/pacientes/**").permitAll() // Dejar público el registro de pacientes
                        .anyRequest().authenticated()
                )
                .httpBasic()  // Por ahora → autenticación básica
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(
                User.withUsername("paciente")
                        .password(encoder.encode("1234"))
                        .roles("PACIENTE")
                        .build(),
                User.withUsername("secretaria")
                        .password(encoder.encode("1234"))
                        .roles("SECRETARIA")
                        .build(),
                User.withUsername("medico")
                        .password(encoder.encode("1234"))
                        .roles("MEDICO")
                        .build()
        );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/pacientes/**").hasAnyRole("SECRETARIA") // Solo Secretaría puede registrar pacientes
                        .requestMatchers("/api/turnos/paciente/**").hasAnyRole("PACIENTE") // Solo PACIENTE puede ver sus turnos
                        .requestMatchers("/api/turnos/**").hasAnyRole("PACIENTE", "SECRETARIA") // Solicitar turnos
                        .requestMatchers("/api/atenciones/**").hasRole("MEDICO") // Solo MÉDICO puede registrar atenciones
                        .anyRequest().authenticated()
                )
                .httpBasic()
                .build();
    }

}
