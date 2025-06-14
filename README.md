Sistema de Gestión de Turnos - Clínica SePrice

Descripción del Proyecto

El Sistema de Gestión de Turnos - Clínica SePrice es una aplicación diseñada para optimizar la administración de turnos médicos y la gestión de la información clínica en los Consultorios Externos de la Clínica SePrice. Su objetivo principal es reducir los tiempos de espera, disminuir errores administrativos y mejorar la experiencia tanto para pacientes como para el personal médico y administrativo.

La aplicación está desarrollada con Spring Boot para el backend (APIs REST) y HTML, CSS, JavaScript Vanilla para el frontend, proporcionando una interfaz web intuitiva y responsiva.

Módulos Principales (Versión 1.0)
Registro de Pacientes: Permite al personal administrativo registrar nuevos pacientes con su nombre, DNI y email.

Gestión de Turnos: Facilita a la secretaría la asignación y cancelación de turnos, y la visualización de turnos pendientes. Los pacientes pueden solicitar y cancelar sus propios turnos.

Consulta de Agenda Médica: Los médicos pueden visualizar sus agendas, filtrando los turnos activos.

Registro de Atención Médica: Los médicos pueden registrar diagnósticos para los turnos atendidos.

Estructura del Proyecto
El proyecto está dividido en dos componentes principales:

Backend (Spring Boot - Java):

Gestiona la lógica de negocio, la interacción con la base de datos y expone las APIs REST.

Utiliza Spring Data JPA para la persistencia de datos y Spring Security para la autenticación y autorización basada en roles.

Paquetes clave:

config: Configuración de Spring Security y CORS.

controller: Endpoints REST para Atencion, Paciente y Turno.

dto: Objetos de transferencia de datos (AtencionDTO, TurnoDTO).

exception: Clases de excepciones personalizadas (RecursoNoEncontradoException) y manejo global de excepciones.

model: Entidades JPA (Atencion, Paciente, Turno).

repository: Interfaces de Spring Data JPA para el acceso a datos.

service: Lógica de negocio y servicios (AtencionService, PacienteService, TurnoService y sus implementaciones).

ClinicaSePriceApplication.java: Clase principal para iniciar la aplicación Spring Boot.

Frontend (HTML, CSS, JavaScript Vanilla):

Proporciona la interfaz de usuario para interactuar con el backend.

Consta de varias páginas HTML para diferentes roles y funcionalidades.

Archivos clave:

index.html: Página de inicio (redirige a login.html).

login.html: Interfaz de inicio de sesión.

registrarPaciente.html: Formulario para el registro público de pacientes.

paciente.html: Panel para usuarios con rol PACIENTE.

secretaria.html: Panel para usuarios con rol SECRETARIA.

medico.html: Panel para usuarios con rol MEDICO.

css/styles.css: Estilos CSS globales para la aplicación.

js/main.js: Lógica JavaScript para la página de login.

js/roles.js: Funciones comunes para gestionar la visibilidad de elementos por rol y el cierre de sesión.

js/paciente.js: Lógica JavaScript para el panel del paciente.

js/secretaria.js: Lógica JavaScript para el panel de secretaría.

js/medico.js: Lógica JavaScript para el panel del médico.

js/registroPaciente.js: Lógica JavaScript para el formulario de registro de paciente público.

Instrucciones de Implementación y Ejecución
Requisitos Previos
Asegúrate de tener instalado lo siguiente:

Java Development Kit (JDK) 17 o superior

Maven 3.x

MySQL 8.x (u otro sistema de base de datos compatible con JPA)

Un IDE como IntelliJ IDEA o Spring Tool Suite (STS) (recomendado)

1. Configuración de la Base de Datos (MySQL)
Crear la Base de Datos:
Abre tu cliente MySQL (ej. MySQL Workbench, línea de comandos) y ejecuta el siguiente comando para crear la base de datos:

CREATE DATABASE IF NOT EXISTS clinica_db;
USE clinica_db;

Configurar application.properties:
En el backend (proyecto Spring Boot), navega a src/main/resources/application.properties y configura las credenciales de tu base de datos:

