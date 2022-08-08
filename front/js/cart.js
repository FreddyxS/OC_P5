const items = document.getElementById("cart__items");
let parsed = JSON.parse(localStorage.panier);
for (let i in parsed) {
    let idProduit = parsed[i].idProduit;
    let couleurProduit = parsed[i].couleur;
    let quantiteProduit = parsed[i].quantite;
    let urlApi = `http://localhost:3000/api/products` + `/${idProduit}`;

    fetch(urlApi) 
    .then(Response => Response.json())
    .then(function (data) {
        ajoutHTML(data);
    });

    const ajoutHTML = function(data) {
        items.insertAdjacentHTML("afterbegin",`<article class="cart__item" data-id="${idProduit}" data-color="${couleurProduit}">
        <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${couleurProduit}</p>
            <p>${data.price}</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantiteProduit}" onchange='changementQuantite("${i}","${idProduit}")'>
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick='suppressionProduit("${idProduit}")'>Supprimer</p>
            </div>
        </div>
        </div>
    </article>`)
    }
};



function suppressionProduit(id) {
    for (let i in parsed) {
        if (id == parsed[i].idProduit) {           
            parsed.splice(i,1);
            localStorage.clear();
            localStorage.panier = JSON.stringify(parsed);
            location.reload();
        } else {
            console.log("error");
        }
    }    
}

function changementQuantite(j,id) {
    let listequantite = document.getElementsByName("itemQuantity");
    let liste = [];
    for (k in listequantite) {
        liste.push(listequantite[k].value);
    }
    for (l in liste) {
        if ( liste[l] === undefined) {
            liste.splice(l);
        }
    }
    liste.reverse();
    let input = liste[j];
    for (let i in parsed) {
        console.log(parsed[i]);
        if (id == parsed[i].idProduit) {
            parsed[i].quantite = input;
            localStorage.clear();
            localStorage.panier = JSON.stringify(parsed);
        } 
    }
}

const commander = document.getElementById("order");
commander.onclick = function commander() {
    event.preventDefault();
    let nom = document.getElementById("firstName").value;
    let prenom = document.getElementById("lastName").value;
    let adresse = document.getElementById("address").value;
    let ville = document.getElementById("city").value;
    let mail = document.getElementById("email").value;
    let regName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/; 
    let regAddress = /^[a-zA-Z0-9\s,'-]*$/;
    let regVille = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (regName.test(nom) != true) {
       return alert("nom invalide");
    }

    if (regName.test(prenom) != true) {
        return alert("nom invalide");
    }

    if (regAddress.test(adresse) != true) {
        return alert("adresse invalide");
    }

    if (regVille.test(ville) != true) {
        return alert("ville invalide");
    }

    if (regMail.test(mail) != true) {
        return alert("mail invalide");
    }

    let contact = {firstName:nom, lastName:prenom, address:adresse, city:ville, email:mail};
    let produits = [];
    let commande = [];
    for (i in parsed) {
        produits.push(parsed[i].idProduit);
    }

    console.log(contact);
    console.log(produits);
    commande.push(contact);
    commande.push(produits);
    console.log(commande);

    fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({"contact":contact,"products":produits}),
    })
    .then((response) => response.json())
    .then((final) => {
    console.log(final.orderId);
    window.location.replace(`./confirmation.html`+`?order=${final.orderId}`);
    })
    .catch(error => console.log(error))

};

    
