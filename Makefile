SHELL := /bin/zsh

.DEFAULT_GOAL := help
.PHONY: help env install setup reinstall dev build preview check validate clean nuke

PROJECT_NAME := neo-landing-open
NPM ?= npm
ENV_FILE := .env
ENV_EXAMPLE := .env.example
NODE_MODULES := node_modules

define ensure_deps
	@test -d "$(NODE_MODULES)" || { \
		echo "Dependencias ausentes. Rode 'make install' primeiro."; \
		exit 1; \
	}
endef

help: ## Lista os comandos disponiveis
	@printf "\n$(PROJECT_NAME)\n\n"
	@awk 'BEGIN {FS = ":.*## "}; /^[a-zA-Z0-9_-]+:.*## / {printf "  %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@printf "\n"

env: ## Cria .env a partir do .env.example se necessario
	@if [ -f "$(ENV_FILE)" ]; then \
		echo "$(ENV_FILE) ja existe."; \
	elif [ -f "$(ENV_EXAMPLE)" ]; then \
		cp "$(ENV_EXAMPLE)" "$(ENV_FILE)"; \
		echo "$(ENV_FILE) criado a partir de $(ENV_EXAMPLE)."; \
	else \
		echo "$(ENV_EXAMPLE) nao encontrado."; \
		exit 1; \
	fi

install: ## Instala as dependencias do projeto
	$(NPM) install

setup: env install ## Prepara ambiente local completo

reinstall: ## Reinstala dependencias do zero
	rm -rf $(NODE_MODULES) package-lock.json
	$(NPM) install

dev: ## Inicia ambiente de desenvolvimento
	$(ensure_deps)
	$(NPM) run dev

build: ## Gera build de producao
	$(ensure_deps)
	$(NPM) run build

preview: ## Serve o build localmente
	$(ensure_deps)
	$(NPM) run preview

check: ## Executa validacao do Astro
	$(ensure_deps)
	$(NPM) run check

validate: check build ## Executa pipeline minima de validacao

clean: ## Remove artefatos de build
	rm -rf dist .astro

nuke: ## Remove artefatos e dependencias locais
	rm -rf $(NODE_MODULES) dist .astro
