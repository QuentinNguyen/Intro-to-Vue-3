app.component('product-display', {
    props: {
        premium: {
            type: Boolean, required: true,
        }
    }, template: /*html*/
        ` <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img
                        :class="{ 'out-of-stock-img': !inStock }"
                        v-bind:src="image">
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p>{{description}}</p>
                <a :href="url">Made by Vue Mastery</a>
                <!--  <p v-show="inStock">In Stock</p> -->
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out</p>
                <p v-else>Out of Stock</p>
                <p v-if="onSale">{{onSaleDisplay}}</p>
                
                <p>Shipping: {{shipping}}</p>
                
                <product-details :details="details"></product-details>
                
                <div
                        v-for="(variant, index) in variants"
                        :key="variant.id"
                        @mouseover="updateVariant(index)"
                        class="color-circle"
                        :style="{backgroundColor: variant.color}">
                </div>
                <ul>
                    <li v-for="size in sizes">{{size}}</li>
                </ul>

                <button
                        class="button"
                        :class="{disabledButton: !inStock}"
                        :disabled="!inStock"
                        @click="addToCart">Add to Cart
                </button>
            </div>
        </div>`,

    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'This is an amazing warm socks for winter !',
            selectedVariant: 0,
            url: 'https://www.vuemastery.com/',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [{
                id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, onSale: true
            }, {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, onSale: false},],
            sizes: ['S', 'M', 'L', 'XL'],
        }
    },

    methods: {
        addToCart() {
            this.cart += 1
        }, updateVariant(index) {
            this.selectedVariant = index;
        },
    }, computed: {
        title() {
            return this.brand + ' ' + this.product
        }, image() {
            return this.variants[this.selectedVariant].image
        }, inStock() {
            return this.variants[this.selectedVariant].quantity
        }, onSale() {
            return this.variants[this.selectedVariant].onSale
        }, onSaleDisplay() {
            return this.brand + ' ' + this.product + ' is on sale !'
        }, shipping() {
            if (this.premium) {
                return 'Free'
            }

            return 2.99
        }
    }

})