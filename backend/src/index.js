const express = require("express");
const app = express();
const PORT = 3000;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore",
});

connection.connect();
app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";

  connection.query(query, [bookId], (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});
app.get("/orders", (req, res) => {
  const query = "SELECT * FROM orders";

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});
app.get("/orders/:id", (req, res) => {
    const orderId = req.params.id;
    // const query = "SELECT * FROM order_items WHERE order_id = ?";
    const query = `
    SELECT oi.*, b.title, b.author
    FROM order_items oi
    JOIN books b ON oi.book_id = b.id
    WHERE oi.order_id = ?
  `;
    connection.query(query, [orderId], (error, results, fields) => {
        if (error) throw error;

        res.json(results);
    });
});
// app.get("/orders/:id", (req, res) => {
//   const orderId = req.params.id;
//   const query = "SELECT * FROM orders WHERE id = ?";
//
//   connection.query(query, [orderId], (error, results, fields) => {
//     if (error) throw error;
//
//     res.json(results);
//   });
// });
app.post("/books", (req, res) => {

    const books = req.body;

    const query =
        "INSERT INTO books (title, author, price, description, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";

    let errorCount = 0;

    books.forEach(book => {
        const { title, author, price, description } = book;

        if (!title || !author || !price || !description) {
            errorCount++;
            console.error(`Missing required fields for book ${book.title}`);
            return;
        }

        connection.query(
            query,
            [title, author, price, description],
            (error, results, fields) => {
                if (error) {
                    errorCount++;
                    console.error(`Error adding book ${book.title}: ${error}`);
                }
            }
        );
    });

    if (errorCount > 0) {
        return res.status(400).json({ message: `Failed to add ${errorCount} books` });
    }

    res.json({ message: "All books added successfully." });
});


app.post("/orders", (req, res) => {
  const cart = req.body.cart;
  //   const userId = req.user.id; // authenticated user ID
  const userId = 1;
  let totalPrice = 0;
  let orderItems = [];


  cart.forEach((item) => {
    connection.query(
      "SELECT price FROM books WHERE id = ?",
      [item.bookId],
      (error, results) => {
        if (error) throw error;
        const price = results[0].price;
        totalPrice += price * item.quantity;
        orderItems.push({
          book_id: item.bookId,
          quantity: item.quantity,
          price: price,
        });


        if (orderItems.length === cart.length) {
          connection.beginTransaction((error) => {
            if (error) throw error;


            connection.query(
              "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
              [userId, totalPrice],
              (error, result) => {
                if (error) {
                  connection.rollback(() => {
                    throw error;
                  });
                }
                const orderId = result.insertId;

                orderItems.forEach((orderItem) => {
                  connection.query(
                    "INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)",
                    [
                      orderId,
                      orderItem.book_id,
                      orderItem.quantity,
                      orderItem.price,
                    ],
                    (error) => {
                      if (error) {
                        connection.rollback(() => {
                          throw error;
                        });
                      }
                    }
                  );
                });

                connection.commit((error) => {
                  if (error) {
                    connection.rollback(() => {
                      throw error;
                    });
                  }
                  res.status(201).json({
                    id: orderId,
                    user_id: userId,
                    total_price: totalPrice,
                    order_items: orderItems,
                  });
                });
              }
            );
          });
        }
      }
    );
  });
});

process.on("SIGINT", () => {
  connection.end();
  process.exit();
});
