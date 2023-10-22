git checkout main
git pull upstream main
git push --set-upstream origin main

### Agregar el repo externo

```
git remote add upstream https://github.com/stephendawsondev/HalloweenHackathon.git
```

### Actualizar la rama local con el repo externo

```
git fetch upstream
```

### Crea una rama para tu trabajo local

```
git checkout -b
```

### Sube tu rama al repositorio remoto:

```
git push -u upstream new-enhance
```

_La opción -u o --set-upstream para configurar el seguimiento de la rama en el repositorio remoto._

### Conocer los repos definidos o configurados

```
git remote -v
```

###

```

```
