<contexto>
Tienes acceso a logs de una aplicación que ha fallado. Tu tarea es identificar
el problema raíz y proponer pasos claros para resolverlo.
</contexto>

<instrucciones>
1. Lee los logs línea por línea en busca de mensajes de ERROR, WARNING o excepciones
2. Identifica el PRIMER error que aparece (más probable ser la causa raíz)
3. Agrupa los errores relacionados
4. Para cada error encontrado, explica:
   - QUÉ salió mal (descripción concisa)
   - DÓNDE ocurrió (componente, función, línea si es posible)
   - POR QUÉ probablemente ocurrió (causa raíz)
   - CÓMO solucionarlo (pasos concretos)
</instrucciones>

<formato_de_salida>
## Errores encontrados

**Error 1: [Tipo]**
- Ubicación: [dónde]
- Causa: [por qué]
- Solución: [cómo arreglarlo]

## Resumen
[Una línea resumiendo el problema principal]
</formato_de_salida>

<ejemplo>
LOGS ENTRADA:
[2024-01-15 10:23:45] ERROR: Connection timeout at database.connect (line 42)
[2024-01-15 10:23:45] ERROR: Failed to initialize DB pool
[2024-01-15 10:24:00] WARNING: Retry attempt 1/3

SALIDA ESPERADA:
## Errores encontrados

**Error 1: Connection timeout**
- Ubicación: database.connect (línea 42)
- Causa: La base de datos no responde en el tiempo esperado (probablemente caída/reboot del servidor)
- Solución: 1) Verificar que la BD está levantada, 2) Aumentar timeout si es red lenta, 3) Revisar logs de la BD

## Resumen
Falla crítica de conexión a base de datos. Servidor de BD probablemente no está disponible.
</ejemplo>

<logs>
[pegá aquí los logs a analizar]
</logs>