spring.datasource.url=jdbc:mysql://localhost:3306/clinica_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=tu_usuario_mysql
spring.datasource.password=tu_contraseña_mysql
spring.jpa.hibernate.ddl-auto=update # Esto creará/actualizará las tablas automáticamente
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

Nota: ddl-auto=update es útil para desarrollo, pero considera none o validate para producción y gestiona los esquemas de forma manual con migraciones.

Poblar Datos Iniciales (Opcional pero Recomendado):
Para evitar el Error Code: 1452 (Foreign Key Constraint Fail), es esencial tener pacientes en la base de datos antes de insertar turnos. Puedes usar las sentencias INSERT proporcionadas previamente en el chat para pacientes y turnos.

2. Ejecución del Backend (Spring Boot)
Clonar el Repositorio (si aún no lo has hecho):

git clone <URL_del_repositorio>
cd ClinicaSePrice

Compilar el Proyecto Maven:

mvn clean install

Ejecutar la Aplicación Spring Boot:
Puedes ejecutar la aplicación desde tu IDE (buscando ClinicaSePriceApplication.java y ejecutándolo como aplicación Spring Boot) o desde la línea de comandos:

mvn spring-boot:run

El backend se iniciará en http://localhost:8080 por defecto.

3. Ejecución del Frontend (HTML, CSS, JavaScript)
El frontend es estático y no requiere un servidor web adicional para funcionar en desarrollo, ya que Spring Boot sirve los archivos estáticos desde src/main/resources/static.

Asegúrate de que el backend esté en ejecución.

Abre tu navegador web y navega a:
http://localhost:8080/login.html (o http://localhost:8080/index.html que redirigirá al login).

Roles y Credenciales de Prueba
La aplicación incluye usuarios en memoria para fines de demostración, configurados en SecurityConfig.java:

Usuario

Contraseña

Rol

Página de Redirección

paciente

1234

ROLE_PACIENTE

paciente.html

secretaria

1234

ROLE_SECRETARIA

secretaria.html

medico

1234

ROLE_MEDICO

medico.html

Endpoints de la API (Backend)
Todos los endpoints están prefijados con /api.

Pacientes:

GET /api/pacientes: Lista todos los pacientes (requiere SECRETARIA).

POST /api/pacientes: Registra un nuevo paciente (requiere SECRETARIA).

DELETE /api/pacientes/{id}: Elimina un paciente por ID (requiere SECRETARIA).

Turnos:

GET /api/turnos: Lista todos los turnos (requiere PACIENTE, SECRETARIA, MEDICO).

POST /api/turnos: Asigna un nuevo turno (requiere PACIENTE, SECRETARIA).

PUT /api/turnos/{id}/cancelar: Cancela un turno por ID (requiere PACIENTE, SECRETARIA).

GET /api/turnos/paciente/{id}: Lista turnos de un paciente específico (requiere PACIENTE).

Atenciones:

GET /api/atenciones: Lista todas las atenciones (requiere MEDICO).

POST /api/atenciones: Registra una nueva atención (requiere MEDICO).

Consideraciones Adicionales
CORS: La configuración de CORS (@CrossOrigin(origins = "*")) está establecida para permitir todas las solicitudes de cualquier origen en desarrollo. En un entorno de producción, esto debería restringirse a los dominios específicos de tu frontend.

Seguridad (CSRF): La protección CSRF está deshabilitada en SecurityConfig.java para simplificar el desarrollo. Para una aplicación en producción, se recomienda encarecidamente habilitarla e implementar el manejo de tokens CSRF en el frontend.

Mensajes de Error: La interfaz de usuario muestra mensajes de éxito o error al usuario para cada operación.

IDs de Paciente en Frontend: Actualmente, el frontend (paciente.js, secretaria.js) utiliza IDs de paciente ficticios (ej. pacienteId = 1) para simular la asignación/consulta de turnos. En una aplicación real, este pacienteId debería ser dinámico y obtenido del usuario autenticado (ej. a través de un endpoint del backend que devuelva los detalles del usuario logueado).
