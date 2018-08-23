const express = require('express');
const sqlite3 = require( 'sqlite3' ).verbose();

const filename = 'database/database.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();

// get '/reservations-and-invoices/'
// TODO: add code here

router.get('/reservations-and-invoices', function (req, res) {
  var sql = 'select * from reservations join invoices on invoices.reservation_id = reservations.id';

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
  
  
  
  router.get('/invoices', function (req, res) {
    //var invoice_id = req.param("id");
    var sql = 'select paid, sum(total) from invoices where paid= 1';
    // where id= ${invoice_id} ';
    //SELECT surname, COUNT(*) FROM customers GROUP BY surname Calculate the total amount paid on invoices for the summer of 2017.
    db.all(sql, [], (err, rows) => {
  
      if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
      }
  
      console.log('Request succeeded, new data fetched', rows);
      res.status(200).json({
  
       invoices: rows
      });
    });
  });
  
  router.get('//reservations-per-customer/', function (req, res) {
    var sql = 'select * ;
  
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
    
    
 
// get `/reservations-per-customer/`
// TODO: add code here

// HOMEWORK
// get '/reservations/details-between/:from_day/:to_day'
// TODO: add for code here

// HOMEWORK
// get '/reservations-per-customer/'
// TODO: add code here

// HOMEWORK
// get `/stats-price-room/`
// TODO: add code here

// HOMEWORK
// get `/rooms/available-in/:from_day/:to_day`
// TODO: add code here

module.exports = router;
// get `/reservations-per-customer/`
  // TODO: add code here
  
  // HOMEWORK
  // get '/reservations/details-between/:from_day/:to_day'
  // TODO: add for code here
  
  // HOMEWORK
  // get '/reservations-per-customer/'
  // TODO: add code here
  
  // HOMEWORK
  // get `/stats-price-room/`
  // TODO: add code here
  
  // HOMEWORK
  // get `/rooms/available-in/:from_day/:to_day`
  // TODO: add code here;
  