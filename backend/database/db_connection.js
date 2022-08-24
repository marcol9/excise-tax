import pg from "pg";
const { Pool,Client } = pg;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'excise',
  password: 'root',
  port: 5432,
})

export default{
    query: (text, params) => pool.query(text, params),
  }

// export const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'excise',
//     password: 'root',
//     port: 5432,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


