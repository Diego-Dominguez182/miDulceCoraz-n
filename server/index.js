import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './database.js';

const app = express();
const PORT = 3001;
const SECRET_KEY = 'mi_secreto_super_seguro'; 

app.use(cors());
app.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

function verifyAdmin(req, res, next) {
  db.get('SELECT role FROM users WHERE id = ?', [req.userId], (err, user) => {
    if (err) return res.status(500).json({ error: 'Error verificando permisos' });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Requiere permisos de administrador' });
    }
    next();
  });
}

app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.run(sql, [username, email, hashedPassword, 'user'], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar usuario. El email o usuario ya existe.' });
    }
    const token = jwt.sign({ id: this.lastID }, SECRET_KEY, { expiresIn: '24h' });
    res.status(201).json({ auth: true, token, user: { id: this.lastID, username, email, role: 'user' } });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ auth: false, token: null, error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
    res.status(200).json({ auth: true, token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  });
});

app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos' });
    const products = rows.map(p => ({...p, popular: !!p.popular}));
    res.json(products);
  });
});

app.post('/api/products', verifyToken, verifyAdmin, (req, res) => {
  const { name, description, price, image, category, popular } = req.body;
  const isPopular = popular ? 1 : 0;
  
  const sql = 'INSERT INTO products (name, description, price, image, category, popular) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(sql, [name, description, price, image, category, isPopular], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

app.put('/api/products/:id', verifyToken, verifyAdmin, (req, res) => {
  const { name, description, price, image, category, popular } = req.body;
  const isPopular = popular ? 1 : 0;
  const id = req.params.id;

  const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, popular = ? WHERE id = ?';
  db.run(sql, [name, description, price, image, category, isPopular, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto actualizado', id, ...req.body });
  });
});

app.delete('/api/products/:id', verifyToken, verifyAdmin, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM products WHERE id = ?', id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto eliminado' });
  });
});

// Crear pedido (Requiere Auth)
app.post('/api/orders', verifyToken, (req, res) => {
  const { items, total } = req.body;
  const userId = req.userId;

  console.log(`[ORDER] Recibido de Usuario ID ${userId}. Total: ${total}`, JSON.stringify(items));

  const sql = 'INSERT INTO orders (user_id, items, total) VALUES (?, ?, ?)';
  db.run(sql, [userId, JSON.stringify(items), total], function(err) {
    if (err) {
      console.error('[ORDER ERROR] DB Insert failed:', err.message);
      return res.status(500).json({ error: 'Error al crear el pedido: ' + err.message });
    }
    console.log('[ORDER SUCCESS] Pedido guardado ID:', this.lastID);
    res.status(201).json({ message: 'Pedido creado con éxito', orderId: this.lastID });
  });
});

app.get('/api/cart', verifyToken, (req, res) => {

  db.get('SELECT cart FROM users WHERE id = ?', [req.userId], (err, row) => {

    if (err) return res.status(500).json({ error: 'Error al obtener carrito' });

    if (!row) return res.status(404).json({ error: 'Usuario no encontrado' });

    let cart = [];

    try {

      cart = row.cart ? JSON.parse(row.cart) : [];

    } catch (e) {

      cart = [];

    }

    res.json(cart);

  });

});



app.put('/api/cart', verifyToken, (req, res) => {



  const { cart } = req.body;

  const cartString = JSON.stringify(cart || []);



  



  db.run('UPDATE users SET cart = ? WHERE id = ?', [cartString, req.userId], function(err) {



    if (err) return res.status(500).json({ error: 'Error al guardar carrito' });



    res.json({ message: 'Carrito guardado' });



  });



});

app.get('/api/orders/history', verifyToken, (req, res) => {



  db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.userId], (err, rows) => {



    if (err) return res.status(500).json({ error: 'Error al obtener historial' });



    res.json(rows);



  });



});







app.listen(PORT, () => {



  console.log(`Server running on http://localhost:${PORT}`);



});




