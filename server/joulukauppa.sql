DROP TABLE IF EXISTS order_line;

DROP TABLE IF EXISTS customer_order;

DROP TABLE IF EXISTS customer;

DROP TABLE IF EXISTS product;

DROP TABLE IF EXISTS product_category;

CREATE TABLE
    product_category(
        category_name VARCHAR(255) NOT NULL PRIMARY KEY,
        category_description VARCHAR(500)
    );

CREATE TABLE
    product(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        product_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2),
        image_url VARCHAR(255),
        category VARCHAR(255),
        FOREIGN KEY (category) REFERENCES product_category(category_name)
    );

CREATE TABLE
    customer(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        username VARCHAR(255) UNIQUE,
        pw VARCHAR(255)
    );

CREATE TABLE
    customer_order(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        order_date DATETIME NOT NULL,
        customer_id INT,
        FOREIGN KEY (customer_id) REFERENCES customer(id)
    );

CREATE TABLE
    order_line(
        order_id INT,
        product_id INT,
        quantity INT,
        PRIMARY KEY (order_id, product_id),
        FOREIGN KEY (order_id) REFERENCES customer_order(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
    );

INSERT INTO product_category
VALUES (
        'Joululahjapaperit',
        'Kääräise lahjasi kauniiseen paperiin!'
    ), (
        'Koristenauhat',
        'Koristele pakettisi korealla nauhalla!'
    ), (
        'Joulukortit',
        'Kruunaa paketti kortilla!'
    );

INSERT INTO
    product (product_name, price, image_url, category)
VALUES (
        'Karkit ja kukat',
        2.99, 'images/joululahjapaperit/karkit_ja_kukat.png',
        'Joululahjapaperit'
    ), (
        'Kukat',
        2.50, 'images/joululahjapaperit/kukat.jpg',
        'Joululahjapaperit'
    ), (
        'Kuuset ja pipot',
        3.50, 'images/joululahjapaperit/kuuset_ja_pipot.jpg',
        'Joululahjapaperit'
    ), (
        'Oranssit paketit',
        2.99, 'images/joululahjapaperit/oranssit_paketit.jpg',
        'Joululahjapaperit'
    ), (
        'Violetit tähdet',
        1.99, 'images/joululahjapaperit/violetit_tahdet.jpg',
        'Joululahjapaperit'
    ), (
        'Glitternauha, 3m',
        6.99, 'images/koristenauhat/glitternauha.jpg',
        'Koristenauhat'
    ), (
        'Silkkinauha, 4m',
        4.99, 'images/koristenauhat/silkkinauha.jpg',
        'Koristenauhat'
    ), (
        'Villalanka, 10m',
        2.99, 'images/koristenauhat/villalanka.jpg',
        'Koristenauhat'
    ), (
        'Stay warm, 5kpl',
        2.99, 'images/joulukortit/stay_warm.png',
        'Joulukortit'
    ), (
        'Talo ja puu, 5kpl',
        2.99, 'images/joulukortit/talo_ja_puu.png',
        'Joulukortit'
    ), (
        'Talvimaisema, 5kpl',
        2.99, 'images/joulukortit/talvimaisema.jpg',
        'Joulukortit'
    );