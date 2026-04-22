# Sistema de Agencia — Alpha Strategy Group

## Cómo usar este sistema

### Paso 1: Contexto (ya poblado)
Todos los archivos en `context/` tienen la base de la agencia:
- `marca.md` → identidad, valores, tono
- `audiencia.md` → buyer personas, pains, motivadores
- `producto.md` → servicios y modelo de precios
- `competencia.md` → análisis competitivo

### Paso 2: Crear un brief
Copia `briefs/TEMPLATE.md` y llénalo con los datos del cliente/proyecto.

### Paso 3: Activar el rol correcto
Los prompts están en `sistemas/prompts/`. Dile a Claude:
> "Actúa como [ROL]. Lee context/ y briefs/[proyecto].md. Tu tarea es: ..."

### Paso 4: Guardar resultados
Todo output va en `resultados/`:
- `copy/` → ads, emails, propuestas, landing pages
- `social/` → posts, calendarios, captions
- `reportes/` → diagnósticos, planes estratégicos

## Roles Disponibles
| Rol | Archivo de Prompt |
|-----|------------------|
| Copywriter | sistemas/prompts/copywriter.md |
| Social Media Manager | sistemas/prompts/social-media.md |
| Consultor de Negocios | sistemas/prompts/consultor-negocios.md |
| Especialista en Marca Personal | sistemas/prompts/marca-personal.md |
