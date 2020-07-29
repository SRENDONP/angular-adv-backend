/*
El login de google funciona mediante un token que es el que valida que la informacion de correo y contraseña sea correcta
pero para que ese token sea valido hay que verifircarlo, se hace con el siguiente codigo extraido de la doc oficial de 
google para la verificacion de cuentas

https://developers.google.com/identity/sign-in/web/backend-auth
*/

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID); // rescato de la las variables de entorno el google id



const googleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];

  console.log(payload);

  const {name, email, picture} = payload;

  return {name, email, picture};

  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

//googleVerify().catch(console.error);


module.exports={
    googleVerify
}