import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname + '/.env') })

const extension =
  process.env.NODE_CONFIG_ENV === 'production' || process.env.NODE_CONFIG_ENV === 'staging'
    ? 'js'
    : 'ts';

export default {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, 'src', 'database', 'migrations'),
      loadExtensions: [`.${extension}`],
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'database', 'seeds'),
    },
    pool: {
      afterCreate: function (conn, cb) {
        conn.query('SET sql_mode="STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION";', function (err) {
          cb(err, conn);
        });
      }
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
