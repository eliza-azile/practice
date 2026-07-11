const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    setTimeout(next, 300);
});

server.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const db = router.db;
    const user = db.get('users').find({ email, password }).value();

    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            user: userWithoutPassword,
            token: 'fake-jwt-token-' + Date.now()
        });
    } else {
        res.status(401).json({ error: 'Неверный email или пароль' });
    }
});

server.post('/api/register', (req, res) => {
    const { email, password, name } = req.body;
    const db = router.db;

    const existing = db.get('users').find({ email }).value();
    if (existing) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name: name || email.split('@')[0],
        role: 'user'
    };

    db.get('users').push(newUser).write();

    const { password: _, ...userWithoutPassword } = newUser;
    res.json({
        user: userWithoutPassword,
        token: 'fake-jwt-token-' + Date.now()
    });
});

server.get('/api/products', (req, res) => {
    const db = router.db;
    const products = db.get('products').value();
    res.json(products);
});

server.get('/api/orders/:userId', (req, res) => {
    const db = router.db;
    const orders = db.get('orders').filter({ userId: req.params.userId }).value();
    res.json(orders);
});

server.post('/api/orders', (req, res) => {
    const { userId, products, total } = req.body;
    const db = router.db;

    const newOrder = {
        id: Date.now(),
        userId,
        products,
        total,
        status: 'Ожидает оплаты',
        date: new Date().toLocaleDateString('ru-RU')
    };

    db.get('orders').push(newOrder).write();
    res.status(201).json(newOrder);
});

server.use(router);
server.listen(3000, () => {
    console.log('API сервер запущен: http://localhost:3000');
    console.log('Доступные эндпоинты:');
    console.log('   POST /api/login');
    console.log('   POST /api/register');
    console.log('   GET  /api/products');
    console.log('   GET  /api/orders/:userId');
    console.log('   POST /api/orders');
});