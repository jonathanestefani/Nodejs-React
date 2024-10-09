# 🌱 Project App Test

Este é o manual de instalação e configuração do **Project App Test**. Siga os passos abaixo para configurar o ambiente e executar o projeto.

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 20.x ou superior)
- **npm** ou **yarn**
- **PostgreSQL**

Ou, para uma configuração mais simples:

- **Docker**
- **Docker Compose**

### 📦 Usando Docker

Para usar Docker, basta rodar:

```bash
docker-compose up
```

## Passos de Instalação

### 1. Instalar as dependências

Instale as dependências do projeto usando npm ou yarn:

```bash
npm install
```

### 2. Configuração do ambiente

Crie o arquivo `.env` a partir do modelo de exemplo `.env.example` na raiz do projeto, defina as informações de acesso a base de dados.

### 3. Configurar a estrutura da base de dados

```bash
npm run migration:run
```

### 4. Executar as seeds

```bash
npm run seed
```

### 4. Executar o projeto

```bash
npm run start
```

# Endpoints básicos

```http://localhost:3000/api/v1/locations/countries```
```http://localhost:3000/api/v1/locations/states```
```http://localhost:3000/api/v1/locations/regions```
```http://localhost:3000/api/v1/locations/cities```
```http://localhost:3000/api/v1/rural-producers```
```http://localhost:3000/api/v1/rural-producers-crops```