---
title: "Del Prompt a la Respuesta"
subtitle: "Cómo los LLM convierten instrucciones en texto"
date: last-modified
description: "Algoritmo conceptual de generación autoregresiva: del prompt al token, paso a paso"
categories: [referencia, fundamentos, LLM]
---

Este apéndice describe el mecanismo por el que un modelo de lenguaje autoregresivo convierte un prompt en texto, distinguiendo entre lo que el usuario ve (prompt y respuesta) y lo que ocurre internamente (embeddings, atención y distribuciones de probabilidad).

::: {.callout-note}
**Modelos instruction-tuned.** Los modelos usados en este curso (Claude, ChatGPT, Gemini) no son modelos base: han sido ajustados mediante RLHF, DPO u otras técnicas para responder a instrucciones. El mecanismo autoregresivo descrito aquí es idéntico en ambos casos; lo que cambia es que la distribución de probabilidad ha sido sesgada durante el entrenamiento para seguir instrucciones de forma más efectiva y segura.
:::

```{=html}
<figure style="margin: 1.5rem 0;">
  <iframe
    src="diagram-llm-flow.html"
    width="100%"
    height="560"
    frameborder="0"
    style="border-radius:10px; border:1px solid #e2e8f0;"
    title="Diagrama del proceso de generación autoregresiva en un LLM">
  </iframe>
  <figcaption style="font-size:0.85em; color:#64748b; margin-top:0.6rem; text-align:center; line-height:1.5;">
    <strong>Figura.</strong> Del prompt a la respuesta: proceso de generación autoregresiva en un modelo de lenguaje grande.
    <strong>Parte 1</strong> (izquierda): el texto se segmenta en subtokens mediante BPE; cada token se convierte en un vector numérico (embedding) en un espacio de alta dimensión donde conceptos semánticamente relacionados se agrupan en regiones cercanas.
    <strong>Parte 2</strong> (derecha): los embeddings pasan por N capas Transformer; en cada capa, la atención QKV (<em>Query</em> = qué busco, <em>Key</em> = qué ofrezco, <em>Value</em> = qué cargo) permite que cada token integre información de los demás tokens del contexto; el vector final se proyecta contra la matriz de vocabulario entrenada (<em>h</em> × W<sub>vocab</sub>) para obtener una distribución de probabilidad sobre los ~50 000 tokens posibles; el token más probable se elige y se añade al contexto para la siguiente iteración (autoregresión con KV-cache).
  </figcaption>
</figure>
```


## Variables y conceptos

- **Prompt:** texto de entrada del usuario.
- **Tokens:** unidades discretas en que se divide el texto (palabras completas, subtokens, signos).
- **Vocabulario:** conjunto fijo de tokens que el modelo puede generar, definido durante el entrenamiento.
- **Embedding:** vector numérico que representa un token en el espacio latente.
- **Positional embedding:** señal que codifica el orden y posición de cada token en la secuencia.
- **Transformer:** arquitectura de red neuronal con capas de self-attention y MLP (feed-forward).
- **Logits:** puntajes sin normalizar para cada token del vocabulario.
- **Softmax:** función que convierte logits en una distribución de probabilidad.
- **Temperatura / muestreo:** parámetros que controlan la aleatoriedad en la selección del siguiente token.
- **KV-cache:** estructura que almacena las representaciones clave-valor de tokens previos para no recalcularlas en cada paso.


## Algoritmo paso a paso

### Paso 1 — Leer el prompt

**Qué ocurre:** el modelo recibe el prompt completo como entrada.

**Por qué:**

- El prompt define la tarea (explicar, comparar, resumir), el dominio y la audiencia.
- Actúa como condición inicial: sin prompt no hay contexto que condicione la generación.


### Paso 2 — Tokenización (texto → tokens)

**Qué ocurre:** el prompt se segmenta en **tokens** usando el vocabulario del modelo.

**Por qué:**

- El modelo necesita unidades discretas para indexar significado y frecuencia.
- El tokenizador (generalmente BPE — *Byte Pair Encoding*) divide palabras infrecuentes o especializadas en subtokens frecuentes, permitiendo representar términos nuevos sin ampliar el vocabulario.
- Hace el problema computable: se trabaja con un vocabulario fijo de tamaño finito.

**Ejemplo BPE:**

```
"transcripción"  →  ["trans", "crip", "ción"]
"regulatorio"    →  ["reg", "ul", "atorio"]
```

Los tokenizadores BPE no añaden prefijos especiales a los subtokens: la segmentación produce subunidades contiguas sin marcador de continuación explícito.


### Paso 3 — Embeddings (tokens → vectores)

**Qué ocurre:** cada token se convierte en un **embedding**, un vector numérico en el espacio latente del modelo.

**Por qué:**

- Las redes neuronales procesan números, no texto.
- Los embeddings capturan similitud: tokens relacionados quedan en regiones cercanas del espacio.
- Permiten combinar información semántica, estilo y dominio de forma continua.

