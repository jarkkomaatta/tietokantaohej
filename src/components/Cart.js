import axios from "axios";
import { useEffect, useState } from "react";
import { shoppingCart } from "./signals/CartSignal";


export default function CartExample() {
    return (
        <div>
            <CartProductList />
        </div>
    )
}

// Function to calculate the total price of all products in the cart
const calculateTotal = () => {
    return shoppingCart.value.reduce((total, product) => {
        return total + product.count * product.price;
    }, 0);
};


// Adds/updates product into the cart
function updateProductCart(product, action) {
    const prodIndex = shoppingCart.value.findIndex(p => p.id === product.id);

    if (prodIndex !== -1) {
        if (action === 'add') {
            shoppingCart.value[prodIndex].count++;
        } else if (action === 'remove' && shoppingCart.value[prodIndex].count > 0) {
            shoppingCart.value[prodIndex].count--;
        }
    } else {
        shoppingCart.value = [...shoppingCart.value, { ...product, count: 1 }];
    }
    shoppingCart.value = [...shoppingCart.value];
}

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/products')
            .then((resp) => {
                setProducts(resp.data);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);



    return (
        <div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.productName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CartProductList() {
    return (
        <div>
            <h2>Ostoskorin sisältö</h2>
            <ul>
                {shoppingCart.value.map((product) => (
                    <li key={product.id}>
                        <b>{product.count + 'x '}</b>
                        {product.productName + ' '}
                        {product.price + '€' + '/kpl' + ' '}
                        <button onClick={() => updateProductCart(product, 'add')}>+</button>
                        <button onClick={() => updateProductCart(product, 'remove')}>-</button>
                    </li>
                ))}
            </ul>
            {/* Display the total price */}
            <p>Yhteensä: {calculateTotal().toFixed(2)}€</p>
            <button onClick={() => (shoppingCart.value = [])}>Tyhjennä ostoskori</button>
        </div>
    );
}