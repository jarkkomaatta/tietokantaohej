import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";


const URL = "http://localhost:3001/"

function App() {

    // Tilamuuttujat
    const [products, setProducts] = useState([])
    const [prices, setPrices] = useState([])
    const [desc, setDesc] = useState([])

    // functio hakee tuotteet tietokannasta
    function GetProducts() {
            axios.get(URL + 'products')
            .then(resp => setProducts(resp.data))
            .catch(error => console.log(error.message))
    }
    // functio hakee tuotteiden hinnat tietokannasta
    function GetPrices() {
        axios.get(URL + 'price')
          .then(resp => {
            console.log(resp.data)
            setPrices(resp.data)
          })
          .catch(error => console.log(error.message))
      }
      // functio hakee kuvaukset tietokannasta
      function GetDescription() {
        axios.get(URL + 'description')
        .then(resp => setDesc(resp.data))
        .catch(error => console.log(error.message))

    }
    // functio lähettää kovakoodatut kategoriat tietokantaan
    function sendCategories() {
        const data = [
            {
                "categoryName": "Jääkiekko",
                "description": "Jääkiekko varusteita"
            },
            {
                "categoryName": "Koulu",
                "description": "Koulutarvikkeita"
            },
            {
                "categoryName": "Hedelmiä",
                "description": "Eksoottisia hedelmiä"
            }
        ]
        axios.post(URL + 'categories', data)
        .then(resp => console.log(resp.data))
        .catch(error => console.log(error.response.data))
    }



    return (
        <div>
            <button onClick={GetProducts}>Get products</button>
            <button onClick={GetPrices}>Get prices</button>
            <button onClick={GetDescription}>Get description</button>
            <button onClick={sendCategories}>send categoreis</button>
            <ul>
                {products.map(p => <li key={p.id}>{p.productName}</li>)}
            </ul>
            <ul>
                {prices.map(p => (
                    <li key={p.id}>
                        <strong>Product:</strong> {p.productName}, <strong>Price:</strong> {p.price}
                    </li>
                ))}
            </ul>
            <ul>
                {desc.map(p => (
                    <li key={p.id}>
                        <strong>Description:</strong> {p.categoryName}, <strong>Price:</strong> {p.description}
                    </li>
                ))}
            </ul>
        </div>
    );

}





export default App;