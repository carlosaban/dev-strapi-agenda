module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron:{
    enabled:true
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '1c19c5773027302178e04fc4c201cfbf'),
    },
  },
  cron:{
    enabled:false
  }
});
