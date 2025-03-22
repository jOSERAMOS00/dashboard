//variables globales del formulario de login
const d = document
userInput = d.querySelector("#usuarioForm");
passInput = d.querySelector("#contraForm");
btonLogin = d.querySelector(".btnLogin");

//evento al boton de formulario

btonLogin.addEventListener("click", ()=>{
    //alert("escribio: "+ userInput.value);
    let dataForm = getData();
    sendData(dataForm);
});


//funcion para validar el formulario 
//obetener datos del formulario
let getData = ()=>{
//validar formulario
let user;
if (userInput.value && passInput.value) {
    user = {
        usuario: userInput.value,
        contrasena: passInput.value
    }

    userInput.value ="";
    passInput.value ="";


}else{
    alert("El usuario y la contraseña es obligatorio");
}
console.log(user);
return user;
};


//funcion para recibir los dtos y realizar la peticion 

let sendData = async (data)=>{
   let url = "http://localhost/backend-apiCrud/login";
   try {
    let respuesta = await fetch(url,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
       });
       if(respuesta.status == 401){
        alert("Usuario y/o contraseña incorrecto");
       }else{
        let userLogin = await respuesta.json();         
        alert(`bienvenido: ${userLogin.nombre}`);
        //guardar datos en locallstorage
        localStorage.setItem("userLogin",JSON.stringify(userLogin));
        location.href ="./index.html";
       }
   } catch (error) {
    console.log(error);
   }
   

};