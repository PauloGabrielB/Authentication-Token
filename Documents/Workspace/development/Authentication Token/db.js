const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'db_login',
    conectionLimit:5,
});

const connect = async () => {
    try {
        const conn = await pool.getConnection();
        console.log('Conexão com banco de dados foi um sucesso');
        conn.release();
    } catch(err) {
        console.log('erro ao se conectar com o banco', err)
    }
}

module.exports = {connect,pool};