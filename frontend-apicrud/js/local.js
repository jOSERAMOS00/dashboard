//varuables globales
const d = document;
let nameUser =d.querySelector("#nombre-usuario");
let btnLogout=d.querySelector("#btnLogout");


d.addEventListener("DOMContentLoaded", ()=>{
   getUser();
});
//funcion para poner el nombre del usuario
let getUser =() =>{
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.nombre;



}

//evento para el boton de logout 

btnLogout.addEventListener("click",() =>{
    localStorage.removeItem("userLogin");
    location.href = "../login.html";
});