#### ¿El prompt es un promedio de sus palabras?

Una intuición frecuente es que el prompt termina siendo algo así como el promedio de los embeddings de sus palabras. Esto **no es correcto**.

Lo que **no** ocurre:

- Tomar los embeddings iniciales → sumar → dividir entre el número de tokens.

Eso sería un modelo de *bolsa de palabras* (bag of words). Un Transformer no funciona así.

Lo que **sí** ocurre:

1. Cada token tiene un embedding inicial.
2. Se añade información de posición (Paso 4).
3. Los tokens pasan por múltiples capas de self-attention y MLP.
4. En cada capa, cada token puede modificar su representación en función de los demás.

Al final, el vector del último token contiene una representación integrada que codifica el significado global del prompt, la tarea solicitada, el dominio disciplinar, el estilo esperado y la audiencia. Esa representación vive en el **espacio latente** del modelo (típicamente 4 096 o 8 192 dimensiones según el modelo).

No es un promedio: es el resultado de múltiples transformaciones no lineales. El siguiente token será aquel cuya dirección en el espacio latente esté más alineada con esa representación contextual.


### Paso 4 — Añadir orden: positional embeddings

**Qué ocurre:** se integra una señal de posición en la representación de cada token.

**Por qué:**

- Un Transformer no "sabe" el orden por defecto: sin información posicional, "A regula B" y "B regula A" producirían la misma representación.
- Los positional embeddings permiten que la atención distinga qué información vino antes y qué vino después.

::: {.callout-note}
**Variantes modernas.** La arquitectura original (Vaswani et al., 2017) usaba embeddings posicionales absolutos sumados al embedding de cada token. Los modelos actuales emplean variantes más sofisticadas: **RoPE** (*Rotary Position Embedding*, usado en LLaMA y Mistral) codifica posición de forma relativa mediante rotaciones en el espacio de atención; **ALiBi** (*Attention with Linear Biases*) penaliza la atención en función de la distancia entre tokens. Ambas permiten generalizar mejor a secuencias largas.
:::


### Paso 5 — Pasar por múltiples capas Transformer

**Qué ocurre:** los embeddings atraviesan N capas con:

- **Self-attention:** cada token pondera a los demás según su relevancia para el contexto actual.
- **MLP (feed-forward):** transforma la información integrada por la atención.

**Por qué la profundidad importa:**

- Una sola capa captura patrones simples; múltiples capas construyen abstracciones progresivas.
- Capas tempranas: gramática y patrones locales.
- Capas medias: relaciones semánticas (quién hace qué a quién).
- Capas profundas: intención discursiva (definir, comparar, evaluar) y adecuación al estilo y audiencia.

Cada capa refina el contexto y enriquece la representación antes de pasar a la siguiente.


### Paso 6 — Proyección al vocabulario (embeddings → logits)

**Qué ocurre:** el estado interno final se transforma en un conjunto de **logits**, uno por cada token del vocabulario.

**Por qué:**

- El modelo debe convertir una representación continua (vector en espacio latente) en una decisión discreta (qué token sigue).
- La proyección calcula la similitud (producto punto) entre el vector contextual final y el vector de cada token del vocabulario, produciendo un puntaje para todas las opciones posibles.


### Paso 7 — Softmax (logits → distribución de probabilidad)

**Qué ocurre:** los logits se normalizan con softmax para obtener probabilidades.

**Por qué:**

- Permite interpretar los puntajes como "qué tan probable es cada token como siguiente".
- Habilita el control de la generación mediante temperatura y estrategias de muestreo (top-p, top-k).

Resultado: una **distribución de probabilidad** sobre todo el vocabulario del modelo.


### Paso 8 — Selección del siguiente token (muestreo)

**Qué ocurre:** se elige el próximo token a partir de la distribución.

**Por qué:**

- Elegir siempre el más probable (*greedy decoding*) produce texto estable pero puede ser repetitivo.
- Muestrear entre las opciones probables introduce variedad.
- **Temperatura** ajusta la concentración de la distribución: temperatura baja → más determinista; temperatura alta → más diverso.


### Paso 9 — Autoregresión: agregar el token al contexto

**Qué ocurre:** el token elegido se añade al final de la secuencia y el proceso se repite desde el Paso 5.

**Por qué:**

- El modelo es **autoregresivo**: cada token nuevo se convierte en parte del contexto que condiciona el siguiente.
- Esto produce coherencia: lo que ya se generó influye en lo que sigue.

::: {.callout-note}
**KV-cache.** En la práctica, los modelos modernos almacenan las representaciones clave-valor (*key-value cache*) de todos los tokens procesados. En cada paso nuevo, solo se procesa el token recién añadido, no la secuencia completa desde el inicio. Esto hace que la generación autoregresiva sea computacionalmente viable a escala, evitando recalcular la atención sobre todos los tokens previos en cada iteración.
:::


