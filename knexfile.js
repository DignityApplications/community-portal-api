const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/community-portal-api-test',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds/test')
    }
  },

  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/community-portal-api',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds/prod')
    }
  },

  production: {
    client: 'pg',
    connection: 'postgres://bgnverwizackay:14dced267ac33a704665b2011cd1bdf517aea943140eaeaa2599da381e3386f7@ec2-54-221-192-231.compute-1.amazonaws.com:5432/d9t7jas6pehll3',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds/heroku')
    }
  }
};
