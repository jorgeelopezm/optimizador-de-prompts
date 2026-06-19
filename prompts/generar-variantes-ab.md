# Generar Variantes A/B

**Cuándo usarla:** cuando querés testear dos enfoques distintos de un
mismo prompt antes de decidir cuál dejar en producción.

**Variables:**
- `{prompt_base}`: el prompt sobre el que querés iterar
- `{hipotesis_a_testear}`: qué diferencia querés comparar

**Prompt:**
\`\`\`
Generá 2 variantes de este prompt: {prompt_base}
Cada variante debe testear esta hipótesis distinta: {hipotesis_a_testear}
Explicá qué diferencia clave tiene cada variante y qué resultado
esperás que cambie.
\`\`\`

**Ejemplo real:**

- **Input:**
  - `{prompt_base}`: el `description` del frontmatter de `auditar-prompt`
  - `{hipotesis_a_testear}`: "si una descripción corta centrada en frases
    gatillo dispara igual de bien que una larga y explicativa"

- **Output:**
  - **Variante A (larga):** "Usar este skill cuando el usuario pida
    auditar, revisar o mejorar un prompt existente según el rubric de
    buenas prácticas del proyecto. Se activa con frases como..."
  - **Variante B (corta):** "Audita prompts contra el rubric del
    proyecto. Triggers: 'audita este prompt', 'revisa este prompt',
    'mejora este prompt', 'qué le falta a este prompt'."
  - **Diferencia:** A prioriza contexto/propósito (mejor para matching
    semántico), B prioriza listado literal de frases (mejor para
    matching más estricto). Lo que cambia: tasa de activación correcta
    vs. falsos positivos.