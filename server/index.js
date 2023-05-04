const http = require('http');
const morgan = require('morgan');
const mysql = require("mysql2/promise");
const cors = require("cors");
const express = require("express");
// const consumerrouter = require('./routes/consumer');

const config = require('config');


const hostname = config.get('app.hostname');
const port = config.get('app.port');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const consumerrouter = require('./routes/consumer');
app.use('/consumer', consumerrouter);

const farmerrouter = require('./routes/farmer');
app.use('/farmer', farmerrouter);


const server = http.createServer(app);
async function main(){
    db = await mysql.createConnection({
      host: config.get('db.host'),
      user: config.get('db.user'),
      password: config.get('db.password'),
      database: config.get('db.database'),
      timezone: config.get('db.timezone'),
      charset: config.get('db.charset')
    });
  
  }
  main();

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});