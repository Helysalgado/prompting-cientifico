---
title: "Cómo se construye un modelo de lenguaje"
subtitle: "Arquitectura y entrenamiento de los LLM: de los datos a los pesos"
date: last-modified
description: "Referencia técnica sobre la arquitectura Transformer y el proceso de pre-entrenamiento: self-attention, QKV, pesos, función de pérdida, backpropagation, RoPE y espacio latente"
categories: [referencia, fundamentos, LLM, arquitectura, entrenamiento]
---

Este apéndice describe cómo se construye y entrena un modelo de lenguaje grande (LLM), proceso inverso al que se describe en "Del Prompt a la Respuesta". Ambos comparten la misma arquitectura, pero con propósitos distintos: durante el entrenamiento los pesos se ajustan; durante la inferencia los pesos están fijos y se usa el modelo para generar texto.

::: {.callout-note}
**Nota sobre el alcance.** Este apéndice se centra en el pre-entrenamiento: la fase en que el modelo aprende a predecir texto a partir de grandes volúmenes de datos. El ajuste fino y el alineamiento (RLHF, DPO) se describen en el glosario bajo los términos correspondientes.
:::

```{=html}
<figure style="margin: 1.5rem 0;">
  <iframe
    src="diagram-llm-training.html"
    width="100%"
    height="530"
    frameborder="0"
    style="border-radius:10px; border:1px solid #e2e8f0;"
    title="Diagrama del ciclo de entrenamiento de un LLM">
  </iframe>
  <figcaption style="font-size:0.85em; color:#64748b; margin-top:0.6rem; text-align:center; line-height:1.5;">
    <strong>Figura.</strong> Arquitectura y ciclo de entrenamiento de un modelo de lenguaje grande.
    <strong>Forward pass</strong> (izquierda → derecha): el corpus se tokeniza mediante BPE; cada token se convierte en un embedding al que se añade codificación posicional relativa mediante RoPE; los embeddings pasan por N bloques Transformer, cada uno con LayerNorm, self-attention QKV (<em>Q</em> = qué busco, <em>K</em> = qué ofrezco, <em>V</em> = qué cargo), conexión residual, segunda LayerNorm y MLP con función de activación no lineal (ReLU/GELU/SwiGLU); el vector final se proyecta contra la matriz de vocabulario (<em>h</em> × W<sub>vocab</sub>) para producir logits y, tras softmax, una distribución de probabilidad; la entropía cruzada mide la distancia entre la predicción y el token real.
    <strong>Backward pass</strong> (derecha → izquierda): el gradiente de la pérdida fluye hacia atrás por todas las capas mediante backpropagation (regla de la cadena); el optimizador Adam actualiza todos los pesos del modelo (θ ← θ − α∇L). Este ciclo se repite sobre millones de lotes hasta que el modelo converge.
  </figcaption>
</figure>
```


## Antecedentes: LSTMs y el problema de la secuencialidad

Antes de los Transformers, el modelado de secuencias se realizaba con redes recurrentes (RNN) y, en particular, con **Long Short-Term Memory networks (LSTM)**, introducidas por Hochreiter y Schmidhuber (1997). Una LSTM procesa los tokens de una secuencia uno a uno, manteniendo un estado oculto que actúa como "memoria" de los tokens previos. Para resolver el problema del desvanecimiento del gradiente (que dificultaba aprender dependencias a larga distancia en las RNNs simples), las LSTMs incorporan tres **compuertas** (gates): de entrada (*input gate*), de olvido (*forget gate*) y de salida (*output gate*). Estas compuertas aprenden qué información retener o descartar en cada paso.

La limitación fundamental de las LSTMs no es su capacidad expresiva, sino su **estructura secuencial**: el estado oculto en el paso $t$ depende del estado en $t-1$, lo que impide procesar los tokens en paralelo. En secuencias largas, esto se traduce en tiempos de entrenamiento prohibitivos y en dificultades para capturar relaciones entre tokens muy distantes. Esta limitación motivó la propuesta del Transformer (Vaswani et al., 2017), cuya operación central —la atención— no requiere procesamiento secuencial.


## La arquitectura Transformer

El Transformer (Vaswani et al., 2017) reemplaza la recurrencia por **atención**: cada token puede interactuar directamente con cualquier otro token de la secuencia, independientemente de la distancia. Esto habilita la paralelización completa del cómputo durante el entrenamiento.

La propuesta original plantea una arquitectura **Encoder-Decoder**:

