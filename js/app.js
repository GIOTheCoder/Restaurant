class Menu {
    constructor(){
        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0,

        }

        //object to hold menu item data
        this.menuInventory = {
            item1: {
                id: 1, 
                img: './media/Las.jpg',
                alt: 'lasagna', 
                class: 'pasta-img',
                price: 25.00,
                qty: 0,
                name: 'Lasagna'
            },
            item2: {
                id: 2, 
                img: './media/Pizza.jpg',
                alt: 'pizza', 
                class: 'pasta-img',
                price: 20.50,
                qty: 0,
                name: 'Pizza - Any Topping'
            },
            item3: {
                id: 3, 
                img: './media/Spageti.jpg',
                alt: 'spaghetti',
                class: 'pasta-img',
                price: 17.00,
                qty: 0,
                name: 'Spaghetti'
            },
            item4: {
                id: 4, 
                img: './media/seafoodpasta.jpg',
                alt: 'seafood pasta',
                class: 'pasta-img',
                price: 27.00,
                qty: 0,
                name: 'Seafood Pasta'
            },
            item5: {
                id: 5, 
                img: './media/threecheesetortellini.jpg',
                alt: 'three cheese tortellini',
                class: 'pasta-img',
                price: 25.00,
                qty: 0,
                name: 'Three Cheese Tortellini'
            },
            item6: {
                id: 6, 
                img: './media/shrimpandgrits.jpg',
                alt: 'shrimp and grits',
                class: 'pasta-img',
                price: 23.00,
                qty: 0,
                name: 'Shrimp and Grits'
            },
            item7: {
                id: 7, 
                img: './media/chickentuscany.jpg',
                alt: 'chicken tuscany',
                class: 'pasta-img',
                price: 18.50,
                qty: 0,
                name: 'Chicken Tuscany'
            },
            item8: {
                id: 8, 
                img: './media/filetmignon.jpg',
                alt: 'filet mignon',
                class: 'pasta-img',
                price: 45.00,
                qty: 0,
                name: 'Filet Mignon'
            },
        }
    }

    init(){
        this.loadItems();
        this.addToCart();
        this.checkout();
    }

    loadItems (){
        let count = 0;
        let food1 = document.getElementById('food1');
        let food2 = document.getElementById('food2');

        for(const key in this.menuInventory){
            const item = this.menuInventory[key];
            const product = document.createElement('div');
            product.className = 'col-md-3 product';
            product.innerHTML = `
            <div class="card h-100">
                <img src="${item.img}" class="card-img-top ${item.class}" alt="${item.alt}">
                <div class="card-body">
                    <h3 class="${item.name}">${item.name}</h3>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p class ="price">$${item.price.toFixed(2)}</p>
                    <button class="btn btn-secondary add-button" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
            `;

            if(count < 4){
                food1.append(product);
            }else{
                food2.append(product);
            }
            count++;
        }
    }

    addToCart(){
        //set variables
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubtotal = document.getElementById('cartSubtotal');
        let itemCount = 0;
        let price = 0;

        for(const key in this.menuInventory){
            const item = this.menuInventory[key];

            //add event listener to each button on each menu item card

            buttons.forEach(button => {
                button.addEventListener('click', ()=>{
                    //if the id of the data attribute matches the item.id then do this below
                    if(button.dataset['id'] == item.id){
                        itemCount++;
                        price += item.price;
                        //store the changes item count and price into this.itemsInCart

                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subtotal = price;

                        item.qty++;
                        //send this updated data to the dom
                        cartItems.innerText = itemCount;
                        cartSubtotal.innerText = price.toFixed(2);
                    }
                })
            })
        }
    }
    checkout(){
        const table = document.getElementById('tbody');
        const checkout = document.getElementById('checkout');
        const checkoutPage = document.querySelector('.checkout-page')
        const mainPage = document.querySelector('.main-page');
        let subTimesQty = 0;
        const subtotal = document.getElementById('subtotal');
        const taxValue = document.getElementById('taxValue');
        const totalValue = document.getElementById('totalValue');
        let tax = 0;
        const shippingValue = document.getElementById('shippingValue');
        const checkoutItemCount = document.getElementById('checkoutItemCount')
        const shipping = 5;

        checkout.addEventListener('click', ()=> {
            if(mainPage.classList.contains('d-none')) return;
            //remove d-none from checkout and add d-none to main page
            checkoutPage.classList.remove('d-none');
            mainPage.classList.add('d-none');

            if(this.itemsInCart.itemCount == 1){
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
            } else {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount}items`;
            }

            for(const key in this.menuInventory){
                const item = this.menuInventory[key];

                //load content into checkout page
                subTimesQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2);
                tax = this.itemsInCart.subtotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subtotal + tax + shipping).toFixed(2);

                //if qty > 0 (item has been added to cart)
                if(item.qty > 0){
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';
                    tableRow.innerHTML += `
                    <td id="checkoutImg">
                        <img src = "${item.img}" alt="${item.alt}" class ="img-fluid checkout-img" id="checkoutImg" height="250" width="200">
                        <div class="product-desc">
                        <p class="item-name">${item.name}</p>
                        <p>Some Good Italian Food</p>
                        </div>
                    </td>
                    <td>
                    <p class ="unit-price"></p>${item.price.toFixed(2)}</p>
                    </td>
                    <td>
                        <div id ="itemQuantity">
                        <p id="qtyInput">${item.qty}</p>
                        </div>
                    </td>
                    <td id="itemSubtotal">${subTimesQty}</td>

                    
                    `
                    table.append(tableRow);
                }
            }
        })

    }
}

let action = new Menu();
action.init();