const fs = require('fs');
const dbConfig  = require('../db.json')

const schemaFile = './database/mysql_schema.sql'; 

fs.lstat(schemaFile, (err, stats) => {

    if (err) {
        return console.log(err)
    }
    if (!stats.isFile()) {
        return console.log('schema file not exists, run "npm run generate-schema"')
    }
    

    let schema = fs.readFileSync(schemaFile, 'utf8');
    
    if (dbConfig.options.db === 'postgress') {

        const pgSchemaFile = './database/pg_schema.sql'; 
        const { Client } = require('pg')
        const client = new Client(dbConfig.connection)

        // for postgres 
        // schema = schema.replace(/`/g, '\'');
        schema = schema.replace(/`/g, '');
        schema = schema.replace(/\) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;/g, ');');
        schema = schema.replace(/COMMENT \'.*\'/g, '');
        schema = schema.replace(/(.*ENUM\(.*\) )DEFAULT NULL(.*)/g, '$1$2');
        schema = schema.replace(/MEDIUMBLOB/g, 'BYTEA');
        schema = schema.replace(/--.*/g, '');
        schema = schema.replace(/\/\*.*\*\//g, '');
        schema = schema.replace(/^\s*[\r\n]/gm, '');
        schema = schema.replace(/DATETIME/g, 'TIMESTAMP');
        schema = schema.replace(/TINYINT\(1\)/g, 'BOOLEAN');
        schema = schema.replace(/id BIGINT.*/g, 'id SERIAL PRIMARY KEY,');
        schema = schema.replace(/(\w*)(Id BIGINT.*?),/gm, '$1$2 REFERENCES '+dbConfig.options.table_prefix+'$1(id),');
        schema = schema.replace(/(CREATE TABLE IF NOT EXISTS )(.*)( \()/g, '$1'+dbConfig.options.table_prefix+'$2$3');

        // schema = schema.replace(/(^.*ENUM\()(.*)(\).*$\n)(.*|\s*\)?;)/gm, '$4\nCREATE TYPE petStatus AS ENUM \($2\)');
        // todo enum
        // CREATE TYPE petStatus AS ENUM ('available', 'pending', 'sold');
        // CREATE TYPE orderStatus AS ENUM ('placed', 'approved', 'delivered');
    
        fs.writeFile(pgSchemaFile, schema, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 

        // don't work atm.

        // client.connect()
        // client.query(schema, [], (err, res) => {
        //   console.log(err ? err.stack : 'success!')
        //   client.end()
        // });
    }


    if (dbConfig.options.db === 'mysql') {

        const mysql = require('mysql');
        const client = mysql.createConnection(dbConfig.connection);

        client.connect();
        client.query(schema, (err, result) => {
            console.log(err ? err : 'success!')
            client.end();
        });

    }

   
});