- **Encoder:** procesa la secuencia de entrada completa. Cada token puede atender a todos los demás tokens (atención bidireccional). Produce representaciones contextuales que capturan el significado de cada token en su contexto global. Esta arquitectura es la base de modelos como BERT.
- **Decoder:** genera la secuencia de salida token por token. Aplica **atención enmascarada** (cada token solo puede atender a los tokens anteriores, no a los futuros) y luego atención cruzada sobre las representaciones del encoder. Es la base de los modelos de traducción originales.

Los **LLM modernos** (GPT, Claude, LLaMA, Mistral, Gemini) usan exclusivamente el **decoder**, eliminando el encoder y la atención cruzada. En estos modelos —llamados *decoder-only* o causales— cada token solo puede atender a los tokens que lo preceden en la secuencia, lo que permite el entrenamiento autoregresivo eficiente y la generación de texto de izquierda a derecha.

```
Encoder-Decoder (traducción):    Decoder-only (LLM):
  [Encoder]                         [Decoder] × N
  Atención bidireccional      →     Atención causal (masked)
  [Decoder]                         Directamente sobre el vocabulario
  Atención cruzada
```


## Bloques internos del Transformer

Cada capa de un Transformer decoder-only aplica, en orden:

1. **LayerNorm** (pre-normalización)
2. **Self-attention multicabezal** (con QKV)
3. **Conexión residual**
4. **LayerNorm** (segunda pre-normalización)
5. **MLP feed-forward**
6. **Conexión residual**

Esta secuencia se repite N veces (por ejemplo, 32 veces en LLaMA-7B o 96 veces en GPT-3).


### Los pesos: qué son y qué representan

Los **pesos** (*weights*) son matrices de números de punto flotante que el modelo aprende durante el entrenamiento. Cada operación del Transformer involucra multiplicar las representaciones actuales por una o más de estas matrices.

Las matrices de pesos principales son:

- $W_E$ — matriz de embeddings: asigna un vector a cada token del vocabulario.
- $W_Q, W_K, W_V$ — proyecciones de Query, Key y Value en cada capa de atención.
- $W_O$ — proyección de salida de la atención.
- $W_1, W_2$ — pesos de las dos capas del MLP.
- $W_{\text{vocab}}$ — matriz de vocabulario de salida (frecuentemente compartida con $W_E$).

En un modelo moderno, la suma de todos estos parámetros puede ascender a miles de millones: GPT-3 tiene 175 000 millones; LLaMA-3-8B tiene 8 000 millones. Todos estos valores se inicializan aleatoriamente y se ajustan durante el entrenamiento.


### Producto escalar

El **producto escalar** (*dot product*) entre dos vectores $\mathbf{a}$ y $\mathbf{b}$ de dimensión $d$ es:

$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{d} a_i b_i$$

Geométricamente, el producto escalar mide la **alineación** entre dos vectores: es máximo cuando apuntan en la misma dirección y cero cuando son ortogonales. Esta propiedad lo convierte en una medida natural de similitud en espacios de alta dimensión, y es la operación central en el mecanismo de atención.


### Self-attention y el mecanismo QKV

La **self-attention** permite que cada token de la secuencia calcule una nueva representación integrando información de todos los demás tokens, ponderada por su relevancia.

Para cada token representado como vector $\mathbf{x}$, se calculan tres proyecciones lineales:

$$\mathbf{q} = \mathbf{x} W_Q, \qquad \mathbf{k} = \mathbf{x} W_K, \qquad \mathbf{v} = \mathbf{x} W_V$$

La intuición de cada proyección:

| Proyección | Pregunta que responde |
|---|---|
| **Q** (Query) | ¿Qué información necesito del resto del contexto? |
| **K** (Key) | ¿Qué información puedo ofrecer al resto? |
| **V** (Value) | ¿Qué información debo transmitir si soy relevante? |

El puntaje de atención entre la posición $i$ (query) y la posición $j$ (key) se calcula como:

$$\text{score}(i,j) = \frac{\mathbf{q}_i \cdot \mathbf{k}_j}{\sqrt{d_k}}$$

La división por $\sqrt{d_k}$ (raíz cuadrada de la dimensión de las keys) evita que los productos escalares crezcan en magnitud con la dimensión, lo que saturaría el softmax y colapsaría los gradientes.

El softmax sobre todos los puntajes produce pesos de atención que suman 1. La salida para la posición $i$ es la suma ponderada de los vectores Value:

$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\!\left(\frac{\mathbf{Q}\mathbf{K}^\top}{\sqrt{d_k}}\right)\mathbf{V}$$

