#!/usr/bin/env bash
set -euo pipefail

mkdir -p .build
endpoint=$(node helpers/getEndpoint.js)
echo "$endpoint" > .build/endpoint.out
export TODOS_ENDPOINT="$endpoint"
echo "✔ TODOS_ENDPOINT set to: $TODOS_ENDPOINT"

