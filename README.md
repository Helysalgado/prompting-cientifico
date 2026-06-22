# Prompting Científico con Inteligencia Artificial

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Quarto](https://img.shields.io/badge/Made%20with-Quarto-blue.svg)](https://quarto.org/)

Curso en línea sobre pensamiento científico, validación y reproducibilidad con IA.
Desarrollado en Quarto por Heladia Salgado (Centro de Ciencias Genómicas, UNAM).

## Curso en línea

**https://helysalgado.github.io/prompting-cientifico**

## Contenido

- **Módulo 1** — Fundamentos del LLM
- **Módulo 2** — Diseño de Prompts
- **Módulo 3** — Anatomía del Prompt
- **Módulo 4** — Protocolos Multi-etapa
- Apéndices: glosario, referencia rápida, formatos de salida

## Desarrollo local

### Requisitos

- [Quarto](https://quarto.org/docs/get-started/) v1.3 o superior
- Git

### Vista previa

```bash
git clone https://github.com/Helysalgado/prompting-cientifico.git
cd prompting-cientifico
quarto preview
```

### Compilar el sitio

```bash
quarto render
```

El sitio generado queda en `_site/`.

## Publicación

Cada push a la rama `main` despliega automáticamente el curso en GitHub Pages
mediante el workflow en `.github/workflows/publish.yml`.

## Licencia

Este material se distribuye bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
