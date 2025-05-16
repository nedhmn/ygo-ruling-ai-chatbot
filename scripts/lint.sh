#!/usr/bin/env bash

set -e
set -x

pnpm lint
pnpm check-types
