---
title: "Formatos de Salida"
subtitle: "Ejemplos de estructuras para instrucciones a la IA"
date: last-modified
description: "Catálogo de formatos de salida para diseñar prompts con resultados claros, trazables y reutilizables"
categories: [referencia, formatos, prompting]
---

Definir la salida esperada es una práctica instrumental: no mejora el razonamiento del modelo, pero sí la claridad, trazabilidad y reutilización del resultado. Los formatos de salida son herramientas auxiliares, no técnicas de razonamiento. Los siguientes son los más utilizados en contextos científicos y técnicos.

- **Tabla estructurada**  
  (comparación de genes, funciones, evidencias, resultados)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}

> Presenta la información en una tabla con columnas: gen, función biológica y tipo de evidencia.

:::

- **Lista numerada**  
  (algoritmos, protocolos experimentales, pasos metodológicos)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}

> Describe el procedimiento como una lista numerada de pasos.

:::

- **Lista con viñetas**  
  (propiedades, características, conceptos clave)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}

> Enumera en viñetas las funciones principales de los factores de transcripción.

:::

- **Pseudocódigo**  
  (descripción abstracta de algoritmos sin sintaxis específica)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}

> Describe el algoritmo en pseudocódigo, sin usar un lenguaje de programación específico.

:::

- **Esquema jerárquico**  
  (organización conceptual por niveles)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Organiza los conceptos desde nivel molecular hasta celular en un esquema jerárquico.
:::


- **Comparación paralela**  
  (similitudes y diferencias entre procesos o conceptos)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Compara transcripción y traducción en dos columnas paralelas.
:::

- **Definiciones breves y formales**  
  (una definición clara por concepto)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Define cada concepto en una sola oración formal.
:::

- **Fórmula o expresión matemática**  
  (modelos, relaciones cuantitativas, bioestadística)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Expresa la relación entre variables mediante una fórmula e indica el significado de cada símbolo.
:::

- **Código comentado**  
  (programación, análisis de datos, scripts reproducibles)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Presenta un fragmento de código en Python con comentarios que expliquen cada bloque.
:::

- **Tabla de entrada–salida**  
  (validación de algoritmos o funciones)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Considera el algoritmo de búsqueda lineal sobre una lista de números enteros.  
> Muestra ejemplos de entrada y salida del algoritmo en una tabla.  
> Incluye al menos tres casos de prueba representativos.  
:::

- **Checklist**  
  (criterios, validaciones, buenas prácticas)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Resume los criterios de validación en forma de checklist.
:::

- **Diagrama textual o flujo lógico**  
  (procesos secuenciales o decisiones)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Representa el proceso como un flujo lógico usando texto y flechas.
:::


- **Markdown**  
  (reportes, notebooks, documentos con jerarquía de secciones)

::: {.callout-note}
Especificar la estructura en Markdown fuerza una jerarquía clara, produce texto reutilizable directamente en reportes o notebooks, y evita explicaciones narrativas dispersas.
:::

::: {.callout-prompt title="Prompt — Instrucción a la IA"}
> Devuelve la información sobre el operón lac siguiendo esta estructura en Markdown:

```markdown
## Nombre del sistema
## Genes involucrados
## Mecanismo de regulación
## Condición de activación
```
:::

- **JSON**  
  (datos estructurados, integración con APIs o pipelines computacionales)

::: {.callout-prompt title="Prompt — Instrucción a la IA"}

> Devuelve la información sobre el gen lacZ exclusivamente en formato JSON, siguiendo esta estructura:

```json
{
  "gen": "",
  "organismo": "",
  "funcion": "",
  "producto": "",
  "proceso_biologico": ""
}
```
:::


