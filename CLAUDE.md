# optimizador-de-prompts

## Sobre este proyecto

Herramienta para auditar y mejorar prompts de forma consistente, y para
automatizar el flujo de subir esos cambios a GitHub vía pull request.

## Rubric de evaluación

Todo prompt se audita contra estos 4 criterios fijos. Este rubric es la
referencia única usada tanto por el skill `auditar-prompt` como por la
tool MCP `audit_prompt` (servidor `prompt-reviewer`):

1. **Ejemplos (few-shot)** — ¿incluye al menos un ejemplo concreto de uso?
2. **Tags XML / estructura** — ¿separa instrucciones, contexto y ejemplos con tags?
3. **Formato de salida especificado** — ¿define explícitamente cómo debe verse la respuesta?
4. **Claridad / ambigüedad** — ¿hay instrucciones vagas o contradictorias?

## Decisiones de diseño

### Decisión 1: Rubric de evaluación fijo (no dinámico)

**Contexto:** sin criterios fijos, cada auditoría podría evaluar cosas distintas
según el contexto de la conversación, haciendo imposible comparar la calidad
de un prompt a lo largo del tiempo o entre revisiones.

**Decisión:** definir 4 criterios fijos, versionados en este archivo, y
reutilizarlos en todos los componentes del proyecto (skill y futuro MCP).

**Alternativas consideradas:** dejar que el modelo decida los criterios caso
por caso — más flexible ante casos nuevos, pero no comparable ni auditable
a futuro.

**Consecuencias:** el rubric es menos adaptable a casos atípicos, pero permite
trackear mejora histórica y mantener consistencia entre auditorías hechas en
distintos momentos.

### Decisión 2: Nunca reescribir un prompt sin mostrar diff antes/después

**Contexto:** un prompt ya en uso puede tener comportamiento ajustado a mano
con el tiempo; sobreescribirlo automáticamente arriesga romper ese
comportamiento sin que el usuario lo note.

**Decisión:** toda sugerencia de reescritura se presenta como diff
(antes/después) para aprobación manual — nunca se aplica directo.

**Alternativas consideradas:** aplicar el cambio automáticamente y loggear el
diff aparte — descartada por el riesgo de cambios silenciosos no revisados.

**Consecuencias:** el flujo es un paso más lento (requiere aprobación manual),
pero más seguro y predecible.

## Componentes

- `prompts/` — plantillas de prompt reutilizables.
- `.claude/skills/auditar-prompt/` — aplica el rubric de arriba.
- `.claude/skills/crear-pr/` — automatiza el flujo git/gh, nunca hace merge.
- `mcp-server/` — MCP `prompt-reviewer` (activo): checks determinísticos del
  rubric vía la tool `audit_prompt`, conectado a través de `.mcp.json`.