#!/bin/bash

# Função para instalar dependências do Node.js
install_node() {
    echo "Instalando dependências do Node.js..."
    cd node-api || exit
    npm install
    cd - || exit
}

# Função para instalar dependências do Python
install_python() {
    echo "Instalando dependências do Python..."
    cd python-llm || exit
    pip install -r requirements.txt
    cd - || exit
}

# Função para executar o modo de desenvolvimento do Node.js
dev_node() {
    echo "Iniciando servidor Node.js no modo de desenvolvimento..."
    cd node-api || exit
    npm run dev
    cd - || exit
}

# Função para executar o servidor Node.js no modo padrão
start_node() {
    echo "Iniciando servidor Node.js..."
    cd node-api || exit
    npm start
    cd - || exit
}

# Função para executar o servidor Python
start_python() {
    echo "Iniciando servidor Python..."

    # Cria e ativa o ambiente virtual
    python -m venv .venv

    # Verifica o sistema operacional para ativar o ambiente virtual corretamente
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        # Para Windows
        source .venv/Scripts/activate
    else
        # Para Linux/Mac
        source .venv/bin/activate
    fi

    cd python-llm || exit
    uvicorn app.main:app --host 127.0.0.1 --port 8000
}

# Verifica o comando passado como argumento
case $1 in
    install-node)
        install_node
        ;;
    install-python)
        install_python
        ;;
    install)
        install_node
        install_python
        ;;
    dev-node)
        dev_node
        ;;
    start-node)
        start_node
        ;;
    start-python)
        start_python
        ;;
    *)
        echo "Comando inválido. Use um dos seguintes:"
        echo "  install-node     - Instala dependências do Node.js"
        echo "  install-python   - Instala dependências do Python"
        echo "  install          - Instala todas as dependências"
        echo "  dev-node         - Inicia o servidor Node.js no modo dev"
        echo "  start-node       - Inicia o servidor Node.js"
        echo "  start-python     - Inicia o servidor Python"
        ;;
esac
