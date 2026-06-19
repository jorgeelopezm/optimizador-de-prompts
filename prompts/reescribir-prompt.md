# Reescribir Prompt

**Cuándo usarla:** cuando ya tenés un prompt funcional pero necesitás
adaptarlo a un caso de uso distinto sin perder su estructura.

**Variables:**
- `{prompt_original}`: el prompt que ya funciona
- `{nuevo_caso_de_uso}`: para qué lo necesitás ahora
- `{que_cambia}`: qué partes deben modificarse específicamente

**Prompt:**
\`\`\`
Tomá este prompt: {prompt_original}
Adaptalo para este nuevo caso de uso: {nuevo_caso_de_uso}
Lo que tiene que cambiar específicamente: {que_cambia}
Mantené la estructura y el formato de salida del original salvo que el
nuevo caso lo requiera explícitamente.
\`\`\`

**Ejemplo real:**

- **Input:**
  - `{prompt_original}`: el meta-prompt usado para generar el SKILL.md de
    `crear-pr` (frontmatter + pasos de git/gh)
  - `{nuevo_caso_de_uso}`: "generar el SKILL.md de `auditar-prompt` en vez
    de `crear-pr`"
  - `{que_cambia}`: "el frontmatter `description` y el cuerpo deben
    reflejar el proceso de auditoría con rubric, no comandos git"

- **Output:** el SKILL.md de `auditar-prompt` que ya tenés — misma
  estructura (frontmatter + proceso numerado + formato de salida), pero
  contenido completamente distinto.