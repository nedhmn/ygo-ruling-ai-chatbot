#!/usr/bin/env bash

set -e
set -x

pnpm lint
pnpm build
pnpm check-types
