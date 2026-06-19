# Convertir a XML

**Cuándo usarla:** cuando tenés una instrucción en lenguaje natural sin
estructura y falla el criterio "Tags XML" del rubric.

**Variables:**
- `{instruccion_original}`: el texto sin estructurar
- `{secciones_a_separar}`: qué partes separar con tags

**Prompt:**
\`\`\`
Convertí esta instrucción en un prompt estructurado con tags XML: {instruccion_original}
Separá explícitamente estas secciones: {secciones_a_separar}
\`\`\`

**Ejemplo real:**

- **Input:**
  - `{instruccion_original}`: el cuerpo original del skill `crear-pr`
    (pasos numerados en texto plano, sin tags)
  - `{secciones_a_separar}`: "contexto, pasos, restricciones"

- **Output:**
```xml
  <contexto>
  Usar cuando el usuario pida subir cambios o crear un PR.
  </contexto>

  <pasos>
  1. git status
  2. git checkout -b feature/<nombre>
  3. git add / git commit
  4. git push -u origin feature/<nombre>
  5. gh pr create --title --body --base main
  </pasos>

  <restricciones>
  - Nunca ejecutar gh pr merge
  - Si gh auth status falla, detenerse y avisar
  </restricciones>
```