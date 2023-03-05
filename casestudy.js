function Product(id, name, image, price){
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
}
function Cart(id, total){
    this.id = id;
    this.total = total;
    this.date = new Date();
    this.cartIems = [];
}
function CartItem(idProduct, quantity){
    this.idProduct = idProduct;
    this.quantity = quantity;
}

let products = []
function initData(){
    let p1 = new Product(1, "Nike Air Force 1","nkaf1.png", 10000000, 10);
    let p2 = new Product(2, "Nike Air Jordan 1","nkaj1.png", 10000000, 10);
    let p3 = new Product(3, "Nike Air Max TW","nkam.png", 30000000, 10);
    let p4 = new Product(4, "Nike Air Max TW 1","nkamtw1.png", 10000000, 10);
    let p5 = new Product(5, "Nike Blazer Mid","nkbm.png", 10000000, 10);
    let p6 = new Product(6, "Nike Court Vision","nkcv.png", 10000000, 10);
    products = [p1, p2, p3, p4, p5, p6];
}

function drawProduct2(){
    let strProducts = products.map((product)=>{
        return `
            <div class="product">
                <img src="${product.image}" alt=""><br>
                <td>${product.name}</td> <br>
                <span>${product.price} </span>
                <div class="middle">
                            <button type="button" onclick="handleAddToCart(${product.id})"  class="cart-btn"><i class="fa-sharp fa-solid fa-cart-plus"></i></button>
                    
                </div>
             </div>
        `
    });
    document.getElementById("tbProducts").innerHTML = strProducts.join("");
}

initData();
drawProduct2()


let cart = new Cart(1, 0);
function handleAddToCart(id){
    if(checkIdProductExistsInCart(id, cart) == false){
        let cartItem = new CartItem(id, 1);
        cart.cartIems.push(cartItem);
    }else{
        for(let i=0;i<cart.cartIems.length;i++){
            if(cart.cartIems[i].idProduct == id){
                cart.cartIems[i].quantity = cart.cartIems[i].quantity + 1;
            }
        }
    }
    drawCart();
    calculateTotal()
}
function drawCart(){
    let strProducts = cart.cartIems.map((cartItem)=>{

        let product = findProductById(cartItem.idProduct)
        return `
                <tr>
                <td class="productincart"> <img src="${product.image}" alt="">${product.name}</td>
                <td>${product.price}</td>
                <td><input type="number" value="${cartItem.quantity}" min="1"></td>
                <td><button onclick="handledeleteCartIteams(${product.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `
    });
    document.getElementById("tbCart").innerHTML = strProducts.join("");
}

function findProductById(id){
    let product = products.find((product)=>{
        if(id==product.id){
            return true;
        }
    })
    return product;
}
function checkIdProductExistsInCart(id, cart){
    let exists = false;
    for(let i=0;i<cart.cartIems.length;i++){
        if(cart.cartIems[i].idProduct==id){
            exists = true;
            break;
        }
    }
    return exists;
}
function handledeleteCartIteams(id){
    if(checkIdProductExistsInCart(id,cart)){
        for(let i=0;i<cart.cartIems.length;i++){
            if(cart.cartIems[i].idProduct == id){
                cart.cartIems.splice(i,1)
                
            }
        }
    } 
    drawCart()   
    calculateTotal()
}

function calculateTotal(){
    let total = 0
    for(let i=0;i<cart.cartIems.length;i++){
        let product = findProductById(cart.cartIems[i].idProduct)
        // if (!checkIdProductExistsInCart(product.id, cart)) {
            total += product.price * cart.cartIems[i].quantity
        // }
        console.log(product);
    }
    document.querySelector('.price-total>p').innerHTML = `Total: <span>${total} &#8363</span>`
    // return `<div class="price-total">
    // <p>Total: <span>${total} &#8363</span></p>
    // </div>`
}

