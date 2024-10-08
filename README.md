# Seletivo Twygo

## Descrição do Projeto

A empresa fictícia **Threewygo** está buscando uma plataforma inovadora de cursos online. O desafio consiste em desenvolver uma aplicação que exiba cursos ativos com foco em responsividade e experiência otimizada de vídeo para usuários em dispositivos móveis. O objetivo principal é criar uma interface inicial que liste os cursos ativos, com formulários de cadastro, edição e exclusão, além de implementar uma forma de exibir o tamanho total ocupado pelos vídeos dos cursos.

Este README descreve os requisitos, funcionalidades, tecnologias utilizadas e instruções de como rodar o projeto.

---

## 📋 Requisitos Funcionais

| **Requisito** | **Descrição** |
| --- | --- |
| **R.1** | A tela inicial deve exibir uma lista de cursos atuais. |
| **R.2** | Os cursos devem ser exibidos em um layout responsivo, compatível com dispositivos móveis. |
| **R.3** | Cada curso deve exibir seu título e descrição. |
| **R.4** | Apenas cursos cuja data de término ainda não foi ultrapassada devem ser exibidos. |
| **R.5** | Implementar um formulário para cadastrar novos cursos. |
| **R.6** | Deve haver uma funcionalidade para editar e excluir cursos existentes. |
| **R.7** | Apresentar o tamanho total ocupado pelos vídeos em cada curso. |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, ChakraUI, Typescript
- **Backend**: Ruby on Rails, PostgreSQL
- **Ambiente de Desenvolvimento**: Docker
- **Testes**: Unitários com Jest (para o frontend) e RSpec (para o backend)

---

## 🖼️ Funcionalidades

1. **Listagem de Cursos**: Exibe todos os cursos ativos (aqueles cuja data de término ainda não foi ultrapassada) em uma interface responsiva.
2. **Visualização de Vídeos**: Cada curso pode ter um ou mais vídeos, e a aplicação garante uma experiência fluida de reprodução.
3. **Formulário de Cadastro**: Permite a adição de novos cursos com campos obrigatórios como título e descrição.
4. **Edição e Exclusão**: Cursos podem ser editados ou removidos diretamente da interface.
5. **Relatório de Tamanho de Vídeo**: Exibe o tamanho total ocupado pelos vídeos de um curso, seja em uma tela dedicada, query ou relatório.

---

## 📂 Estrutura de pastas

![alt text](image.png)

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Docker** instalado
- **Node.js** na versão 16.20.2 (para o frontend)
- **Ruby 3.3.4** e **PostgreSQL** (para o backend)

### Passos para rodar localmente

1. Clone o repositório:

    ```bash
    git clone https://github.com/NtidandaraBittencourt/threewygo.git
    cd threewygo
    ```

2. Configure o Docker:

    Certifique-se de que o Docker está instalado e funcionando no seu ambiente local. Para iniciar os containers, execute:

    ```bash
    docker-compose up --build
    ```

3. Instale as dependências:

    **Frontend**:

    ```bash
    cd frontend
    npm install
    ```

    **Backend**:

    ```bash
    cd backend
    bundle install
    ```

4. Inicie o servidor do backend:

    ```bash
    docker-compose up
    ```

5. Acesse a aplicação no navegador:

    ```bash
    http://localhost:3000
    ```
    ```Acessar as rotas do backend
    http://localhost:3001
    ```

---

## 📚 Testes

Os testes estão configurads pra rodar com a aplicação do docker pra garantir que está turo funcionando como esperado, mas podem ser rodados separadamente acessando cada pasta da aplicação.

**Rodar os testes**

```bash
docker-compose run test
```

**Para rodar os testes unitários:**

**Frontend**:

```bash
cd frontend
npm run test
```

**Backend**:

```bash
cd backend
bundle install
```

## 📈 Diferenciais

1. Uso de SPA (Single Page Application) com React.
2. Implementação em Typescript.
3. Estilização com ChakraUI para componentes responsivos.
4. Testes unitários completos com Jest e RSpec.
5. Utilização do Docker para facilitar o desenvolvimento e deploy.


## 📧 Contato
Para mais informações, entre em contato pelo email nti.dandara@outlook.com

GET /courses?page=1&limit=10
GET /courses/search?date_start=2024-01-01&date_end=2024-12-31

