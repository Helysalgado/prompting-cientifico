# Perspectivas del curso — Qué sigue después del Capítulo 4

**Bioinformática e Inteligencia Artificial**  
Propuesta de continuación curricular · Versión de trabajo

---

## Dónde estamos

El curso ha construido una progresión desde el modelo probabilístico hasta el protocolo multi-fase:

| Capítulo | Concepto central | Unidad de trabajo |
|---|---|---|
| 1 | P(y\|x) — el modelo genera texto condicional | Token, distribución |
| 2 | Del prompt individual al marco de 7 componentes | Prompt estructurado |
| 3 | Control interno: ALCANCE, RESTRICCIONES, VERIFICACIÓN | Componentes canónicos |
| 4 | Protocolo multi-fase con gates y checkpoints | Arquitectura de interacción |

La pregunta que cierra el Capítulo 4 es el punto de partida de lo que sigue:

> *¿Cómo integrar estos protocolos en flujos de trabajo científicos reales,  
> con datos, herramientas externas y criterios formales de validación?*

---

## Capítulo 5 — Pipelines verificables: LLMs con datos y herramientas externas

**Concepto central:** El contexto x ya no es solo texto libre; ahora incluye la salida de herramientas computacionales (bases de datos, scripts, APIs). El modelo opera sobre datos estructurados y sus salidas deben poder validarse formalmente.

**Por qué sigue aquí:** El Capítulo 4 introdujo los gates como condiciones de avance. Este capítulo los implementa en código real y los conecta a fuentes externas verificables.

**Temas:**

- *Tool use / function calling* — el modelo llama herramientas externas en lugar de depender de su conocimiento interno (NCBI, UniProt, BLAST, EcoCyc)
- El pipeline como script: cada fase es una celda con gates en código (`GateError`)
- Validación formal de salidas: parseo de tablas, verificación de columnas, chequeo de accessions
- Logger de sesión: documentar modelo, temperatura, prompts y salidas como parte de Métodos
- Caso aplicado: pipeline de minería de literatura con la API de PubMed

**Pregunta generadora:** ¿Cómo cambia el riesgo epistemológico cuando el contexto incluye datos que el propio modelo no puede verificar?

**Entregable del estudiante:** Pipeline en Jupyter notebook con gates formales y log de sesión exportable.

---

## Capítulo 6 — RAG científico: cuando el modelo necesita saber más

**Concepto central:** Retrieval-Augmented Generation (RAG) extiende P(y|x) a P(y|x, D), donde D es un conjunto de documentos recuperados en tiempo de inferencia. El modelo responde a partir de evidencia recuperada, no de su entrenamiento.

**Por qué sigue aquí:** Los protocolos del Capítulo 4 asumen que el paper está disponible como contexto completo. RAG resuelve el caso donde la base de conocimiento es una colección de decenas o cientos de artículos.

**Temas:**

- Arquitectura RAG: indexación, recuperación semántica, generación condicionada
- Cuándo RAG reduce alucinaciones y cuándo no (el modelo puede alucidar sobre los fragmentos recuperados)
- Embeddings para literatura científica: similitud semántica vs. coincidencia léxica
- Granularidad del fragmento: párrafo vs. sección vs. abstract
- Caso aplicado: sistema de consulta sobre el regulón MalT a partir de 10 papers

**Pregunta generadora:** ¿Cómo afecta la calidad del índice (qué fragmentos se recuperan) a la confiabilidad de la respuesta?

**Entregable del estudiante:** Pipeline RAG básico sobre una colección de literatura propia, con evaluación de pertinencia de los fragmentos recuperados.

---

## Capítulo 7 — Evaluación formal de flujos LLM

**Concepto central:** Pasar de la revisión humana intuitiva a criterios formales y reproducibles. La rúbrica del Capítulo 4 es el punto de partida; aquí se convierte en instrumento de medición sistemático.

**Por qué sigue aquí:** Los Capítulos 3 y 4 introducen rúbricas y checkpoints. Este capítulo los formaliza como metodología de evaluación aplicable a cualquier flujo LLM científico.

**Temas:**

