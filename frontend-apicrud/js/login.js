//variables glovales del  formulario de login
const d = document;
userInput= d.querySelector("#usuarioForm")
passInput =d.querySelector("#contraForm")
btnLogin= d.querySelector(".btnLogin ")

//evento al boton del formulario{}
btnLogin.addEventListener("click",()=>{
    // alert("escribio :"+ userInput.value)
    let dataForm= getData();
    sendData(dataForm)
})

// funcion para validar formular
//obtener datos del formularios
let getData = ()=>{
    //validar formulario 
    let user;
    if (userInput.value && passInput.value) {
user={
    usuario: userInput.value,
    contrasena: passInput.value
}
userInput.value=""
passInput.value=""
    }else{
        alert("el usuario y la contraseña  es obligatorio")
    }
    console.log(user);
    return user;
}

//funcion para recibir los datos y relaizar la peticion del servidor
let sendData= async (data)=>{
let url =" http://localhost/backend-apiCrud/login"
try{
    let respuesta = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })
if (respuesta.status===401) {
    alert("el usuario y la contraseña es incrrecta")
}

    let userLogin = await respuesta.json()
alert(`bienvenido :${userLogin.nombre}`)
 window.location="../index.html"
}
catch(error){
console.log(error);
}   

}