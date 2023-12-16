import React, { useState } from 'react';
import axios from 'axios';

const URL = "http://localhost:3001/"

const Yllapito = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  // Tuotteiden lisäys
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  const AddCategory = () => {
    // Luo uusi kategoria-objekti
    const newCategory = {
      categoryName,
      description: categoryDescription,
    };

    // Päivitä kategoriat taulukkoon
    setCategories([...categories, newCategory]);

    // Tyhjennä input-kentät
    setCategoryName('');
    setCategoryDescription('');
  };

  // Tuote-objekti
  const AddProduct = () => {
    const newProduct = {
      productName,
      price,
      category,
    }

    // Päivitetään tuotteet taulukkoon
    setProducts([...products, newProduct])

    //Tyhjennetään input-kentät
    setProductName('');
    setPrice('');

  }

  const SaveCategories = async () => {
    try {
      // Tee HTTP-pyyntö tietokantaan kategorioiden lisäämiseksi
      const response = await axios.post(URL + 'categories', categories);

      // Käsittele vastaus tarvittaessa
      console.log('Kategoriat lisätty onnistuneesti', response.data);

      // Tyhjennä kategoriat
      setCategories([]);
    } catch (error) {
      console.error('Virhe kategorioiden lisäämisessä', error);
      console.log(error.response.data);
    }
  };

  const SaveProduct = async () => {
    try {
      // Käy läpi jokainen tuote ja tee HTTP-pyyntö tietokantaan tuotteen lisäämiseksi
      const formattedProducts = products.map(product => {
        // Aseta imageUrl nulliksi, jos sitä ei ole erikseen määritelty
        const formattedProduct = {
          ...product,
          imageUrl: product.imageUrl || null
        };
        return formattedProduct;
      });
  
      const response = await axios.post(URL + 'products', formattedProducts);
  
      // Käsittele vastaus
      console.log('Tuotteet lisätty onnistuneesti', response.data);
  
      // Tyhjennä tuotteet
      setProducts([]);
    } catch (error) {
      console.error('Virhe tuotteiden lisäämisessä', error);
      console.log(error.response.data);
    }
  };
  

  return (
    <div>
      <div>
        <h2>Lisää tuoteryhmä</h2>
        <input
          type="text"
          placeholder="Tuoteryhmän nimi"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tuoteryhmän kuvaus"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
        <button onClick={AddCategory}>Lisää tuoteryhmä</button>
        <button onClick={SaveCategories}>Tallenna kategoriat</button>
      </div>
      <h2>Lisää tuote</h2>
        <input 
          type="text"
          placeholder="Lisää tuote"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          />
          <input 
          type="text"
          placeholder="Lisää hinta"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="category">Valitse Tuotteen kategoria</label>
          <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Joululahjapaperit">Joululahjapaperit</option>
            <option value="Joulukortit">Joulukortit</option>
            <option value="Koristenauhat">Koristenauhat</option>
          </select>
          <button onClick={AddProduct}>Lisää tuoteryhmä</button>
          <button onClick={SaveProduct}>Tallenna kategoriat</button>
    </div>
  );
};

export default Yllapito;