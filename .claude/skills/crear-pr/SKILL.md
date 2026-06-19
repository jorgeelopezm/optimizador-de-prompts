---
name: crear-pr
description: Usar este skill cuando el usuario pida subir cambios a GitHub o crear un Pull Request. Se activa con frases como "sube esto a github", "crea un PR", "abre un pull request", "sube los cambios".
---

# Crear Pull Request

Cuando el usuario pida subir cambios o abrir un PR, seguir estos pasos EN ORDEN.
Nunca hacer merge — el usuario aprueba el merge manualmente en GitHub.

## Pasos

1. Verificar estado del repo antes de tocar nada:
   git status

2. Si hay cambios sin commitear de otra tarea (no relacionados a lo que se está
   por subir), avisar al usuario antes de continuar.

3. Crear una rama nueva y descriptiva (nunca trabajar directo sobre main):
   git checkout -b feature/<nombre-descriptivo>

4. Agregar y commitear los cambios:
   git add <archivos>
   git commit -m "<mensaje en formato Conventional Commits>"

5. Subir la rama al remoto:
   git push -u origin feature/<nombre-descriptivo>

6. Crear el Pull Request:
   gh pr create --title "<título corto>" \
     --body "<qué cambia / por qué / cómo probar>" \
     --base main

7. Devolver al usuario el link del PR.

## Restricciones
- NUNCA ejecutar gh pr merge bajo ninguna circunstancia.
- Si gh auth status falla, avisar y detenerse — no continuar sin autenticación.
- Si no se especificó nombre de rama, generar uno corto a partir del cambio
  (ej. feature/mejora-rubric-auditoria).