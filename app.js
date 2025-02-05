// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let listadoAmigos = [];
let amigosSorteados = [];

function agregarAmigo() {
  let nombre = document.getElementById("amigo");
  console.log(`nombre = ${nombre.value.toUpperCase()}`);
  if (listadoAmigos.includes(nombre.value.toUpperCase())) {
    asignarTextoElemento("h4", `El amigo [${nombre.value}] ya existe.`);
  } else {
    asignarTextoElemento("h4", "");
    listadoAmigos.push(nombre.value.toUpperCase());
    let indice = listadoAmigos.length - 1;
    console.log(`listadoAmigos[${indice}] = ${listadoAmigos[indice]}`);
    pintaAmigo("listaAmigos", indice, "");
    nombre.value = "";
    limpiaTodosSorteados();
  }
}

function limpiaTodosSorteados() {
  console.log(
    `amigosSorteados.length = ${amigosSorteados.length} listadoAmigos.length = ${listadoAmigos.length}`
  );
  if (amigosSorteados.length < listadoAmigos.length) {
    asignarTextoElemento("p", "");
  }
}

function pintaAmigo(id, indice, textoAdicional) {
  let obtenAmigo = listadoAmigos[indice];
  var li = document.createElement("LI");
  li.innerHTML = obtenAmigo == "" ? "(nada)" : textoAdicional + obtenAmigo;

  let lista = document.getElementById(id);
  lista.appendChild(li);
}

function borrarLi() {
  lis = document.getElementById("listadoAmigos").getElementsByTagName("li");
  for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
      if (confirm("¿Borrar este li?")) this.parentNode.removeChild(this);
    };
  }
}

function sortearAmigo() {
  console.log(
    `amigosSorteados.length = ${amigosSorteados.length} listadoAmigos.length = ${listadoAmigos.length}`
  );
  //Si ya sorteamos a todos los amigos
  if (amigosSorteados.length == listadoAmigos.length) {
    asignarTextoElemento("p", "Ya se sortearon todos los amigos posibles");
    return -1;
  } else {
    let indiceAmigoSorteado = Math.floor(Math.random() * listadoAmigos.length); //No le agrega el  + 1, porque los indices de un arreglo van de cero a n-1;
    if (!amigosSorteados.includes(listadoAmigos[indiceAmigoSorteado])) {
      console.log(
        `listadoAmigos[${indiceAmigoSorteado}] = ${listadoAmigos[indiceAmigoSorteado]}`
      );
      amigosSorteados.push(listadoAmigos[indiceAmigoSorteado]);
      return indiceAmigoSorteado;
    } else {
      //el amigo ya ha sido sorteado, sortea a otro amigo
      console.log("el amigo ya ha sido sorteado, sortea a otro amigo");
      return sortearAmigo();
    }
  }
}

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function pintaAmigoSorteado() {
  let indiceAmigoSorteado = sortearAmigo();
  if (indiceAmigoSorteado != -1) {
    pintaAmigo("resultado", indiceAmigoSorteado, "El amigo sorteado es: ");
  }
}
