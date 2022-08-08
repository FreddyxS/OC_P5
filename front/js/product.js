const itemImg = document.getElementsByClassName("item__img")[0];
const title = document.getElementById("title");
const prix = document.getElementById("price");
const description = document.getElementById("description");
const couleur = document.getElementById("colors");

const ajoutHTML = produit => { // Fonction qui ajoute le code HTML
    itemImg.insertAdjacentHTML("afterbegin",`<img src="${produit.imageUrl}" alt="${produit.altTxt}">`)
    title.insertAdjacentHTML("afterbegin",`${produit.name}`)
    prix.insertAdjacentHTML("afterbegin",`${produit.price}`)
    description.insertAdjacentHTML("afterbegin",`${produit.description}`)
    for (let x in produit.colors) {
        couleur.insertAdjacentHTML("beforeend",`<option value="${produit.colors[x]}">${produit.colors[x]}</option>`)
    }
};

const href = window.location.href; // Récupère l'URL de la page chargé par le navigateur
const url = new URL(href);
const idProduit = url.searchParams.get("id"); // retourne le string de la propriété "id" de l'URL
const urlApi = `http://localhost:3000/api/products` + `/${idProduit}`; // Concatene l'id récupéré avec l'URL de l'API afin de ne charger qu'un seul produit

fetch(urlApi) 
    .then(Response => Response.json())
    .then(function (data) {
        ajoutHTML(data);
    });

const boutonAjoutPanier = document.getElementById("addToCart");

boutonAjoutPanier.onclick = function() {
    var quantite = document.getElementById("quantity").value;
    var couleurProduit = document.getElementById("colors").value;
    const produitPanier = {idProduit : idProduit , couleur : couleurProduit, quantite : quantite};
    const liste = [];
    if (localStorage.length == 0) {
        liste.push(produitPanier);
        const stringify = JSON.stringify(liste);
        localStorage.panier = stringify;
    } else {
        const parsed = JSON.parse(localStorage.panier);
        console.log(parsed);
        for (let i in parsed) {
            if (parsed[i].idProduit == produitPanier.idProduit && parsed[i].couleur == produitPanier.couleur) {
                const int = parseInt(parsed[i].quantite,10);
                const int2 = parseInt(quantite,10);
                parsed[i].quantite = int + int2; 
                const stringify = JSON.stringify(parsed);
                localStorage.panier = stringify;
                break;
            } else {
                parsed.push(produitPanier)
                const stringify = JSON.stringify(parsed);
                localStorage.panier = stringify;
            }
        }
    }
    console.log(localStorage);
}








