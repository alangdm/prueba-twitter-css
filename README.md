# Feed de Twitter en css

Basado en https://github.com/litmus/example-css-tweets

## Deploy
Puedes hacer deploy a [Heroku](https://heroku.com) usando el botón debajo.
Después de crear tu [Aplicación de Twitter](https://apps.twitter.com), da
clíc al botón de "Deploy to Heroku" y sigue los pasos indicados para crear tu
propia versión de la aplicación.

En caso de que no te lo pida, deberás agregar a las variables de configuración
las siguientes:

```
TWITTER_CONSUMER_KEY - Tu llave de aplicación de Twitter
TWITTER_CONSUMER_SECRET - Tu secreto de aplicación de Twitter
TWITTER_SEARCH_STRING - El string del término a buscar
```

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Desarrollo Local

### Requerimientos
* Git
* Node.js (6.4.0 o superior)

### Setup
1. Clona el repositorio: `git clone https://github.com/alangdm/prueba-twitter-css`
2. Instala Dependencias: `cd prueba-twitter-css && npm install`
3. Crea tu aplicación de Twitter: https://apps.twitter.com/
4. Crea un archivo de Environment y asigna las tres variables de configuración mencionadas arriba a manera de `VARIABLE="valor"`
5. Corre el comando `node index.js` o `heroku local web` si tienes instalado el CLI de Heroku
6. Visita [http://localhost:5000/tweets.css](http://localhost:5000/tweets.css)
