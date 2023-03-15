# Book-Store-Task
This is a simple book store website done with ExpressJs and Angular

  -To run the Express.js project, you will need to do the following:

    1-Install Node.js and npm on your machine, if not already installed.
    2-Navigate to the project directory in the terminal and run npm install to install all the project dependencies listed in package.json.
    3-Start the server by running npm start or npm start:dev (watch).
    and you need to create a database in mysql called "bookstore" and the following tables : users,books,orders,order-items. or just run the following sql statement :
   
   
   ```
             CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          );
             
             CREATE TABLE books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            description TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );

          CREATE TABLE orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            total_price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
          );

          CREATE TABLE order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            book_id INT NOT NULL,
            quantity INT NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (book_id) REFERENCES books(id)
          );
    ```
   
  -To run the Angular project, you will need to do the following:

    1-Install Node.js and npm on their machine, if not already installed.
    2-Navigate to the project directory in the terminal and run npm install to install all the project dependencies listed in package.json.
    3-Start the development server by running ng serve in the terminal.
    4-Navigate to http://localhost:4200 in a web browser to view the Angular app.


 -but before starting the website you need to add some books to the database so you can use it.
  using POSTMAN:
        please add the books with the following url:http://localhost:3000/books
        make sure the Content-Type : application/json in the headers
        go to body ,then raw ,in the postman and copy paste the following json array of books:

        [
          {
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald",
          "price": 10.99,    "description": "A story about the decadence and excess of the Roaring Twenties."
        },
          {
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "price": 12.99,
            "description": "A story about racial injustice in a small Southern town."
          },
          {
            "title": "1984",
            "author": "George Orwell",
            "price": 8.99,
            "description": "A dystopian novel about totalitarianism and censorship."
          }, {
          "title": "Pride and Prejudice",
          "author": "Jane Austen",
          "price": 9.99,
          "description": "A novel about love and marriage in 19th century England."
        },
          {
            "title": "The Catcher in the Rye",
            "author": "J.D. Salinger",
            "price": 11.99,
            "description": "A coming-of-age novel about a teenage boy in New York City."
          },
          {
            "title": "The Picture of Dorian Gray",
            "author": "Oscar Wilde",
            "price": 7.99,
            "description": "A novel about a man who remains youthful while a portrait of him ages."
          },
          {
            "title": "The Adventures of Huckleberry Finn",
            "author": "Mark Twain",
            "price": 10.99,
            "description": "A novel about a boy and a runaway slave on a journey down the Mississippi River."
          },
          {
            "title": "Frankenstein",
            "author": "Mary Shelley",
            "price": 8.99,
            "description": "A novel about a scientist who creates a monster."
          },
          {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "price": 12.99,
            "description": "A novel about a hobbit who goes on an adventure with dwarves."
          },
          {
            "title": "The Lord of the Rings",
            "author": "J.R.R. Tolkien",
            "price": 24.99,
            "description": "A trilogy of novels about a quest to destroy a powerful ring."
          },
          {
            "title": "The Hitchhiker's Guide to the Galaxy",
            "author": "Douglas Adams",
            "price": 9.99,
            "description": "A comedic science fiction novel about an accidental space traveler."
          },
          {
            "title": "The Hunger Games",
            "author": "Suzanne Collins",
            "price": 13.99,
            "description": "A novel about a dystopian society where teenagers are forced to fight to the death."
          }
        ]
