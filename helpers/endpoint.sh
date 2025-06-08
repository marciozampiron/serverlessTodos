#!/usr/bin/env bash
set -euo pipefail

# 1. Garante que o diretório exista
mkdir -p .build

# 2. Busca o endpoint puro (sem protocolo) via CF Output
endpoint=$(node helpers/getEndpoint.js)

# 3. Grava o valor cru no arquivo
echo "$endpoint" > .build/endpoint.out

# 4. Exporta a variável completa com protocolo
export TODOS_ENDPOINT="https://$endpoint"

# 5. Mostra no console para facilitar debug
echo "✔ TODOS_ENDPOINT set to: $TODOS_ENDPOINT"