En los modelos causales (decoder-only), se aplica una **máscara** que establece en $-\infty$ los puntajes de atención hacia posiciones futuras, de modo que el softmax les asigne probabilidad cero. Esto garantiza que el modelo solo use información pasada al generar cada token.


### Atención multicabezal (multi-head attention)

En lugar de aplicar una sola función de atención, el Transformer aplica $h$ funciones de atención en paralelo, cada una con sus propias matrices $W_Q^{(i)}, W_K^{(i)}, W_V^{(i)}$ de dimensión reducida $d_k = d_{\text{model}} / h$. Cada "cabezal" puede especializarse en capturar distintos tipos de relaciones (sintácticas, semánticas, de correferencia, etc.). Las salidas de todos los cabezales se concatenan y se proyectan de vuelta a $d_{\text{model}}$ mediante $W_O$.


### Funciones de activación: la no linealidad

Las capas lineales (multiplicaciones de matrices) son transformaciones lineales: componer dos o más de ellas produce únicamente otra transformación lineal. Para que la red pueda aprender patrones no lineales, es necesario intercalar **funciones de activación** no lineales.

Las funciones de activación más comunes en los LLM son:

- **ReLU** (*Rectified Linear Unit*): $\text{ReLU}(x) = \max(0, x)$. Simple y efectiva; introduce no linealidad truncando valores negativos. Fue la función estándar en los primeros Transformers.
- **GELU** (*Gaussian Error Linear Unit*): $\text{GELU}(x) = x \cdot \Phi(x)$, donde $\Phi$ es la función de distribución acumulada de la gaussiana estándar. Suaviza la discontinuidad de ReLU y mejora el aprendizaje en modelos profundos. Usada en GPT-2, GPT-3 y BERT.
- **SwiGLU**: variante de Swish con compuerta (*gated linear unit*), $\text{SwiGLU}(x, W, V) = \text{Swish}(xW) \odot (xV)$. Usada en LLaMA, Mistral y PaLM; ofrece mejor rendimiento empírico a igual número de parámetros.

Sin no linealidad, un Transformer de N capas sería equivalente a una sola multiplicación de matrices: no podría aprender ninguna representación compleja.


### Normalización de capas (LayerNorm)

La **normalización de capas** (*Layer Normalization*, Ba et al., 2016) estabiliza el entrenamiento normalizando las activaciones de cada token independientemente:

$$\text{LayerNorm}(\mathbf{x}) = \frac{\mathbf{x} - \mu}{\sigma + \epsilon} \cdot \boldsymbol{\gamma} + \boldsymbol{\beta}$$

donde $\mu$ y $\sigma$ son la media y desviación estándar calculadas sobre las $d_{\text{model}}$ dimensiones de ese token, y $\boldsymbol{\gamma}$, $\boldsymbol{\beta}$ son parámetros aprendidos. A diferencia de la normalización por lote (*Batch Normalization*), que normaliza sobre el lote de ejemplos, LayerNorm opera por token y no requiere estadísticas del lote.

Los modelos modernos aplican **Pre-LayerNorm** (la normalización se aplica antes de la atención y del MLP, no después), lo que produce gradientes más estables en redes muy profundas.


### MLP feed-forward

Después de la self-attention, cada token pasa por un bloque **MLP** de dos capas lineales con una función de activación intermedia:

