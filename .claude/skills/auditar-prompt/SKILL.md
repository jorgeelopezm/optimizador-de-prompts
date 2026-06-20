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

5. Tras mostrar el diff, ofrecer guardar la versión mejorada como plantilla
   reutilizable en `plantillas/`. Ver `## Guardar plantilla` abajo.

## Formato de salida

| Criterio | Estado | Comentario |
|---|---|---|
| Ejemplos (few-shot) | | |
| Tags XML | | |
| Formato de salida especificado | | |
| Claridad / ambigüedad | | |

### Propuesta de reescritura
[diff antes/después]

## Guardar plantilla

Después de mostrar el diff (paso 5), preguntar:

`¿Querés guardar la versión mejorada como plantilla en plantillas/? (s/n)`

- Si responde **no**: terminar con "Listo, no se guardó nada."
- Si responde **sí**:
  1. Inferir un nombre de archivo kebab-case descriptivo a partir del propósito
     del prompt (ej. `resumir-articulo-3-puntos.md`) y confirmarlo con el usuario
     antes de escribir.
  2. Si ya existe un archivo con ese nombre en `plantillas/`, avisar y pedir
     confirmar la sobrescritura o un nombre nuevo antes de continuar.
  3. Guardar SOLO el cuerpo del prompt mejorado (los tags XML como
     `<instrucciones>`, `<ejemplo>` y el placeholder de input al final). Sin
     frontmatter ni la tabla de auditoría — la plantilla es el prompt listo para
     reusar, no el reporte. Seguir el estilo de `plantillas/resumir-articulo-3-puntos.md`.
  4. Confirmar la ruta final: `✓ Guardado en: plantillas/<nombre>.md`

### Ejemplo del flujo

```
[tabla de auditoría + diff de reescritura]

¿Querés guardar la versión mejorada como plantilla en plantillas/? (s/n)
> s
Propongo el nombre: plantillas/clasificar-tickets-soporte.md ¿Lo confirmás? (s/n)
> s
✓ Guardado en: plantillas/clasificar-tickets-soporte.md
```

```
[tabla de auditoría + diff de reescritura]

¿Querés guardar la versión mejorada como plantilla en plantillas/? (s/n)
> n
Listo, no se guardó nada.
```