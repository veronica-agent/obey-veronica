default:
    @just --list --justfile {{source_file()}}

install:
    npm ci

dev:
    npm run dev

build:
    npm run build

lint:
    npm run lint

preview:
    npx --yes serve out
