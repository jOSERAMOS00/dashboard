// Variable globales del formulario 
const d = document;
let nameInput = d.querySelector("#productos-select");
let priceInput = d.querySelector("#precio-pro");
let stockInput = d.querySelector("#stock-pro");
let descripcionInput = d.querySelector("#des-pro");
let imagen = d.querySelector("#imagen-pro");
let botonCreate = d.querySelector(".btn-create");
let productUpdate;
let nameUser =d.querySelector("#nombre-usuario");
let btnLogout=d.querySelector("#btnLogout");



//funcion para poner el nombre del usuario
let getUser =() =>{
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.nombre;



}

//evento para el boton de logout 

btnLogout.addEventListener("click",() =>{
    localStorage.removeItem("userLogin");
    location.href = "./login.html";
});



// Agregar evento al botón de formulario
botonCreate.addEventListener('click', () => {
    let dataProduct = getDataProduct();
    if (dataProduct) { // Solo enviar si dataProduct es válido
        sendDataproduct(dataProduct);
    }
});

//evento al navegador para comprobar si cargo la pagina
d.addEventListener("DOMContentLoaded", ()=>{
    getUser();
    productUpdate =JSON.parse( localStorage.getItem("productEdit"));
    if(productUpdate !=null){
        updateDataproduct();
    }
   
});
// Función para validar el formulario 
// Obtener los datos del formulario 
let getDataProduct = () => {
    // Validar formulario
    let product;
    if (nameInput.value && priceInput.value && descripcionInput.value && imagen.src) {
        product = {
            nombre: nameInput.value,
            descripcion: descripcionInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src // Corregido aquí
        }

        // Limpiar campos
        priceInput.value = "";
        descripcionInput.value = "";
        stockInput.value = "";
        imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL.SY250.jpg";
        console.log(product);
    } else {
        alert("Todos los datos son obligatorios");
    }

    return product; // Retorna el producto o undefined
};

// Función para recibir los datos y realizar la petición al servidor
let sendDataproduct = async (data) => {
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (respuesta.status == 406) {
            alert("Los datos enviados no son admitidos");
        } else {
            let mensaje = await respuesta.json();
            if (mensaje && mensaje.message) { // Verificar si mensaje existe
                alert(mensaje.message);
            } else {
                alert("Respuesta inesperada del servidor");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

//funcion para editar un producto 
let updateDataproduct = () =>{
   //agregar los datos a editar en los campos del formulario 
    nameInput.value=productUpdate.nombre;
    priceInput.value=productUpdate.precio;
    stockInput.value=productUpdate.stock;
    descripcionInput.value=productUpdate.descripcion;      
    imagen.src=productUpdate.imagen;
    let product;
    //alternar el boton de crear y editar
    let btnEdit = d.querySelector(".btn-update");
    botonCreate.classList.toggle("d-none");
    btnEdit.classList.toggle("d-none");
    //agregar evento al boton editar
    btnEdit.addEventListener("click",  () => {
        product = {
            id:productUpdate.id,
            nombre: nameInput.value,
            descripcion: descripcionInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src // Corregido aquí
        }
        //borrar la info del localstorage
        localStorage.removeItem("productUpdate");
        //pasar los datos del pructo a la funcion
        SendUpdateProduct(product);




    })

    };

//funcion para realizar la peticion al servidro

let SendUpdateProduct = async (pro) => {
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let respuesta = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pro)
        });

        if (respuesta.status == 406) {
            alert("Los datos enviados no son admitidos");
        } else {
            let mensaje = await respuesta.json();
            if (mensaje && mensaje.message) { 
                alert(mensaje.message);
            }

            // Asegurar que al regresar todo esté en su estado inicial
            localStorage.removeItem("productEdit"); // Limpiar localStorage
            botonCreate.classList.remove("d-none");  // Volver a mostrar el botón "Crear"
            let btnEdit = document.querySelector(".btn-update");
            btnEdit.classList.add("d-none"); // Ocultar el botón "Actualizar"

            // Redirigir al listado después de actualizar
            window.location.href = "./listado-pro.html";
        }
    } catch (error) {
        console.log(error);
    }
};