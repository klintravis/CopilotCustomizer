---
name: spring-standards
description: Spring framework conventions covering application architecture, data access, API design, and configuration
version: "1.0"
technologies: [spring, java]
categories: [backend, frameworks]
scope: tech-match
priority: high
---

## Application Architecture

- Use Spring Boot for new applications with opinionated defaults and auto-configuration
- Organize code by feature domain (order, user, product) rather than by technical layer (controller, service, repository)
- Keep controllers thin — delegate all business logic to service classes
- Use constructor injection exclusively; avoid field injection with `@Autowired`
- Define clear boundaries between layers: controllers handle HTTP, services handle business rules, repositories handle data

## Data Access

- Use Spring Data JPA repositories for standard CRUD; define custom query methods with `@Query` for complex operations
- Avoid fetching more data than needed — use projections, DTOs, and `@EntityGraph` to control what is loaded
- Manage transactions at the service layer with `@Transactional`; keep transaction boundaries as narrow as possible
- Use Flyway or Liquibase for database migrations; never modify schemas manually
- Handle optimistic locking with `@Version` for concurrent access to shared entities

## API Design

- Use `@RestController` with clear request/response DTOs separate from JPA entities
- Apply Bean Validation annotations (`@NotNull`, `@Size`, `@Valid`) for declarative input validation
- Return appropriate HTTP status codes using `ResponseEntity` or exception handler mappings
- Use global exception handlers with `@ControllerAdvice` for consistent error response formatting
- Document APIs with SpringDoc OpenAPI annotations co-located with controller methods

## Configuration and Profiles

- Externalize all environment-specific configuration into `application.yml` or environment variables
- Use Spring profiles (`dev`, `test`, `prod`) for environment-specific behavior and configuration
- Prefer type-safe configuration properties (`@ConfigurationProperties`) over `@Value` injection
- Never hardcode secrets; use Spring Cloud Config, Vault, or environment variables for sensitive values

## Testing

- Use `@SpringBootTest` sparingly — prefer slice tests (`@WebMvcTest`, `@DataJpaTest`) for faster feedback
- Test services independently with mocked repositories using Mockito or test doubles
- Use `@Testcontainers` for integration tests that need real database or messaging infrastructure
- Write controller tests that verify request mapping, validation, and response serialization
- Keep test configuration isolated — use `@TestConfiguration` and test profiles to avoid polluting production beans
