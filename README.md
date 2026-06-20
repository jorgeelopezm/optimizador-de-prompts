# optimizador-de-prompts

Herramienta para **auditar y mejorar prompts** de forma consistente, y para
**automatizar el flujo de subir esos cambios a GitHub** vía pull request.

Enlace para demo: https://vimeo.com/1202978095

Combina dos enfoques complementarios:

- Checks **determinísticos** del rubric, vía el MCP `prompt-reviewer`.
- Evaluación **cualitativa** (claridad, ambigüedad, supuestos no declarados),
  vía el skill `auditar-prompt`.

## Rubric de evaluación

Todo prompt se audita contra 4 criterios fijos:

1. **Ejemplos (few-shot)** — ¿incluye al menos un ejemplo concreto de uso?
2. **Tags XML / estructura** — ¿separa instrucciones, contexto y ejemplos con tags?
3. **Formato de salida especificado** — ¿define explícitamente cómo debe verse la respuesta?
4. **Claridad / ambigüedad** — ¿hay instrucciones vagas o contradictorias?

La definición autoritativa del rubric vive en [`CLAUDE.md`](CLAUDE.md) y es la
referencia única que usan tanto el skill como la tool MCP.

## Componentes

| Componente | Qué hace |
|---|---|
| `prompts/` | Plantillas de prompt reutilizables (`generar-prompt-desde-cero.md`, `reescribir-prompt.md`, `convertir-a-xml.md`, `generar-variantes-ab.md`, `generar-ejemplos-fewshot.md`). |
| `plantillas/` | Plantillas de tarea listas para usar (`resumir-articulo-3-puntos.md`). |
| `.claude/skills/auditar-prompt/` | Aplica el rubric. Usa la tool MCP `audit_prompt` si está disponible; si no, aplica los checks manualmente y agrega la evaluación cualitativa. |
| `.claude/skills/crear-pr/` | Automatiza el flujo git/gh para abrir un PR. **Nunca hace merge.** |
| `mcp-server/` | MCP `prompt-reviewer`: checks determinísticos del rubric vía la tool `audit_prompt`. |

## Uso

Los skills se activan por frases gatillo en una conversación con Claude Code:

- **Auditar un prompt** — "audita este prompt", "revisa este prompt", "qué le
  falta a este prompt". Devuelve un score por criterio y, si corresponde, una
  propuesta de reescritura en formato diff (antes/después). Nunca reescribe
  directo.
- **Subir cambios / abrir PR** — "sube esto a github", "crea un PR", "abre un
  pull request". Crea una rama, commitea, hace push y abre el PR. **El merge lo
  aprobás vos a mano en GitHub.**

## MCP `prompt-reviewer`

El server expone la tool `audit_prompt(prompt: string)`, que corre los checks
determinísticos del rubric (ejemplos few-shot, tags XML, formato de salida,
longitud) y devuelve el resultado por criterio.

Instalación:

```bash
cd mcp-server
npm install
```

Se conecta vía [`.mcp.json`](.mcp.json) (transporte stdio, `node mcp-server/index.js`).

## Decisiones de diseño

Las decisiones clave están documentadas en [`CLAUDE.md`](CLAUDE.md):

- **Rubric fijo (no dinámico)** — para poder comparar la calidad de un prompt a
  lo largo del tiempo y entre revisiones.
- **Nunca reescribir un prompt sin mostrar diff antes/después** — toda sugerencia
  de reescritura se presenta para aprobación manual; nunca se aplica directo.
