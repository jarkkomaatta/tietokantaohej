require('dotenv').config()
const axios = require('axios');


const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors');

const multer = require('multer');
const upload = multer({ dest: "uploads/" });

var express = require('express');

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

const URL = 'http://localhost:3001/'

// Määritellään reitti
app.get('/products', async (req,res) => {
    
    try {
        // Luodaan tietokantayhteys
        const connection = await mysql.createConnection(conf)

        // Otetaan parametri category talteen
        const category = req.query.category

        let result       

        // Tarkistetaan onko categorya URL osoitteessa
        if(category){
            // Kysely tuotteista määritetyllä categoryllä
            result = await connection.execute("SELECT product_name productName, price, category  FROM product WHERE category=?", [category])
        }else{
            // Jos ei määritetty categoryä, niin näytetään kaikki categoriat
            result = await connection.execute("SELECT product_name productName, price, category  FROM product")
        }
        
        // Lähetetään tulos JSON-muodossa
        res.json(result[0])

    } catch (err) {
        // Virheviesti
        res.status(500).json({ error: err.message })
    }
})

// Määritellään reitti
app.get('/price', async (req, res) => {
    try {
        // Luodaan tietokantayhteys
        const connection = await mysql.createConnection(conf)

        // Otetaan parametri price talteen
        const price = req.query.price;

        let result;

        // if lauseke tarkistaa onko URL:iin syötetty price
        if (price) {
            // Kysely tuotteista jotka ovat suurempia hinnalta kuin URL:iin asetettu hinta
            result = await connection.execute("SELECT product_name productName, price FROM product WHERE price > ?", [price])
        } else {
            // Kysely kaikista tuotteista jos URL:iin ei ole asetettu hintaa
            result = await connection.execute("SELECT product_name productName, price FROM product")
        }

        // Lähetetään tulos JSON-muodossa
        res.json(result[0])

    } catch (err) {
        // Virheviesti
        res.status(500).json({ error: error.message })
    }
});


app.get('/description' , async (req,res) => {
    try {
        // Luodaan tietokantayhteys
        const connection = await mysql.createConnection(conf)

        // Otetaan parametri category talteen
        const category = req.query.category

        let result

        // Tarkistetaan onko categoria määritelty
        if(category){
            // jos categoria on määritelty tehdään kysely
            result = await connection.execute("SELECT category_name categoryName, category_description description FROM product_category WHERE category_name=?", [category])
        }else{
            // jos ei ole määritelty tehdään kysely
            result = await connection.execute("SELECT category_name categoryName, category_description description FROM product_category")
        }

        // Lähetetään tulos JSON-muodossa
        res.json(result[0])

    } catch (error) {
        // Virheviesti
        res.status(500).json({ error: error.message })
    }
})

// reitti
app.post('/games', (req, resp) => {
    // Haetaan bodystä pelitiedot, pelit tallennettu 'pelit.json' tiedostoon, josta pelit kopioitu Postmaniin
    const games = req.body;

    // Käydään läpi pelit for avulla
    for (g of games) {
        // Tulostetaan Nimi, Kehittäjä ja Julkaisu pvm
        console.log(`
        Nimi: ${g.title}
        Kehittäjä: ${g.developer}
        Julkaistu: ${g.release_date}
        -----------------------------
    `)
   }
    
   // Suljetaan yhteys
    resp.end();
});


app.post('/categories', async (req, res) => {
    // taulu postmaniin, myös fronendissä napit toimintoon ja taulut kovakoodattu frontendiin
    /* ------------ 
 [
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
---------------*/

    // Luodaan tietokantayhteys
    const connection = await mysql.createConnection(conf)

    try {
        // Aloittaa tietokantasiirron
        connection.beginTransaction()
        // kategorioista taulukko
        const categories = req.body
        
        // käy läpi kategoria/kategoriat ja lisää ne SQL komennolla tauluun
        for (const category of categories) {
            await connection.execute("INSERT INTO product_category VALUES (?,?)",[category.categoryName, category.description])
        }
    
        // vahvistaa tietokantasiirron
        connection.commit();
        // onnistui viesti
        res.status(200).send("Categories added")

    } catch (err) {
        // jos virhe, peruuttaa tietokantasiirron
        connection.rollback()
        // virheviesti
        res.status(500).json({ error: err.message })
    }

    // suljetaan tietokantayhteys
    connection.end()
})

app.post('/products', async (req, res) => {
    /*--------taulu postmaniin
    [
  {
    "product_name": "Jääkiekko",
    "price": 199.99,
    "category": "Joululahjapaperit",
    "image_url": "image1.jpg"
  },
  {
    "product_name": "Koulu",
    "price": 299.99,
    "category": "Koristenauhat",
    "image_url": "image2.jpg"
  }
]
---------*/
    // Luodaan tietokantayhteys
    const connection = await mysql.createConnection(conf)

    try {
        // Aloittaa tietokantasiirron
        connection.beginTransaction()

        // tuotteista taulukko
        const products = req.body

        for (const product of products) {
            // Lisää tuote/tuotteet ja lisää ne SQL komennolla tauluun. Kategorian oltava olemassa oleva kategoria product_category taulusta
            await connection.execute(
                'INSERT INTO product (product_name, price, category, image_url) VALUES (?, ?, ?, ?)',
                [product.product_name, product.price, product.category, product.image_url || null]
            );
        }

        // vahvistaa tietokantasiirron
        connection.commit()
        // onnistui viesti
        res.status(200).send('Products added')
    } catch (err) {
        // jos virhe, peruuttaa tietokantasiirron
        connection.rollback()
        // virheviesti
        res.status(500).json({ error: err.message })
    }
        
    // suljetaan tietokantayhteys
    connection.end()
})