- Dimensiones de evaluación: fidelidad al texto fuente, precisión, cobertura, trazabilidad
- Evaluación automática vs. evaluación humana: cuándo cada una es suficiente
- Acuerdo entre evaluadores: cómo medir consistencia en la revisión humana
- LLM-as-judge: usar un modelo para evaluar la salida de otro (ventajas, riesgos y sesgos)
- Reproducibilidad: versionar prompts, modelo y temperatura como parte del método
- Caso aplicado: evaluar las salidas de Fases 2 y 4 del protocolo MalT con criterios formales

**Pregunta generadora:** ¿Qué necesita incluir la sección de Métodos de un paper para que un flujo LLM sea reproducible?

**Entregable del estudiante:** Rúbrica de evaluación para un flujo LLM propio, con al menos dos evaluadores independientes y cálculo de acuerdo.

---

## Capítulo 8 — Agentes y flujos con autonomía supervisada

**Concepto central:** Un agente LLM puede planificar, ejecutar herramientas, observar resultados y decidir el siguiente paso. La supervisión humana pasa de gate-por-gate a supervisión de nivel superior sobre objetivos y criterios de parada.

**Por qué sigue aquí:** Es la extensión natural del pipeline verificable: el investigador ya no aprueba cada fase individualmente, sino que define los gates y observa el flujo completo.

**Temas:**

- Del pipeline humano-en-el-loop al agente supervisado: qué se gana y qué se pierde
- Arquitecturas de agente: ReAct, Plan-and-Execute, agentes especializados
- Multi-agente: un agente extractor + un agente revisor + un agente curador
- Condiciones de parada y criterios de éxito definidos antes de ejecutar
- Riesgos de autonomía en ciencia: error en cascada, validación diferida
- Caso aplicado: agente de anotación funcional sobre una lista de genes

**Pregunta generadora:** ¿En qué puntos del flujo científico la autonomía es aceptable y en cuáles es epistemológicamente inapropiada?

**Entregable del estudiante:** Diseño (no necesariamente implementación) de un flujo de agente para un problema bioinformático real, con gates explícitos y criterios de intervención humana.

---

## Capítulo 9 — Ética, responsabilidad y límites epistémicos

**Concepto central:** Los flujos LLM en ciencia introducen responsabilidades nuevas: sobre la autoría, sobre la reproducibilidad, sobre los sesgos incorporados en el modelo y sobre cuándo no usar IA.

**Por qué sigue aquí:** Cierra el curso con la dimensión que da sentido a todo lo anterior. El rigor epistémico de los protocolos no es solo técnico: es ético.

**Temas:**

- Sesgos en modelos de lenguaje y su efecto en análisis científicos (sesgo de representación en literatura biomédica)
- Responsabilidad de autoría: ¿quién firma un análisis asistido por LLM?
- Cuándo NO usar LLMs: casos donde el riesgo epistemológico no puede mitigarse con protocolos
- Normas emergentes en publicación: declaraciones de uso de IA en journals biomédicos
- Reproducibilidad como deber: documentar el flujo LLM como parte del método científico
- La Fase 5 como posición ética: por qué el juicio científico final no se delega

**Pregunta generadora:** ¿Qué condiciones deben cumplirse para que el uso de un LLM en un análisis científico sea metodológicamente defendible ante revisores?

**Entregable del estudiante:** Declaración de uso de IA para un proyecto propio, siguiendo las guías de un journal objetivo.

---

## Hilo conductor

Cada capítulo extiende el modelo P(y|x) con una dimensión nueva:

```
Cap 1-2   P(y|x)              — el modelo genera dado un prompt
Cap 3-4   P(y|x*)             — x* es un prompt de 7 componentes en protocolo multi-fase
Cap 5     P(y|x*, T)          — T = salidas de herramientas externas
Cap 6     P(y|x*, T, D)       — D = documentos recuperados (RAG)
Cap 7                         — ¿Cómo medimos si y es correcto?
Cap 8                         — ¿Quién decide cuándo ejecutar el siguiente paso?
Cap 9                         — ¿Bajo qué condiciones es legítimo usar este flujo en ciencia?
```

La pregunta de fondo no cambia: **¿qué tan responsable es condicionar una conclusión científica en P(y|x)?**  
Lo que cambia capítulo a capítulo es cuánto control tiene el investigador sobre x, sobre T y D, y sobre los criterios de aceptación de y.

---

*Documento de trabajo — versión para discusión*  
*Generado: junio 2026*
