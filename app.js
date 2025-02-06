// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let listadoAmigos = [];
let amigosSorteados = [];

function agregarAmigo() {
  let nombre = document.getElementById("amigo");
  nombreAmigo = nombre.value.toUpperCase().trim();
  console.log(`nombre amigo = ${nombreAmigo}`);

  if (validaNombre(nombreAmigo)) {
    asignarTextoElemento("h4", "");
    listadoAmigos.push(nombreAmigo);
    let indice = listadoAmigos.length - 1;
    console.log(
      `antes.listadoAmigos[${indice}] = ${listadoAmigos[indice]}. listadoAmigos = ${listadoAmigos}`
    );
    pintaNuevoAmigo("listaAmigos", indice, "**");
    console.log(`despues. listadoAmigos = ${listadoAmigos}`);
    nombre.value = ""; //limpia el campo donde se captura el nombre del amigo
    limpiaTodosSorteados();
  }
  console.log(`listadoAmigos = ${listadoAmigos}`);
}

function validaNombre(nombreAmigo) {
  let bandera = false;
  let mensaje = "";
  if (nombreAmigo.length < 1) {
    mensaje = "Debes teclear un nombre válido.";
  } else if (listadoAmigos.includes(nombreAmigo)) {
    mensaje = `El amigo [${nombreAmigo}] ya existe.`;
  } else if (!sonCaracteresValidos(nombreAmigo)) {
    mensaje = `El texto [${nombreAmigo}] No es válido. Sólo se admiten letras y espacio.`;
  } else {
    bandera = true;
  }

  if (!bandera) {
    asignarTextoElemento("h4", mensaje);
  }
  return bandera;
}

function sonCaracteresValidos(nombreAmigo) {
  //valida si es numero = /(^[0-9])*$/.test(nombreAmigo)
  //valida si es una cadena de caracteres = /^[A-Z]+$/i   Referencia: https://es.stackoverflow.com/questions/230177/validar-solo-letras-en-javascript
  // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
  // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
  console.log(
    `evaluando expresion = ${/^[A-Z|\u00D1| |\u00F1]+$/i.test(nombreAmigo)}`
  );
  return /^[A-Z|\u00D1| |\u00F1]+$/i.test(nombreAmigo); //false= No es una Letra, true = es una letra
}

function pintaNuevoAmigo(id, indice, textoAdicional) {
  //la lista de amigos (listadoAmigos)
  let obtenAmigo = listadoAmigos[indice];
  var li = document.createElement("li");
  li.innerHTML = obtenAmigo == "" ? "(nada)" : textoAdicional + obtenAmigo;
  li.onclick = () => {
    if (
      confirm(
        `¿Borrar el amigo [${li.innerHTML.substring(
          2
        )}] de la lista del amigo secreto?`
      )
    ) {
      console.log(`li.innerHTML = ${li.innerHTML}`);
      listadoAmigos = listadoAmigos.filter(
        (elAmigo) => elAmigo != li.innerHTML.substring(2)
      );
      console.log(`El nuevo valor de listadoAmigos = ${listadoAmigos}`);
      li.parentNode.removeChild(li); //se usa asi, cuando se pone function () {} this.parentNode.removeChild(this);

      var liSorteado = document.createElement("li");
      liSorteado.innerHTML = `**El amigo sorteado es: ${li.innerHTML.substring(
        2
      )}`;
      console.log(
        `quitaElementoAmigoSorteado.  liSorteado.innerHTML = ${liSorteado.innerHTML}`
      );
      //quitaElementoAmigoSorteado(liSorteado);
      amigosSorteados = amigosSorteados.filter(
        (elAmigo) => elAmigo != liSorteado.innerHTML.substring(24) //**El amigo sorteado es:   son las primeras 24 posiciones antes del nombre
      );
      console.log(`El nuevo valor de amigosSorteados = ${amigosSorteados}`);
      //liSorteado.remove(); //li.parentNode.removeChild(liSorteado);

      var ul = document.getElementById("resultado");
      var items = ul.children;
      for (i = 0; i < items.length; i++) {
        console.log(
          `Elemento lista amigos sorteados items[${i}] = ${items[i].innerHTML}`
        );
        if (items[i].innerHTML === liSorteado.innerHTML) {
          items[i].parentNode.removeChild(items[i]);
          break;
        }
      }
    }
  };

  let lista = document.getElementById(id);
  lista.appendChild(li);
}

function limpiaTodosSorteados() {
  console.log(
    `amigosSorteados.length = ${amigosSorteados.length}, listadoAmigos.length = ${listadoAmigos.length}`
  );
  if (amigosSorteados.length < listadoAmigos.length) {
    asignarTextoElemento("p", "");
  }
}

