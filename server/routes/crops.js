const express = require('express');
const cropsrouter = express.Router();
const mysql = require('mysql2/promise');
const config = require('config');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: config.get('db.host'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.database'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Get all crops
cropsrouter.get('/', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM crops');
        conn.release();
        // res.json(rows[0]);
        let data = res.json(rows[0]);
        console.log(data);
        // res.render('shop', { data: data });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Get a single crop by ID
cropsrouter.get('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM crops WHERE crop_id = ?', [req.params.id]);
        conn.release();
        if (rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Create a new crop
cropsrouter.post('/', async (req, res) => {
    const { crop_name, crop_description, crop_price, farmer_id } = req.body;
    try {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('INSERT INTO crops (crop_name, crop_description, crop_price, farmer_id) VALUES (?, ?, ?, ?)', [crop_name, crop_description, crop_price, farmer_id]);
        conn.release();
        res.status(201).json({
            crop_id: result.insertId,
            crop_name,
            crop_description,
            crop_price,
            farmer_id
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Update an existing crop
cropsrouter.put('/:id', async (req, res) => {
    const { crop_name, crop_description, crop_price, farmer_id } = req.body;
    try {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('UPDATE crops SET crop_name = ?, crop_description = ?, crop_price = ?, farmer_id = ? WHERE crop_id = ?', [crop_name, crop_description, crop_price, farmer_id, req.params.id]);
        conn.release();
        if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Delete a crop
cropsrouter.delete('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('DELETE FROM crops WHERE crop_id = ?', [req.params.id]);
        conn.release();
        if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = cropsrouter;
