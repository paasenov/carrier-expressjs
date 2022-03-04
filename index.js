const express = require('express');
// const cors = require('cors');
const dbo = require('./db/connection');

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json());
app.use(require('./routes/addresses'));

// Global error handling
app.use(function (err, _req, res) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }

    // start the Express server
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});
