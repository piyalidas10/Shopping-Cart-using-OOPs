<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Oops Concept</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        .checked {
          color: orange;
        }
        .cart {
            background: #eee;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
<h2 class="text-center">JavaScript Oops Concept</h2>
<script>
    class createDiv {
        constructor() {
        }
        createDOMElement(tag, className, attributes) {
            const rootElem = document.createElement(tag);
            if (className) {
                rootElem.className = className;
            }
            if (attributes && attributes.length > 0) {
                for (const attr of attributes) {
                    rootElem.setAttribute(attr.name, attr.value);
                }
            }
            return rootElem;
        }
    }

    class Product {
        constructor(Id, Maker, img, Url, Title, Description, Price, Ratings) {
            this.Id = Id;
            this.Maker = Maker;
            this.img = img;
            this.Url = Url;
            this.Title = Title;
            this.Description = Description;
            this.Price = Price;
            this.Ratings = Ratings;
        }
    }

    class Cart extends createDiv{
        items = [];

        set cartItems(value) {
            this.items = value;
            this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`;
        }
        get totalAmount() {
            const sum = this.items.reduce((preValue, curItem) => {
                    console.log(preValue, curItem);
                    return preValue + curItem.Price;
            }, 0);
            console.log('sum => ', sum);
            return sum;
        }

        addToProduct(product) {
            const updatedItems = [...this.items];
            updatedItems.push(product);
            this.cartItems = updatedItems;
        }
        render() {
            const cartDiv = this.createDOMElement('div', 'cart', []);
            cartDiv.innerHTML = `
                <h2>Price : \$${0} </h2>
            `;
            cartDiv.className = 'col cart';
            this.totalOutput = cartDiv.querySelector('h2');
            return cartDiv;
        }
    }

    class ProductItem extends createDiv{
        constructor(product) {
            super();
            this.product = product;
        }
        addToCart() {
            console.log(this.product);
            App.addProductToCart(this.product);
        }
        render() {
            let productDiv = this.createDOMElement('div', 'col-lg-3 col-md-4 col-sm-6 col', []);
            const totalRating = this.product.Ratings[1];
            const customerRating = this.product.Ratings[0];
            productDiv.innerHTML += `
                    <img class="img-thumbnail" src="${this.product.img}" atl="${this.product.Id}"/>
                    <h4>${this.product.Title}</h4>
                    <h5>${this.product.Price}</h5>
                    <span>${this.product.Description}</span>`;
            const ratingDiv = this.createDOMElement('div', 'col', []);
                        for (let i = 1; i<= totalRating; i++) {
                            if (i <= customerRating) {
                                ratingDiv.innerHTML += `<span class="fa fa-star checked"></span>`;
                            } else {
                                ratingDiv.innerHTML += `<span class="fa fa-star"></span>`;
                            }
                        }
            productDiv.innerHTML += '<div>' + ratingDiv.innerHTML + '</div>';
            productDiv.innerHTML += `<button class="btn btn-primary" (click)="addToCart(this.product)">Add to Cart</button>`;
            return productDiv;
        }
    }

    class ProductList extends createDiv{
        products = [
            new Product(
                "jenlooper-cactus",
                "@jenlooper",
                "https://user-images.githubusercontent.com/41929050/61567048-13938600-aa33-11e9-9cfd-712191013192.jpeg",
                "https://www.hackster.io/agent-hawking-1/the-quantified-cactus-an-easy-plant-soil-moisture-sensor-e65393",
                "The Quantified Cactus: An Easy Plant Soil Moisture Sensor",
                "This project is a good learning project to get comfortable with soldering and programming an Arduino.",
                100,
                [5,5]
            ),
            new Product(
                "jenlooper-light",
                "jenlooper",
                "https://user-images.githubusercontent.com/41929050/61567049-13938600-aa33-11e9-9c69-a4184bf8e524.jpeg",
                "https://www.hackster.io/agent-hawking-1/book-light-dee7e4",
                "A beautiful switch-on book light",
                "Use craft items you have around the house, plus two LEDs and a LilyPad battery holder, to create a useful book light for reading in the dark.",
                200,
                [3,5]
            ),
            new Product(
                "vogueandcode-pretty-girls-code-tee",
                "vogueandcode",
                "https://user-images.githubusercontent.com/41929050/61567062-14c4b300-aa33-11e9-9dcd-8bfed4ece810.png",
                "https://www.vogueandcode.com/shop/pretty-girls-code-tee",
                "Pretty Girls Code Tee",
                "Everyone\u2019s favorite design is finally here on a tee! The Pretty Girls Code crew-neck tee is available in a soft pink with red writing.",
                150,
                [2,5]
            )
        ];

        constructor() {
            super();
        }

        render() {
            const productContainer = this.createDOMElement('div', 'row productContainer', [{name: 'id', value: 'products'}]);
            for (const product of this.products) {
                const productItem = new ProductItem(product);
                const productDiv = productItem.render();
                productContainer.append(productDiv);
            }
            return productContainer;
        }
    }

    class Shopping extends createDiv {
        constructor() {
            super();
        }
        render() {
            this.cart = new Cart();
            const cartDiv = this.cart.render();
            const productList = new ProductList();
            const productContainer = productList.render();
            const container = this.createDOMElement('div', 'container', []);
            const cartConatiner = this.createDOMElement('div', 'row cartConatiner', []);
            cartConatiner.append(cartDiv);
            container.append(cartConatiner);
            container.append(productContainer);
            document.body.append(container);
        }
    }

    class App{
        static cart;
        static init() {
            const shopping = new Shopping();
            shopping.render();
            this.cart = shopping.cart; // get the value of this.cart from Shopping class
            console.log(this.cart);
        }

        static addProductToCart(product) {
            this.cart.addToProduct(product);
        }
    }

    App.init();

</script>
</body>
</html> 
