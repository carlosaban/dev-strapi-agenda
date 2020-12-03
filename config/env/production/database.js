module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '50.87.146.219'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'suit_cabanto2'),
        username: env('DATABASE_USERNAME', 'suit_usrcabanto'),
        password: env('DATABASE_PASSWORD', 'chino2021'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
