<h1 align="center">Search Facul</h1>

<h1 align="center">
    <img src="img\logo.svg" width="300px;" alt="logo"/>
</h1>

## 🎓 Sobre o projeto

- **[🤖 API](https://github.com/Brendhon/SearchFacul_API)**
- **[📟 Aplicação Web](https://github.com/Brendhon/SearchFacul_Web)**
- **[📱 Aplicação Mobile](https://github.com/Brendhon/SearchFacul_App)**

O Search Facul é uma plataforma que tem como propósito facilitar a busca de informações sobre faculdades e cursos. O estudante pode em uma única plataforma: 
 - Buscar por informações de cursos em uma cidade;
 - Buscar por informações de um curso específico;
 - Buscar por cursos em uma faculdade específica.

Este repositório contêm a testes realizados com Cypress na interface web.

---

## 💻 Tecnologias

As seguintes tecnologias foram utilizadas na construção do projeto:

 - **[Cypress](https://www.cypress.io/)**
 - **[Mochawesome](https://expressjs.com/en/resources/middleware/cors.html)**
> Veja o arquivo  **[package.json](https://github.com/Brendhon/SearchFacul_Test-Cypress/blob/main/package.json)**

### Utilitários
- Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**

---

## 👨‍💻 Como executar o projeto

### 💡 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
**[Git](https://git-scm.com)** e **[Node.js](https://nodejs.org/en/)**.<br> 

```bash

# Clone este repositório
$ git clone https://github.com/Brendhon/SearchFacul_Test-Cypress.git

# Na raiz do projeto execute:

# Baixando as dependências
$ npm install

```

Com isso o projeto já estará pronto para ser executado.

### 🤖 Abrindo o Cypress

```bash

$ npm run open

```

### 📟 Gerando HTML

```bash

# Execute os testes - Lembre de apagar o arquivo 'mochawesome.json' se o mesmo existir
$ npm run test

# Será gerada uma pasta (reports) contendo arquivos .json

# Fará com que todos os arquivos .json dentro de reports se juntem em apenas um
$ npm run merge

# Gerando HTML
$ npm run html

```

---

## 👥 Autor
<img style="border-radius: 20%;" src="https://avatars1.githubusercontent.com/u/52840078?s=400&u=67bc81db89b5abf12cf592e0c610426afd3a02f4&v=4" width="120px;" alt="autor"/><br>
**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
[![Gmail Badge](https://img.shields.io/badge/-brendhon.e.c.m@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:brendhon.e.c.m@gmail.com)](mailto:brendhon.e.c.m@gmail.com)

---
## 📝 License
[![License](https://img.shields.io/apm/l/vim-mode?color=blue)](http://badges.mit-license.org)

- **[MIT license](https://choosealicense.com/licenses/mit/)**
