#!/bin/bash
set -euo pipefail

# Fetch and export the API endpoint
ENDPOINT=$(node helpers/getEndpoint.js)
export TODOS_ENDPOINT="https://${ENDPOINT}"

echo "✔ Using API base URL: $TODOS_ENDPOINT"
