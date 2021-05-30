/// <reference types="cypress" />

import { BASE_URL_DB, University } from "../../support/constants";

describe("Caso de Teste: Criar universidade", () => {
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
    cy.visit("http://localhost:3000/register");
    cy.get("h1").should("contain.text", "Cadastre sua Universidade");
  });

  it("Cenário: Deve cadastrar", () => {
    cy.visit("http://localhost:3000/register");

    cy.get(".ies").type(University.valid.ies);
    cy.get(".email").type(University.valid.email);
    cy.get(".password").type(University.valid.password);
    cy.get(".confirmPassword").type(University.valid.password);
    cy.get(".city").type(University.valid.city);
    cy.get(".telephone").type(University.valid.telephone);
    cy.get(".address").type(University.valid.address);
    cy.get(".UF").type(University.valid.uf);
    cy.get(".site").type(University.valid.site);
    cy.get(".select-category").select(University.valid.category);

    cy.server();
    cy.route("POST", "**/university").as("createUniversity");

    cy.get(".university-form > .button").click(); // Simular o click da submissão

    cy.wait("@createUniversity").then((xhr) => {
      expect(xhr.status).be.eq(204);
    });
  });

  it("Cenário: NÂO deve cadastrar se o email for inválido", () => {
    cy.visit("http://localhost:3000/register");

    cy.get(".ies").type(University.valid.ies);
    cy.get(".email").type(University.invalid.email);
    cy.get(".password").type(University.valid.password);
    cy.get(".confirmPassword").type(University.valid.password);
    cy.get(".city").type(University.valid.city);
    cy.get(".telephone").type(University.valid.telephone);
    cy.get(".address").type(University.valid.address);
    cy.get(".UF").type(University.valid.uf);
    cy.get(".site").type(University.valid.site);
    cy.get(".select-category").select(University.valid.category);

    cy.get(".university-form > .button").click(); // Simular o click da submissão

    cy.get(".error-email").should("contain.text", "Deve ser um formato válido");
  });

  it("Cenário: NÂO deve cadastrar se o telefone for inválido", () => {
    cy.visit("http://localhost:3000/register");

    cy.get(".ies").type(University.valid.ies);
    cy.get(".email").type(University.valid.email);
    cy.get(".password").type(University.valid.password);
    cy.get(".confirmPassword").type(University.valid.password);
    cy.get(".city").type(University.valid.city);
    cy.get(".telephone").type(University.invalid.telephone);
    cy.get(".address").type(University.valid.address);
    cy.get(".UF").type(University.valid.uf);
    cy.get(".site").type(University.valid.site);
    cy.get(".select-category").select(University.valid.category);

    cy.get(".university-form > .button").click(); // Simular o click da submissão

    cy.get(".error-telephone").should(
      "contain.text",
      "Insira um número de telefone válido",
    );
  });

  it("Cenário: NÂO deve cadastrar se o UF for inválido", () => {
    cy.visit("http://localhost:3000/register");

    cy.get(".ies").type(University.valid.ies);
    cy.get(".email").type(University.valid.email);
    cy.get(".password").type(University.valid.password);
    cy.get(".confirmPassword").type(University.valid.password);
    cy.get(".city").type(University.valid.city);
    cy.get(".telephone").type(University.valid.telephone);
    cy.get(".address").type(University.valid.address);
    cy.get(".UF").type(University.invalid.uf);
    cy.get(".site").type(University.valid.site);
    cy.get(".select-category").select(University.valid.category);

    cy.get(".university-form > .button").click(); // Simular o click da submissão

    cy.get(".error-uf").should("contain.text", "Apenas letras maiúsculas");
  });

  it("Cenário: NÂO deve cadastrar se a categoria for inválido", () => {
    cy.visit("http://localhost:3000/register");

    cy.get(".ies").type(University.valid.ies);
    cy.get(".email").type(University.valid.email);
    cy.get(".password").type(University.valid.password);
    cy.get(".confirmPassword").type(University.valid.password);
    cy.get(".city").type(University.valid.city);
    cy.get(".telephone").type(University.valid.telephone);
    cy.get(".address").type(University.valid.address);
    cy.get(".UF").type(University.valid.uf);
    cy.get(".site").type(University.valid.site);
    cy.get(".select-category").select(University.invalid.category);

    cy.get(".university-form > .button").click(); // Simular o click da submissão

    cy.get(".error-category").should(
      "contain.text",
      "Uma categoria deve ser escolhida",
    );
  });

  it("Cenário: NÂO deve cadastrar se as senhas não baterem", () => {
    cy.visit("http://localhost:3000/register");

    cy.get(".ies").type(University.valid.ies);
    cy.get(".email").type(University.valid.email);
    cy.get(".password").type(University.valid.password);
    cy.get(".confirmPassword").type(University.invalid.password);
    cy.get(".city").type(University.valid.city);
    cy.get(".telephone").type(University.valid.telephone);
    cy.get(".address").type(University.valid.address);
    cy.get(".UF").type(University.valid.uf);
    cy.get(".site").type(University.valid.site);
    cy.get(".select-category").select(University.valid.category);

    cy.get(".university-form > .button").click(); // Simular o click da submissão

    cy.get(".error-confirmPassword").should(
      "contain.text",
      "As senhas não coincidem",
    );
  });
});