### Paso 10 — Parar (criterio de detención)

**Qué ocurre:** la generación se detiene cuando:

- se produce un token especial de fin de secuencia (`<|endoftext|>` u equivalente), o
- se alcanza el límite máximo de tokens configurado.

**Por qué:**

- El modelo no tiene un concepto propio de "tarea terminada"; el criterio de detención lo define el sistema, no el modelo.


## El vocabulario del modelo

El vocabulario es el conjunto finito y predefinido de tokens que el modelo puede generar, determinado durante el entrenamiento. Puede contener entre 32 000 y 100 000 tokens, e incluye palabras completas, subtokens, signos de puntuación, números y fragmentos comunes.

**El vocabulario no cambia según el prompt.** Lo que cambia es la distribución de probabilidad sobre ese vocabulario.

El prompt desplaza la representación interna a una región del espacio latente donde ciertos tokens están muy alineados y otros están mal alineados. Es un **filtrado probabilístico**, no estructural: tokens como "fútbol" o "pizza" siguen existiendo en el vocabulario cuando el prompt pide definir un gen; simplemente tienen probabilidad casi nula.

| Token | P (prompt sobre genética) |
|---|---|
| "Un" | 0.31 |
| "La" | 0.22 |
| "ADN" | 0.15 |
| "Transcripción" | 0.09 |
| "Fútbol" | 0.0003 |
| "Pizza" | 0.0001 |

El prompt no elimina palabras. Solo cambia su probabilidad.


## Resumen del flujo

```
Prompt (usuario)
  → Tokenización (BPE)
  → Embeddings de tokens + posicionales (RoPE / ALiBi / absolutos)
  → Capas Transformer × N
       ↳ Self-attention (cada token integra contexto de los demás)
       ↳ MLP feed-forward (transforma la información integrada)
  → Proyección al vocabulario → logits
  → Softmax → distribución de probabilidad
  → Selección del token (greedy / muestreo con temperatura)
  → Añadir token al contexto (KV-cache actualizado)
  → Repetir hasta token de fin o límite de longitud
```


## Ejemplo

### Prompt

> "Explica qué es un gen desde la perspectiva de la genética molecular, dirigido a estudiantes de licenciatura en ciencias genómicas, incluyendo su estructura, función y las limitaciones del concepto clásico."

### Iteración 1 — primer token

- **Entrada:** embeddings del prompt + posicionales
- **Distribución sobre el vocabulario (conceptual):**
  - "Un" → 0.38
  - "La" → 0.21
  - "En" → 0.14

**Token elegido:** `Un`

**Por qué:** en textos académicos en español, las definiciones suelen iniciar con "Un X es…" o "La X es…".

### Iteración 2 — segundo token

Contexto: prompt + `Un`

- "gen" → 0.44
- "concepto" → 0.18
- "elemento" → 0.08

**Token elegido:** `gen`

### Iteración 3 — tercer token

Contexto: prompt + `Un gen`

- "es" → 0.71
- "se" → 0.09

**Token elegido:** `es`

**Texto generado hasta aquí:** `Un gen es`

### ¿Cómo influyen las capas en este ejemplo?

- **Capas tempranas:** detectan que el prompt pide *definir* y que el registro debe ser académico.
- **Capas medias:** conectan "genética molecular" con términos esperables (ADN, ARN, transcripción) e identifican los campos requeridos: estructura + función.
- **Capas profundas:** integran "limitaciones del concepto clásico" y abren probabilidad a ideas como splicing alternativo, ARN no codificante y contexto genómico.

Esto no es planificación consciente: es refinamiento progresivo de representaciones que sesga la distribución del siguiente token.


## Conclusión

El modelo de lenguaje no "sabe" ni "planifica": ejecuta repetidamente un ciclo probabilístico.

> **representar el contexto → distribuir probabilidad sobre el vocabulario → elegir un token → añadirlo → repetir**

Tres ideas clave para retener:

1. **El vocabulario es global y fijo.** El prompt no elimina opciones: cambia su probabilidad.
2. **El prompt no es un promedio de sus palabras.** Es una dirección en el espacio latente construida capa por capa, que orienta la distribución hacia los tokens más coherentes con la tarea, el dominio y el estilo solicitados.
3. **La profundidad (múltiples capas) existe para enriquecer esa representación.** A más capas, mayor capacidad de integrar tarea, dominio, audiencia y restricciones del prompt antes de producir cada token.


## Referencias

- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems*, 30. <https://arxiv.org/abs/1706.03762>
- Su, J., Ahmed, M., Lu, Y., Pan, S., Bo, W., & Liu, Y. (2024). RoFormer: Enhanced transformer with rotary position embedding. *Neurocomputing*, 568, 127063. <https://arxiv.org/abs/2104.09864>
- Torres, T. (2026). How does ChatGPT work? A guide for the rest of us. *Product Talk*. <https://www.producttalk.org/how-does-chatgpt-work/>
