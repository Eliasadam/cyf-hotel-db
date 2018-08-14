const express = require('express');
const router = express.Router();

const filename = 'database/database.sqlite';
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(filename);
// db.run("PRAGMA foreign_keys = ON");

router.get('/customers', function (req, res) {
  var sql = 'select * from customers';

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      customers: rows
    });
  });
});



router.get('/customers/:id', function (req, res) {
  var customer_id = req.param("id");
  var sql = `select * from customers where id= ${customer_id}`;

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      customers: rows
    });
  });
  // res.send()
  // TODO: add code here
});


router.get('/customers/search/:surname', function (req, res) {
  var customers_surname = req.param("surname");

  var sql = `select * from customers where surname like '%${customers_surname}%';`

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      customers: rows
    });
  });
  // TODO: add code here
});


router.post('/customers/', function (req, res) {

  var sql = `INSERT INTO customers (title, first_name, surname, email) VALUES ('${req.body.title}', '${req.body.first_name}','${req.body.surname}','${req.body.email}');`

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      customers: req.body
    });
  });

  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }

  // TODO: add code here
});


router.put('/customers/:id', function (req, res) {

  var sql = `update customers set first_name = '${req.body.first_name}',
   surname = '${req.body.surname}', email = '${req.body.email}'  where id= '${req.params.id}';`
  db.run(sql, [], (err) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    res.status(200).json({

      customers: req.body
    });
  });
  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }

  // TODO: add code here
});

router.delete('/customers/delete/:id', function (req, res) {

  var sql = `delete from customers where id =?;`
  db.run(sql, [req.body.id], (err) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    res.status(200).json({

      customers: req.body
    });
  });
});



router.delete('/reservations/delete/:id', function (req, res) {

  var sql = `delete from reservations where id =?;`
  db.run(sql, [req.body.id], (err) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    res.status(200).json({

      reservations: req.body
    });
  });
});


router.get('/reservations', function (req, res) {
  var sql = 'select * from reservations';

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      reservations: rows
    });
  });
});
// get '/reservations'
// TODO: add code here

router.put('/reservations/:id', function (req, res) {

  var sql = `select * from reservations where id= ${req.param("id")}`;

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      reservations: rows
    });
  });
  // res.send()
  // TODO: add code here
});

// TODO: add code here


// delete '/reservations/:id'
// TODO: add code here


// 
// TODO: add code here





router.post('/reservations/', function (req, res) {

  var sql = `INSERT INTO reservations (customer_id, room_id, check_in_date, room_price)
   VALUES ('${req.body.customers_id}', '${req.body.room_id}','${req.body.check_in_date}','${req.body.room_price}');`

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      reservations: req.body
    });
  });

  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }

  // TODO: add code here
});

// post '/reservations'
// EXPECTED JSON Object:
// {
//   customer_id: 1,
//   room_id: 1,
//   check_in_date: '2018-01-20',
//   check_out_date: '2018-01-22',
//   room_price: 129.90
// }
// TODO: add code here
// get '/reservations/active-on/:date'
// TODO: add code here
router.get('/reservations/check_in_date/:check_out_date', function (req, res) {

  var sql = `select * from reservations where check_out_date=?`;

  db.all(sql, [req.params.check_out_date], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      reservations: rows
    });
  });

});

// get `/detailed-invoices'
// TODO: add code here


router.get(`/reservations/active-on/:chech_in_date`, function (req, res) {

  var sql = `select * from reservations where check_in_date = ${req.params.check_in_date}`;

  db.run(sql, [], (err, rows) => {

    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({

      reservations: rows
    });
  });

});
// TODO: add code here

module.exports = router;
