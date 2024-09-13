import { ajoutNewOrder, displayCorrectPrice} from "/order.js";


// fetching the json from the folder ( actually i dont if it will work once on github)
const reponse = await fetch("https://raw.githubusercontent.com/Demaxs26/frontend-mentor-product-list/main/data.json");
const data = await reponse.json();


const productGrid = document.getElementById("box-product-grid");
const paymentPlace = document.querySelector(".nav-empty");







//this loop use the fonction to genereta card for each product from the list 
for(let i = 0; i<data.length;i++){
    f_generer_box_produit(i);
}

// this function generate the cards of products
function f_generer_box_produit(i){
    const produit = data[i];
    const boxElement = `
    <div class = "box-product product-nb-${i}">
        <div class = "box-image-product">
            <img class ="image-product" src = ${produit.image.desktop} alt ="image ${produit.name}">
            <div class ="order-place">
                <div class ="order-buton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                    <p class = "add-text">Add to Cart</p>
                </div>
                <div class ="nb-order-switch-buton">
                    <div class="btn-remove-one up_and_down_btn"><svg class ="sign-down-svg"xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg></div>
                    <p class ="text-nb-command">1</p>
                    <div class="btn-add up_and_down_btn" ><svg class ="sign-up-svg"xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></div>
                </div>
            </div>
        </div>
        <p class ="litte-text-categorie"> ${produit.category}</p>
        <h3 class = "medium-text-name">${produit.name}</h3>
        <p class ="medium-text-price">$${displayCorrectPrice(produit.price)}</p>
    </div>
    `;
    productGrid.innerHTML += boxElement;
    
}

ajoutNewOrder();





