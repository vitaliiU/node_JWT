const { connectToDB } = require('./DB/db.client');
const { PORT } = require('./common/config');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

// const port = process.env.PORT || 8888;
