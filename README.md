# Zetta Lab 2025
## Desafio 1 | Por Lorrana Verdi Flores

## Contextualização

Este projeto baseou-se na API da Plataforma The Movie Database, disponível em https://www.themoviedb.org/. A Referência à  API deste banco de dados pode ser acessada em https://developer.themoviedb.org/reference/getting-started. 

Este projeto está implementando o consumo das seguintes rotas:
- https://api.themoviedb.org/3/movie/{movie_id}
- https://api.themoviedb.org/3/movie/popular
- https://api.themoviedb.org/3/movie/top_rated

E ainda permite que o usuário possa salvar filmes de sua preferência como favoritos. Essa implementação simples visa apenas a persistência dos dados no navegador sem precisar de um back-end uma vez que não fora implementado funções de login, apenas para estender as implementações básicas de consumo da API e demonstrar como o APP poderia evoluir em futuras versões. 

Ainda pretendeu-se focar nas implementações básicas buscando melhorar a codebase uma vez que esta é a primeira experiência da desafiante focada no front-end e com as tecnologias utilizadas.

### Pré-requisites
- Docker
- Docker Compose

### Descrição das tecnologia utilizadas
- TypeScript (^5.0.0) – tipagem estática no projeto.

- **Vue 3** (^3.3.0):  framework principal para componentes reativos da UI.
- **Vue Router** (^4.2.0):  controle das rotas SPA.
- **Vite** (^5.0.0):  bundler/servidor rápido para desenvolvimento.
- **@vitejs/plugin-vue** (^4.0.0):  suporte oficial do Vite a arquivos .vue.
- **Axios** (^1.5.0):  requisições HTTP para a API TMDB.
- **Bootstrap** (^5.3.0):  estilos e componentes responsivos prontos.
- **Sass** (^1.60.0):  pré-processador para organizar estilos SCSS.
- **@types/node** (^20.0.0):  definições de tipos Node usadas pelo build/teste.

### Como ativar a aplicação

1. Clone o repositório:
   ```
   git clone https://github.com/lorranavf/zetta-lab-first-challenge
   cd zetta-lab-first-challenge
   ```
2. Salve a chave de acesso da API em 'deploy/environment/the_movie_db_api_key.env':
   ```
   VITE_TMDB_API_KEY=YOUR_API_KEY
   ```
   Para detalhes de como obter sua chave leia [Instruções para obter chave de acesso à API TMDB](deploy/environment/readme.md)

3. Ative a aplicação:
   ```
   make start
   ```

4. Para reiniciar a aplicação:
   ```
   make restart
   ```
5. Para parar a aplicação:
   ```
   make stop
   ```
6. Para remover a aplicação:
   ```
   make rm
   ```

### Inicialização em um clique

```bash
git clone https://github.com/lorranavf/zetta-lab-first-challenge && \
cd zetta-lab-first-challenge && \
make start
```


### Como acessar a aplicação

- Acesse a aplicação em: `http://localhost:8000`.


### Oferecimento
Este repositório foi  criado por Lorrana Verdi Flores como parte da resolução do Desafio I do Programa Zetta Lab.