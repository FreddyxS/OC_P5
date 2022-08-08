const items = document.getElementById("items"); 
const ajoutHTML = products => { // Fonction qui ajoute le code HTML
    items.insertAdjacentHTML("afterbegin",`<a href="./product.html?id=${products._id}"><article><img src="${products.imageUrl}" alt="${products.altTxt}"><h3 class="productName">${products.name}</h3><p class="productDescription">${products.description}</p></article></a>`)
};

const url = "http://localhost:3000/api/products"; // Fonction qui récupère les données de l'API et appelle dans une boucle la fonction d'ajout de code HTML
fetch(url)
    .then(Response => Response.json())
    .then(function (productList) {
        for (let product of productList) {
            ajoutHTML(product);
            console.log(product);   
        }
    });