/// <reference types="cypress" />

import { BASE_URL_DB, University } from "../../support/constants";

describe("Caso de Teste: Realizar o login", () => {
  // Antes de todos os testes - Criar a universidade
  before(() => {
    cy.request({
      method: "POST",
      url: `${BASE_URL_DB}/university`,
      body: University.valid,
      failOnStatusCode: false,
    })
  });

  // Depois de todos os testes - delete a universidade
  after(() => {
    cy.request({
      method: "POST",
      url: `${BASE_URL_DB}/session`,
      body: {
        email: University.valid.email,
        password: University.valid.password,
      },
    }).then((resp) => {
      cy.request({
        method: "DELETE",
        url: `${BASE_URL_DB}/university`,
        headers: { "authorization": resp.body.token },
      }).then((resp) => {
        expect(resp.status).be.eq(204);
      });
    });
  });

  it("Cenário: Entrar no site", () => {
    cy.visit("http://localhost:3000/logon");
    cy.get(".logon-title").should("contain.text", "Faça seu Logon");
  });

  it("Cenário: Deve ser capaz de realizar o Login", () => {
    cy.visit("http://localhost:3000/logon");

    cy.get('[name="email"]').type(University.valid.email);
    cy.get('[name="password"]').type(University.valid.password);

    cy.server();
    cy.route("POST", "**/session").as("login");

    cy.get(".logon-form-content > .button").click(); // Simular o click da submissão

    cy.wait("@login").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("token");
    });
  });

  it("Cenário: NÂO deve ser capaz de realizar o Login com senha inválida", () => {
    cy.visit("http://localhost:3000/logon");

    cy.get('[name="email"]').type(University.valid.email);
    cy.get('[name="password"]').type(University.invalid.password);

    cy.server();
    cy.route("POST", "**/session").as("login");

    cy.get(".logon-form-content > .button").click(); // Simular o click da submissão 

    cy.wait("@login").then((xhr) => {
      expect(xhr.status).be.eq(400);
      expect(xhr.response.body.message).be.eq("Senha incorreta");
    });
  });

  it("Cenário: NÂO deve ser capaz de realizar o Login com conta inexistente", () => {
    cy.visit("http://localhost:3000/logon");

    cy.get('[name="email"]').type("teste@teste.br");
    cy.get('[name="password"]').type(University.invalid.password);

    cy.server();
    cy.route("POST", "**/session").as("login");

    cy.get(".logon-form-content > .button").click(); // Simular o click da submissão 

    cy.wait("@login").then((xhr) => {
      expect(xhr.status).be.eq(400);
      expect(xhr.response.body.message).be.eq("Email não cadastrado");
    });
  });

  it("Cenário: NÂO deve ser capaz de realizar o Login com email incorreto", () => {
    cy.visit("http://localhost:3000/logon");
    
    cy.get('[name="email"]').type(University.invalid.email);
    cy.get('[name="password"]').type(University.valid.password);
    
    cy.get(".logon-form-content > .button").click(); // Simular o click da submissão
    
    cy.get('.form-error').should("contain.text", "Deve ser um formato válido");
  });

});
