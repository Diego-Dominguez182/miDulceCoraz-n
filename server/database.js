import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database');
    createTables();
  }
});

function createTables() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user',
        cart TEXT DEFAULT '[]',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run("ALTER TABLE users ADD COLUMN cart TEXT DEFAULT '[]'", (err) => {
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        items TEXT,
        total REAL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        image TEXT,
        category TEXT,
        popular INTEGER DEFAULT 0
      )
    `);

    const adminPassword = bcrypt.hashSync('admin123', 8);
    db.run(`
      INSERT OR IGNORE INTO users (username, email, password, role)
      VALUES ('admin', 'admin@midulcecorazon.com', ?, 'admin')
    `, [adminPassword]);

    db.get("SELECT count(*) as count FROM products", (err, row) => {
      if (row.count === 0) {
        console.log("Seeding products...");
        const stmt = db.prepare("INSERT INTO products (name, description, price, image, category, popular) VALUES (?, ?, ?, ?, ?, ?)");
        
        const products = [
          ['Fresas con Crema Clásica', 'Fresas frescas con crema batida, leche condensada y granola', 85, '/images/fresasconcrema.jpg', 'fresas', 1],
          ['Fresas con Crema y Pay de Queso', 'Fresas con crema, trozos de pay de queso y chocolate', 95, '/images/fresasconcremapayqueso.jpg', 'fresas', 1],
          ['Fresas con Crema y Chocolate', 'Fresas frescas con crema, salsa de chocolate y nueces', 90, '/images/fresaschocolate.jpg', 'fresas', 0],
          ['Fresas con Crema y Galletas', 'Fresas con crema, galletas oreo trituradas y leche condensada', 90, '/images/fresasgalleta.jpg', 'fresas', 0],
          ['Fresas con Crema Premium', 'Fresas premium, crema batida artesanal, frutos rojos y miel', 110, '/images/fresaspremium.jpg', 'fresas', 1],
          ['Malteada de Fresa', 'Malteada cremosa de fresa con crema batida y fresas frescas', 75, '/images/malteadafresa.jpg', 'bebidas', 0],
          ['Helado de Fresa', 'Helado artesanal de fresa con fresas frescas y crema', 70, '/images/heladofresa.jpg', 'helados', 0],
          ['Hotcakes con Fresas', 'Hotcakes esponjosos con fresas, crema y miel de maple', 95, '/images/hotcakesfresas.jpeg', 'hotcakes', 1],
          ['Waffle con Fresas', 'Waffle crujiente con fresas, crema batida y sirope', 100, '/images/waffles.jpg', 'hotcakes', 0],
          ['Malteada de Chocolate', 'Malteada de chocolate con crema batida y chispas', 75, '/images/malteadachoco.jpg', 'bebidas', 0]
        ];

        products.forEach(prod => stmt.run(prod));
        stmt.finalize();
      }
    });
  });
}

export default db;