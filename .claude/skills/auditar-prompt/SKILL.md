---
name: auditar-prompt
description: Usar este skill cuando el usuario pida auditar, revisar o mejorar un prompt existente según el rubric de buenas prácticas del proyecto. Se activa con frases como "audita este prompt", "revisa este prompt", "qué le falta a este prompt", "mejora este prompt".
model: haiku
---

# Auditar Prompt

## Proceso

1. Leer el rubric de evaluación definido en CLAUDE.md.

2. Si la tool MCP `audit_prompt` (servidor prompt-reviewer) está disponible,
   usarla para los checks determinísticos (ejemplos, tags XML, formato de
   salida, longitud). Si todavía no está conectada, aplicar estos mismos
   checks manualmente.

3. Agregar evaluación cualitativa que el check determinístico no mide:
   claridad, ambigüedad, supuestos no declarados.

4. NUNCA reescribir directo. Mostrar siempre:
   - Score por criterio (cumple / parcial / no cumple)
   - Sugerencias concretas
   - Propuesta de reescritura en formato diff (antes/después)

## Formato de salida

| Criterio | Estado | Comentario |
|---|---|---|
| Ejemplos (few-shot) | | |
| Tags XML | | |
| Formato de salida especificado | | |
| Claridad / ambigüedad | | |

### Propuesta de reescritura
[diff antes/después]