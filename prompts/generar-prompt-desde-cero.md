# Generar Prompt Desde Cero

**Cuándo usarla:** al crear un prompt nuevo desde una descripción de tarea,
aplicando el rubric del proyecto desde el diseño (en vez de auditar uno ya
existente).

**Variables:**
- `{tarea}`: descripción de lo que el prompt debe lograr
- `{formato_salida_esperado}`: cómo debe verse la respuesta
- `{restricciones}`: límites o reglas que no se pueden romper

**Prompt:**
\`\`\`
Necesito un prompt para esta tarea: {tarea}.
Formato de salida esperado: {formato_salida_esperado}.
Restricciones: {restricciones}.
Aplicá el rubric del proyecto al diseñarlo: incluí al menos un ejemplo
few-shot, estructurá con tags XML, especificá el formato de salida
explícitamente, y anticipá casos ambiguos.
\`\`\`

**Ejemplo real:**

- **Input** (variables completadas):
  - `{tarea}`: "Auditar un prompt existente contra el rubric del proyecto
    (ejemplos few-shot, tags XML, formato de salida, claridad/ambigüedad) y
    sugerir mejoras, sin sobreescribir directamente"
  - `{formato_salida_esperado}`: "Tabla con score por criterio (cumple /
    parcial / no cumple) + propuesta de reescritura en formato diff"
  - `{restricciones}`: "Nunca aplicar el cambio automáticamente — siempre
    mostrar antes/después para que el usuario apruebe"

- **Output** (lo que terminó siendo el cuerpo del skill `auditar-prompt`):
  \`\`\`
  1. Leer el rubric de evaluación definido en CLAUDE.md.
  2. Si la tool MCP audit_prompt está disponible, usarla para los checks
     determinísticos. Si no, aplicar los mismos checks manualmente.
  3. Agregar evaluación cualitativa (claridad, ambigüedad, supuestos no
     declarados).
  4. NUNCA reescribir directo. Mostrar siempre: score por criterio,
     sugerencias concretas, y propuesta de reescritura en diff.

  Formato de salida:
  | Criterio | Estado | Comentario |
  |---|---|---|
  | Ejemplos (few-shot) | | |
  | Tags XML | | |
  | Formato de salida especificado | | |
  | Claridad / ambigüedad | | |
  \`\`\`