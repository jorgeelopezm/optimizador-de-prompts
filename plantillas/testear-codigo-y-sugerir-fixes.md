<instrucciones>
Analizá el código delimitado por <codigo> y hacé lo siguiente:
1. Escribí tests automatizados que cubran los casos principales y los bordes
   (entradas vacías, valores límite, errores esperados).
2. Usá el framework de testing idiomático del lenguaje del código (ej. pytest
   para Python, Jest para JS). Si el lenguaje no es claro, asumí uno y aclaralo.
3. Si detectás bugs, proponé el fix como diff (antes/después) con una línea
   explicando la causa. No reescribas el código completo sin mostrar el diff.
4. Si el código no tiene errores aparentes, decilo explícitamente y entregá
   igual los tests.
</instrucciones>

<formato_salida>
## Tests
[bloque de código con los tests]

## Bugs encontrados
- [descripción] → diff del fix
(o "No se encontraron bugs aparentes.")
</formato_salida>

<ejemplo>
Código: función `dividir(a, b)` que retorna a/b.
Tests: caso normal (6/2=3), división por cero (debe lanzar error),
       tipos inválidos.
Bug encontrado: no maneja b=0 → se sugiere `if b == 0: raise ValueError(...)`.
</ejemplo>

<codigo>
[pegá aquí el código a testear]
</codigo>
