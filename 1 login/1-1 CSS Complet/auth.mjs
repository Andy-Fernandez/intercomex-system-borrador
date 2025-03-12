// auth.mjs
class User {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }
}

// Base de datos simulada
let dataBase = [
  new User("user@1", "123456"),  
  new User("user@2", "123456"),
];

// Función para agregar un nuevo usuario
export function addUser(userName, password) {
  if (dataBase.some(user => user.userName === userName)) {
    console.log("❌ El usuario ya existe.");
    return false;
  }
  dataBase.push(new User(userName, password));
  console.log("✅ Usuario registrado con éxito.");
  return true;
}

// Función para verificar las credenciales del usuario
export function findUser(userName, password) {
  return dataBase.some(user => user.userName === userName && user.password === password);
}

// Función para obtener todos los usuarios (Opcional, para pruebas)
export function getUsers() {
  return dataBase;
}