function amigoSorteado() {
  if (listadoAmigos.length == 0) {
    asignarTextoElementoById("mensaje-sorteado", "No hay amigos registrados.");
  } else {
    let indiceAmigoSorteado = sortearAmigo();
    if (indiceAmigoSorteado != -1) {
      pintaAmigoSorteado(
        "resultado",
        indiceAmigoSorteado,
        "**El amigo sorteado es: "
      );
    }
  }
  console.log(`amigosSorteados = ${amigosSorteados}`);
}

function sortearAmigo() {
  console.log(
    `amigosSorteados.length = ${amigosSorteados.length} listadoAmigos.length = ${listadoAmigos.length}`
  );
  //Si ya sorteamos a todos los amigos
  if (amigosSorteados.length == listadoAmigos.length) {
    asignarTextoElementoById(
      "mensaje-sorteado",
      "Ya se sortearon todos los amigos posibles"
    );
    return -1;
  } else {
    let indiceAmigoSorteado = Math.floor(Math.random() * listadoAmigos.length); //No le agrega el  + 1, porque los indices de un arreglo van de cero a n-1;
    if (!amigosSorteados.includes(listadoAmigos[indiceAmigoSorteado])) {
      console.log(
        `listadoAmigos[${indiceAmigoSorteado}] = ${listadoAmigos[indiceAmigoSorteado]}`
      );
      amigosSorteados.push(listadoAmigos[indiceAmigoSorteado]);
      return amigosSorteados.length - 1; //siempre regresa el ultimo elemento, ya que se acaba de agregar. //indiceAmigoSorteado;
    } else {
      //el amigo ya ha sido sorteado, sortea a otro amigo
      console.log("El amigo ya ha sido sorteado, sortea a otro amigo");
      return sortearAmigo();
    }
  }
}

function pintaAmigoSorteado(id, indice, textoAdicional) {
  //La lista de los amigos sorteados (amigosSorteados)
  let obtenAmigo = amigosSorteados[indice];
  let li = document.createElement("li");
  li.innerHTML = obtenAmigo == "" ? "(nada)" : textoAdicional + obtenAmigo;
  li.onclick = () => {
    console.log(`dentro. li = ${li}, li.innerHTML = ${li.innerHTML}`);
    quitaElementoAmigoSorteado(li);
  };

  let lista = document.getElementById(id);
  lista.appendChild(li);
}

function quitaElementoAmigoSorteado(li) {
  console.log(`li = ${li}, li.innerHTML = ${li.innerHTML}`);
  if (confirm(`¿${li.innerHTML.substring(2)}, desea borrarlo de la lista?`)) {
    console.log(`li.innerHTML = ${li.innerHTML}`);
    amigosSorteados = amigosSorteados.filter(
      (elAmigo) => elAmigo != li.innerHTML.substring(24) //**El amigo sorteado es:   son las primeras 24 posiciones antes del nombre
    );
    console.log(`El nuevo valor de amigosSorteados = ${amigosSorteados}`);
    li.parentNode.removeChild(li);
  }
}

function borrarListaConClick(lista) {
  //tiene que darle click a cada elemento de la lista para que lo quite
  let miLista = document.getElementById(lista).getElementsByTagName("li");
  for (var i = 0; i < miLista.length; i++) {
    miLista[i].onclick = function () {
      if (confirm("¿Borrar este lista?")) this.parentNode.removeChild(this);
    };
  }
}

function borrarLista(lista) {
  //borra todos los elementos <li> de la lista, sin necesidad de darle click a cada elemento
  let miLista = document.getElementById(lista).getElementsByTagName("li");
  for (var i = miLista.length - 1; i >= 0; i--) {
    miLista[i].parentNode.removeChild(miLista[i]); //otra forma, miLista[i].remove();
  }
}

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function asignarTextoElementoById(elemento, texto) {
  let elementoHTML = document.getElementById(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function asignarTextoElementoValueById(elemento, texto) {
  let elementoHTML = document.getElementById(elemento);
  elementoHTML.value = texto;
  return;
}

function reiniciar() {
  asignarTextoElemento("h4", ""); //mensaje para nombre no valido
  asignarTextoElementoById("mensaje-sorteado", ""); //mensaje para cuando ya no hay amigos para sortear
  asignarTextoElemento("p", ""); //limpia la lista de los amigos sorteados
  asignarTextoElementoValueById("amigo", ""); //mensaje donde se captura el nombre del amigo

  listadoAmigos = []; //limpia el listado de amigos registrados
  amigosSorteados = []; //limpia la lista de los amigos sorteados

  borrarLista("listaAmigos"); //tiene que darle click a cada elemento de la lista para que lo quite
  borrarLista("resultado"); //tiene que darle click a cada elemento de la lista para que lo quite
  console.log(
    `Valores.Iniciales. listadoAmigos = ${listadoAmigos}, amigosSorteados = ${amigosSorteados}`
  );
}
