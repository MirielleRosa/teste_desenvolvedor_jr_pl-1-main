# LLM Summarizer API

Este projeto é uma API Node.js desenvolvida com TypeScript e Express, que permite aos usuários submeter textos e receber resumos gerados por um serviço Python utilizando LangChain.
O resumo gerado é salvo com o texto original e a versao resumida e traduzido conforme o idioma solicitado pelo usuário.

## Estrutura do Projeto

- **node-api/**: Contém a implementação da API Node.js.
  - **src/**: Contém o código-fonte da API.
    - **app.ts**: Ponto de entrada da aplicação.
    - **index.ts**: Inicia o servidor.
    - **routes/**: Define as rotas da API.
      - **tasksRoutes.ts**: Gerencia as rotas relacionadas a tarefas.
    - **repositories/**: Gerencia as tarefas em memória.
      - **tasksRepository.ts**: Implementa a lógica de armazenamento de tarefas.
- **python-llm/**: Contém a implementação do serviço Python.
  - **app/**: Contém o código-fonte do serviço Python.
    - **main.py**: Ponto de entrada da aplicação FastAPI.
    - **services/**: Implementa a lógica de resumo de texto.
      - **llm_service.py**: Interage com LangChain para gerar resumos.

## Environment

**HF_TOKEN**: Token de acesso ao Hugging Face(https://huggingface.co/settings/tokens). Caso não tenha, crie uma conta e gere um token(gratuito).

## Como Executar

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Instale as dependências dos projetos Node.js e Python:
   ```bash
   ./setup.sh install-node
   ./setup.sh install-python
   ```
4. Inicie a API Node.js e o serviço Python:
   ```bash
   ./setup.sh start-node
   ./setup.sh start-python
   ```
5. A API estará disponível em `http://localhost:3005`.

## Endpoints

- POST **/tasks**: Cria uma nova tarefa com o texto a ser resumido.
- GET **/tasks**: Lista todas as tarefas criadas.

## Texto de Exemplo

```
Diagnósticos médicos e decisões jurídicas: o papel da IA
A justiça e a Medicina são considerados campos de alto risco. Neles é mais urgente do que em qualquer outra área estabelecer sistemas para que os humanos tenham sempre a decisão final.

Os especialistas em IA trabalham para garantir a confiança dos usuários, para que o sistema seja transparente, que proteja as pessoas e que os humanos estejam no centro das decisões.

Aqui entra em jogo o desafio do "doutor centauro". Centauros são modelos híbridos de algoritmo que combinam análise formal de máquina e intuição humana.

Um "médico centauro + um sistema de IA" melhora as decisões que os humanos tomam por conta própria e que os sistemas de IA tomam por conta própria.

O médico sempre será quem aperta o botão final; e o juiz quem determina se uma sentença é justa.
```
FONTE: https://www.bbc.com/portuguese/articles/c2kx2e74jyxo

