Para el back
## Instalar todos los modulos necesarios
- npm install
## Iniciar el servicio en http://localhost:5000/
- npm start
- npx sequelize db:migrate
- crear tunel (ngork) y copiar en link en .env

Para flow
- API KEY y SECRET KEY estaran dentro de .env para poder utilizar el sandbox de flow y simular pagos.
- No se debe utilizar borrar la DB de reservaciones después de utilizar flow, ya que causara error en la comunicacion debido a una descoordinacion entre los id en los registros de flow y la db.
- Es necesario utilizar un tunel (como ngrok) para el backend y pegar la url en su .env, ya que flow luego hara POST a nuestra web utilizando dicho url.

Cuenta Sandbox Flow
- Email: sql37973@zwoho.com
- Contrasena: 12345678