$$\text{MLP}(\mathbf{x}) = W_2 \cdot \text{activación}(W_1 \mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2$$

La dimensión intermedia suele ser $d_{ff} = 4 \times d_{\text{model}}$ (o incluso mayor en modelos recientes). El bloque MLP opera de forma independiente sobre cada posición y no mezcla información entre tokens; esa tarea la realiza la self-attention. El MLP contiene aproximadamente dos tercios de todos los parámetros del modelo y actúa como una memoria asociativa que almacena conocimiento factual aprendido durante el preentrenamiento.


## El espacio latente

El **espacio latente** es el espacio vectorial de alta dimensión ($d_{\text{model}}$ dimensiones, típicamente 768–8192) en que viven todas las representaciones internas del modelo. No es directamente interpretable, pero tiene una estructura geométrica coherente: tokens semánticamente relacionados tienden a ocupar regiones cercanas; relaciones de analogía se manifiestan como operaciones vectoriales aditivas (el ejemplo clásico: rey − hombre + mujer ≈ reina, Mikolov et al., 2013).

Durante el forward pass, la representación de cada token recorre el espacio latente capa a capa: comienza como un embedding estático y termina como un vector contextual enriquecido por toda la información relevante del prompt. Es sobre este vector final donde se aplica la proyección al vocabulario para generar la distribución de probabilidad del siguiente token.


## Codificación posicional: RoPE

Los Transformers, a diferencia de las LSTMs, no tienen noción inherente del orden. Para que el modelo distinga "A regula B" de "B regula A" es necesario introducir información posicional.

El método más extendido en los LLM modernos es **RoPE** (*Rotary Position Embedding*, Su et al., 2024). En lugar de sumar vectores posicionales a los embeddings, RoPE aplica una **rotación** a los vectores Query y Key según la posición de cada token:

$$\mathbf{q}_m' = R(\theta, m)\, \mathbf{q}_m, \qquad \mathbf{k}_n' = R(\theta, n)\, \mathbf{k}_n$$

La propiedad clave de estas rotaciones es que el producto escalar de los vectores rotados depende únicamente de la **posición relativa** $(m - n)$, no de las posiciones absolutas $m$ y $n$:

$$\mathbf{q}_m' \cdot \mathbf{k}_n' = f(m - n)$$

Esto permite que el modelo generalice mejor a secuencias más largas que las vistas durante el entrenamiento, ya que las relaciones entre tokens se codifican como distancias relativas. RoPE es utilizado en LLaMA, Mistral, Qwen y otros modelos recientes.


## Proceso de entrenamiento

### Objetivo: predicción del siguiente token

El pre-entrenamiento de un LLM es un problema de **modelado del lenguaje**: dado un prefijo de tokens $t_1, t_2, \ldots, t_{n-1}$, predecir el token $t_n$. Esto se aplica sobre cada posición de cada secuencia de entrenamiento, usando los tokens reales como contexto (*teacher forcing*): no se usan tokens generados por el propio modelo, sino los tokens verdaderos del corpus.

El corpus de entrenamiento puede ascender a billones de tokens (Common Crawl, libros, código, Wikipedia, artículos científicos). LLaMA-3 fue entrenado sobre más de 15 × 10¹² tokens; GPT-3, sobre ~300 × 10⁹.


### Función de pérdida: entropía cruzada

La **función de pérdida** cuantifica qué tan lejos está la predicción del modelo de la respuesta correcta. Para el modelado del lenguaje se usa la **entropía cruzada**:

$$\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N} \log P(t_i \mid t_1, \ldots, t_{i-1})$$

donde $P(t_i \mid \cdot)$ es la probabilidad que el modelo asigna al token correcto $t_i$ dado el contexto. Minimizar esta función equivale a maximizar la verosimilitud del corpus de entrenamiento: el modelo aprende a asignar alta probabilidad a los tokens que realmente aparecen en el texto.

La **perplejidad** es la exponencial de la entropía cruzada y se usa habitualmente como métrica de evaluación: mide cuántos tokens el modelo considera igualmente plausibles en promedio (menor perplejidad = mejor modelo).


### Retropropagación (backpropagation)

**Backpropagation** (Rumelhart et al., 1986) es el algoritmo que permite calcular el gradiente de la función de pérdida con respecto a todos los parámetros del modelo, aplicando la **regla de la cadena** del cálculo diferencial.

El proceso tiene dos fases:

1. **Forward pass:** los datos fluyen de entrada a salida, calculando todas las activaciones y la pérdida final.
2. **Backward pass:** el gradiente de la pérdida fluye de salida a entrada, multiplicando los gradientes locales de cada operación en sentido inverso.

Para una operación intermedia $z = f(x)$:

$$\frac{\partial \mathcal{L}}{\partial x} = \frac{\partial \mathcal{L}}{\partial z} \cdot \frac{\partial z}{\partial x}$$

En la práctica, los frameworks modernos (PyTorch, JAX) implementan **diferenciación automática** en modo inverso (*reverse-mode autodiff*), que ejecuta el backward pass automáticamente para cualquier grafo computacional, sin necesidad de derivar manualmente las fórmulas.

Las conexiones residuales ($\mathbf{x} + \text{sublayer}(\mathbf{x})$) son esenciales para que los gradientes puedan fluir a través de muchas capas sin desvanecerse: la derivada de $\mathbf{x} + f(\mathbf{x})$ respecto de $\mathbf{x}$ es $1 + \frac{\partial f}{\partial \mathbf{x}}$, lo que garantiza un camino de gradiente directo incluso cuando $f$ tiene gradientes pequeños.


