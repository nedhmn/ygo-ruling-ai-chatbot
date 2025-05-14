#!/usr/bin/env bash

set -e
set -x

cd packages/seeder
pnpm run db:seed
