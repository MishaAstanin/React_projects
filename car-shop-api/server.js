const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test_drive_db',
    password: '100904misha',
    port: 5432
});

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/cars', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, brand, model, price FROM cars');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении данных' });
    }
});


app.get('/api/cars/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении данных' });
    }
});


app.get('/api/cars/tests/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('SELECT COUNT(*) FROM "test-drives" WHERE car_id=$1', [id]);
        res.status(200).json(result.rows[0].count);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении данных' });
    }
});


app.get('/api/cars/tests/users/:uid/:id', async (req, res) => {
    try {
        const uid = req.params.uid;

        if (!uid) {
            return res.status(401).json({
                message: 'Токен аутентификации отсутствует'
            });
        }

        const user = await pool.query('SELECT id, is_admin FROM clients WHERE uid=$1', [uid]);
        if (user.rows.length === 0) {
            return res.status(400).json({
                message: 'Пользователь не найден'
            });
        }

        const userId = user.rows[0].id;
        const id = req.params.id;
        const result = await pool.query('SELECT COUNT(*) FROM "test-drives" WHERE user_id=$1 AND car_id=$2', [userId, id]);
        res.status(200).json(result.rows[0].count);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении данных' });
    }
});


app.get('/api/profile/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;

        if (!uid) {
            return res.status(401).json({
                message: 'Токен аутентификации отсутствует'
            });
        }

        const user = await pool.query('SELECT id, is_admin FROM clients WHERE uid=$1', [uid]);
        if (user.rows.length === 0) {
            return res.status(400).json({
                message: 'Пользователь не найден'
            });
        }

        const userId = user.rows[0].id;
        const is_admin = user.rows[0].is_admin;

        if (!is_admin) {
            const result = await pool.query('SELECT * FROM "test-drives" WHERE user_id=$1', [userId]);
            return res.status(200).json(result.rows);
        }

        const result = await pool.query('SELECT * FROM "test-drives"');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении данных' });
    }
});


app.post('/api/register', async (req, res) => {
    try {
        const { email, uid, role, token } = req.body;

        if (!token) {
            return res.status(401).json({
                message: 'Токен аутентификации отсутствует'
            });
        }

        const user = await pool.query('SELECT id FROM clients WHERE uid=$1', [uid]);

        if (user.rows.length > 0) {
            return res.status(409).json({ message: 'Пользователь уже существует' });
        }

        const is_admin = role === 'admin'

        const newUser = await pool.query(
            'INSERT INTO clients (email, uid, is_admin) VALUES ($1, $2, $3) RETURNING *',
            [email, uid, is_admin]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    }
});


app.post('/api/new-test-drive', async (req, res) => {
    try {
        const { uid, carid, firstName, lastName, phone, email, date } = req.body;

        if (!uid) {
            return res.status(401).json({
                message: 'Токен аутентификации отсутствует'
            });
        }

        // function formatDate(date) {
        //     return new Intl.DateTimeFormat('ru-RU', {
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: 'numeric'
        //     }).format(date);
        // }
        // const date = formatDate(new Date());

        const user = await pool.query('SELECT id FROM clients WHERE uid=$1', [uid]);
        if (user.rows.length === 0) {
            return res.status(400).json({
                message: 'Пользователь не найден'
            });
        }
        const userId = user.rows[0].id;

        const newTest = await pool.query(
            'INSERT INTO "test-drives" (date, email, name, phone, surname, car_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [date, email, firstName, phone, lastName, carid, userId]
        );

        res.status(201).json(newTest.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании тест-драйва' });
    }
});


app.delete('/api/test-drives/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM "test-drives" WHERE id=$1', [id]);

        res.status(200).json({
            message: 'Тест-драйв успешно удален'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при удалении тест-драйва' });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});