### Descenso de gradiente y el optimizador Adam

El **descenso de gradiente** actualiza los parámetros en la dirección opuesta al gradiente:

$$\theta \leftarrow \theta - \alpha \cdot \nabla_\theta \mathcal{L}$$

donde $\alpha$ es la **tasa de aprendizaje** (*learning rate*). En la práctica se usa **descenso de gradiente estocástico por minilotes** (*mini-batch SGD*): en lugar de calcular el gradiente exacto sobre todo el corpus, se estima sobre lotes de miles de secuencias.

El optimizador estándar para los LLM es **Adam** (Kingma & Ba, 2015), que combina dos mejoras sobre el SGD puro:

- **Momento** (*momentum*): acumula una media exponencial de gradientes pasados para suavizar la trayectoria de optimización.
- **Adaptación de la tasa de aprendizaje**: escala el gradiente de cada parámetro por la inversa de la raíz de la media de los gradientes al cuadrado, permitiendo que parámetros con gradientes pequeños avancen más rápido.

Además, se aplica:

- **Programación de la tasa de aprendizaje:** primero aumenta linealmente durante los primeros pasos (*warmup*) y luego decrece siguiendo un coseno. Esto estabiliza el inicio del entrenamiento cuando los pesos son aleatorios.
- **Recorte de gradientes** (*gradient clipping*): si la norma del gradiente supera un umbral, se escala hacia abajo. Previene la explosión de gradientes en redes muy profundas.
- **Weight decay**: penalización L2 sobre los pesos para evitar sobreajuste.


## Resumen del flujo de entrenamiento

```
Corpus de texto (billones de tokens)
  ↓ Tokenización (BPE)
  ↓ Secuencias de entrenamiento
  ↓ Forward pass:
       Embeddings (W_E)
       + Codificación posicional (RoPE)
       × N capas Transformer:
            LayerNorm
            Self-attention (QKV, producto escalar, softmax)
            Conexión residual
            LayerNorm
            MLP (W_1, activación, W_2)
            Conexión residual
       Proyección al vocabulario (W_vocab)
       Softmax → distribución P(siguiente token)
  ↓ Función de pérdida: entropía cruzada vs. token real
  ↓ Backward pass: backpropagation + regla de la cadena
  ↓ Actualización de pesos: Adam + lr schedule + gradient clipping
  ↓ Repetir sobre todos los lotes del corpus (múltiples épocas)
  ↓ Modelo pre-entrenado (pesos fijos)
```

Una vez completado el pre-entrenamiento, el modelo puede generar texto coherente pero no sigue instrucciones de forma natural. Las fases de ajuste fino y alineamiento (RLHF, DPO, SFT) ajustan los pesos del modelo pre-entrenado para que responda apropiadamente a instrucciones explícitas, lo que da lugar a los modelos de chat como Claude o ChatGPT.


## Referencias

- Ba, J. L., Kiros, J. R., & Hinton, G. E. (2016). Layer normalization. *arXiv preprint arXiv:1607.06450*. <https://arxiv.org/abs/1607.06450>
- Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. *Neural Computation*, 9(8), 1735–1780. <https://doi.org/10.1162/neco.1997.9.8.1735>
- Kingma, D. P., & Ba, J. (2015). Adam: A method for stochastic optimization. *International Conference on Learning Representations (ICLR)*. <https://arxiv.org/abs/1412.6980>
- Mikolov, T., Chen, K., Corrado, G., & Dean, J. (2013). Efficient estimation of word representations in vector space. *arXiv preprint arXiv:1301.3781*. <https://arxiv.org/abs/1301.3781>
- Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. *Nature*, 323(6088), 533–536. <https://doi.org/10.1038/323533a0>
- Shazeer, N. (2020). GLU variants improve transformer. *arXiv preprint arXiv:2002.05202*. <https://arxiv.org/abs/2002.05202>
- Su, J., Ahmed, M., Lu, Y., Pan, S., Bo, W., & Liu, Y. (2024). RoFormer: Enhanced transformer with rotary position embedding. *Neurocomputing*, 568, 127063. <https://arxiv.org/abs/2104.09864>
- Touvron, H., Martin, L., Stone, K., Albert, P., Almahairi, A., Babaei, Y., … & Scialom, T. (2023). Llama 2: Open foundation and fine-tuned chat models. *arXiv preprint arXiv:2307.09288*. <https://arxiv.org/abs/2307.09288>
- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems*, 30. <https://arxiv.org/abs/1706.03762>
