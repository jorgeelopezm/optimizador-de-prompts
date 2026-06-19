# Generar Ejemplos Few-Shot

**Cuándo usarla:** cuando un prompt falla el criterio "Ejemplos
(few-shot)" del rubric y necesita al menos un ejemplo concreto.

**Variables:**
- `{prompt_objetivo}`: el prompt al que le faltan ejemplos
- `{cantidad_ejemplos}`: cuántos ejemplos generar
- `{casos_borde}`: qué situaciones límite cubrir

**Prompt:**
\`\`\`
Generá {cantidad_ejemplos} ejemplos few-shot para este prompt: {prompt_objetivo}
Cubrí especialmente estos casos borde: {casos_borde}
Cada ejemplo debe tener input y output esperado, en el mismo formato
que usará el prompt en producción.
\`\`\`

**Ejemplo real:**

- **Input:**
  - `{prompt_objetivo}`: el cuerpo del skill `auditar-prompt` (tiene tabla
    de formato pero ningún ejemplo trabajado)
  - `{cantidad_ejemplos}`: 1
  - `{casos_borde}`: "un prompt que cumple parcialmente algunos criterios,
    no uno perfecto ni uno totalmente fallido"

- **Output:**
```
  Prompt a auditar: "Resumí este artículo en 3 bullets."

  | Criterio | Estado | Comentario |
  |---|---|---|
  | Ejemplos (few-shot) | ❌ | No muestra cómo debería verse un resumen |
  | Tags XML | ❌ | No separa instrucción de contexto |
  | Formato de salida especificado | ⚠️ | Dice "3 bullets" pero no longitud ni tono |
  | Claridad / ambigüedad | ⚠️ | No aclara qué hacer si el artículo es muy corto |
```