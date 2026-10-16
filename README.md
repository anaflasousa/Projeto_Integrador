# Quiz de Sintaxe

Aplicação web educativa desenvolvida para tornar o estudo da sintaxe da língua portuguesa mais interativo por meio de minijogos.

## 📌 Sobre o projeto

O Quiz de Sintaxe tem como objetivo auxiliar no aprendizado de conteúdos de análise sintática por meio de desafios interativos.

A página inicial apresenta o projeto e permite acessar os jogos disponíveis.

### 🎮 Minijogos

- **Quiz tradicional:** escolha a alternativa correta.
- **Ligue as colunas:** associe os termos às suas classificações sintáticas.
- **Verdadeiro ou falso:** avalie afirmações sobre sintaxe.
- **Encontre o erro:** identifique uma análise sintática incorreta.

## 🛠️ Tecnologias utilizadas

- Angular
- TypeScript
- HTML
- SCSS
- Node.js
- npm

## 💻 Requisitos para executar o projeto

Antes de começar, instale:

- [Node.js](https://nodejs.org/) — ambiente de execução do JavaScript.
- npm — gerenciador de pacotes instalado junto com o Node.js.
- [Git](https://git-scm.com/) — para clonar e versionar o projeto.
- [Visual Studio Code](https://code.visualstudio.com/) — editor de código recomendado.

Para verificar se o Node.js e o npm estão instalados, execute no terminal:

```powershell
node -v
npm -v
```

## 🚀 Como baixar e executar

### 1. Clonar o repositório

```powershell
git clone https://github.com/anaflasousa/Projeto_Integrador.git
```

### 2. Entrar na pasta do projeto

```powershell
cd Projeto_Integrador
```

Se o repositório contiver apenas o código do frontend em uma subpasta, entre nela antes de continuar:

```powershell
cd frontend
```

### 3. Instalar as dependências

Execute o comando na pasta que contém o arquivo `package.json`:

```powershell
npm install
```

### 4. Iniciar o servidor de desenvolvimento

```powershell
npx ng serve
```

Após a inicialização, acesse no navegador o endereço indicado no terminal. Normalmente, é:

http://localhost:4200/

O servidor atualiza a aplicação durante o desenvolvimento quando os arquivos são alterados.

### 5. Gerar a versão de produção

Para verificar se o projeto compila corretamente:

```powershell
npx ng build
```

Os arquivos gerados ficam normalmente no diretório `dist/`.

## 📁 Estrutura principal do projeto

A estrutura abaixo descreve as pastas principais do frontend Angular.

```text
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── inicio/
│   │   │   ├── selecao-jogos/
│   │   │   └── desafios/
│   │   │       ├── quiz/
│   │   │       ├── ligar-colunas/
│   │   │       ├── verdadeiro-falso/
│   │   │       └── encontre-erro/
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.scss
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── package-lock.json
└── tsconfig.json
```

### O que cada pasta e arquivo faz?

| Caminho | Finalidade |
|---|---|
| `src/app/pages/inicio/` | Página inicial do projeto. |
| `src/app/pages/selecao-jogos/` | Tela de seleção dos minijogos. |
| `src/app/pages/desafios/quiz/` | Tela do quiz tradicional. |
| `src/app/pages/desafios/ligar-colunas/` | Minijogo de associação de colunas. |
| `src/app/pages/desafios/verdadeiro-falso/` | Minijogo de verdadeiro ou falso. |
| `src/app/pages/desafios/encontre-erro/` | Minijogo para identificar erros. |
| `src/app/app.routes.ts` | Define as rotas e a navegação entre as páginas. |
| `src/app/app.ts` | Componente principal da aplicação. |
| `src/app/app.html` | Template do componente principal. |
| `src/app/app.scss` | Estilos do componente principal, caso utilizados. |
| `src/styles.scss` | Estilos globais da aplicação. |
| `src/main.ts` | Inicialização da aplicação Angular. |
| `public/` | Arquivos estáticos públicos, como imagens e outros recursos. |
| `package.json` | Dependências e scripts do projeto. |
| `package-lock.json` | Registra as versões resolvidas das dependências. |
| `angular.json` | Configurações do projeto Angular. |
| `tsconfig.json` | Configurações do TypeScript. |

Cada página normalmente possui arquivos separados para lógica TypeScript (`.ts`), estrutura HTML (`.html`) e estilos SCSS (`.scss`).

## 🧭 Rotas da aplicação

| Endereço | Página |
|---|---|
| `/` | Página inicial |
| `/jogos` | Seleção de minijogos |
| `/jogos/quiz` | Quiz tradicional |
| `/jogos/ligar-colunas` | Ligue as colunas |
| `/jogos/verdadeiro-falso` | Verdadeiro ou falso |
| `/jogos/encontre-erro` | Encontre o erro |

## 🔧 Comandos úteis

| Comando | Função |
|---|---|
| `npm install` | Instala as dependências. |
| `npx ng serve` | Inicia o servidor de desenvolvimento. |
| `npx ng build` | Compila o projeto. |
| `npx ng generate component nome` | Gera um componente Angular. |
| `git status` | Mostra as alterações no repositório. |
| `git add .` | Prepara as alterações para o commit. |
| `git commit -m "mensagem"` | Registra as alterações no histórico. |
| `git pull origin main` | Atualiza a branch local com as alterações remotas. |
| `git push origin main` | Envia os commits para o GitHub. |

**Atenção:** execute os comandos Angular na pasta que contém o `package.json` do frontend. Antes de enviar alterações, confira a branch com `git branch` e o estado do projeto com `git status`.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Atualize sua cópia local.
2. Crie uma branch para a nova funcionalidade ou correção.
3. Faça as alterações necessárias.
4. Execute `npx ng build` para verificar a compilação.
5. Registre as alterações com um commit.
6. Envie a branch ao GitHub para revisão.

## 👥 Créditos

**Integrantes:** Ana Lima, Pedro, Mayalle e Silas.

**Orientador:** Marcelo.

**Disciplina:** Português — Sintaxe.

---

Projeto desenvolvido com finalidade educativa e de apoio ao aprendizado da língua portuguesa.
