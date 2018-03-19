const connection = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : ' ',
        database : 'CRUDBook'
    },
    useNullAsDefault: true
});

module.exports = connection;