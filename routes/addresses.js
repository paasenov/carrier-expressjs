const express = require('express');

// The router will be added as a middleware and will take control of requests starting with path /addresses.
const routes = express.Router();

// Connect to the database
const dbo = require('../db/connection');

// This section will help us list of all the addresses.
routes.route('/addresses').get(async function (_req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('addresses')
        .find({})
        // .limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching addresses!');
            } else {
                console.log(result);
                res.json(result.map(r => r.address));
            }
        });
});

// This section will help us create a new address record.
routes.route('/addresses').post(function (req, res) {
    const dbConnect = dbo.getDb();
    const record = {
      address: req.body.address,
    };
    console.log(record);

    dbConnect
        .collection('addresses')
        .insertOne(record, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting address!');
            } else {
                console.log(`Added a new address with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
});

module.exports = routes;
