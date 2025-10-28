# Como obter e ativar a chave de acesso à API?
1. Adicione um arquivo `the_movie_db_api_key.env` neste diretório com o seguinte conteúdo:

    ```
    VITE_TMDB_API_KEY=your_api_key
    ```

2. Para obter sua chave crie uma conta no [TMDB](https://www.themoviedb.org/), acesse a [página de configuração da API](https://www.themoviedb.org/settings/api), copie o código em `API do Token de Acesso de Leitura` e o cole no arquivo `the_movie_db_api_key.env` como instruído acima.

3. PAra checar se a aplicação está tendo o acesso correto à chave de autenticação, após a ativação acesse: http://localhost:8000/bearer