#!/usr/bin/env bash
set -euo pipefail

endpoint=$(node helpers/getEndpoint.js)
echo "$endpoint" > .build/endpoint.out
export TODOS_ENDPOINT="https://$endpoint"


