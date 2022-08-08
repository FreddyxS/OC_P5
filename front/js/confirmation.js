const href = window.location.href; 
const url = new URL(href);
const orderId = url.searchParams.get("order");
const order = document.getElementById("orderId");

order.insertAdjacentHTML("afterbegin",`${orderId}`);