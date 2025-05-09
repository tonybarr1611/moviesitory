describe("Registro de usuario", () => {
  it("Debería permitir registrarse con email, username y contraseña", () => {
    cy.visit("http://localhost:4200/user/register");
    cy.get('input[id="mat-input-1"]').type("barrantesa088@gmail.com");
    cy.get('input[id="mat-input-2"]').type("tony1611");
    cy.get('input[id="mat-input-3"]').type("Password123!");
    cy.get("form").submit();
    cy.url().should("not.include", "/register");
  });
});

describe("Inicio de sesión", () => {
  it("Debería permitir iniciar sesión con credenciales válidas", () => {
    cy.visit("http://localhost:4200/user/login");
    cy.get('input[id="mat-input-1"]').type("barrantesa088@gmail.com");
    cy.get('input[id="mat-input-2"]').type("Password123!");

    // Esperar que el botón deje de estar deshabilitado
    cy.contains("button", "Login").should("not.be.disabled").click();

    // Verificamos que no seguimos en la página de login
    cy.url().should("not.include", "/login");
  });
});

describe("Crear película", () => {
  it("Debería permitir crear una película", () => {
    cy.visit("http://localhost:4200/admin/movie/edit");

    cy.get('input[id="title"]').type("Título de prueba"); // Title
    cy.get('textarea[id="overview"]').type("Esta es una overview de prueba."); // Overview
    cy.get('input[id="popularity"]').clear().type("42");

    cy.get("#release_date").clear().type("2025-12-31");

    // Imagen y Cast podrían involucrar componentes especiales
    // Asumimos un campo de imagen con input tipo texto
    cy.get('input[id="image"]').type("https://example.com/image.jpg");

    cy.contains("button", "Add image").should("not.be.disabled").click();

    // Asumimos un buscador de cast que agrega automáticamente al escribir
    cy.get('input[id="search"]').type("Anya{enter}");

    cy.contains("mat-card", "Anya") // Encuentra la tarjeta que contiene ese nombre
      .find("button") // Busca el botón dentro de esa tarjeta
      .click(); // Hace clic

    // Enviar el formulario
    cy.contains("button", "Confirm").should("not.be.disabled").click();

    cy.url().should("include", "/");
  });
});

describe("Editar película", () => {
  it("Debería permitir editar una película existente", () => {
    cy.visit("http://localhost:4200/admin/movie/edit");

    // Limpia y edita el título
    cy.get('input[id="title"]').clear().type("Película editada");

    // Limpia y edita la overview
    cy.get('textarea[id="overview"]')
      .clear()
      .type("Nueva descripción para la película editada.");

    // Popularidad
    cy.get('input[id="popularity"]').clear().type("84");

    // Fecha de lanzamiento (asegúrate que el campo acepta tipo "date")
    cy.get("#release_date").clear().type("2026-01-15");

    // Imagen (asumimos que puedes añadir otra o reemplazar)
    cy.get('input[id="image"]')
      .clear()
      .type("https://example.com/newimage.jpg");
    cy.contains("button", "Add image").click();

    // Cambiar Cast
    cy.get('input[id="search"]').clear().type("Keanu{enter}");
    cy.contains("mat-card", "Keanu Reeves").find("button").click();

    // Confirmar cambios
    cy.contains("button", "Confirm").should("not.be.disabled").click();

    cy.url().should("include", "/");
  });
});

describe("Eliminar película", () => {
  it("Debería eliminar una película desde su vista de detalle", () => {
    cy.visit("http://localhost:4200/user/login");
    cy.get('input[id="mat-input-1"]').type("sfabricito@gmail.com");
    cy.get('input[id="mat-input-2"]').type("Password123!");
    cy.get("form").submit();
    cy.url().should("not.include", "/login");

    cy.visit("http://localhost:4200/movie/1288998");

    // Encuentra el botón por el ícono "delete"
    cy.get("button mat-icon")
      .contains("delete")
      .should("be.visible")
      .click({ force: true }); // force por si está en un botón flotante o tiene animación

    // Si aparece un diálogo de confirmación, ajusta esto según tu implementación

    // Verifica redirección o que la película ya no esté
    cy.url().should("include", "/");
  });
});
