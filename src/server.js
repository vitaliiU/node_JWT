const { PORT } = require('./common/config');
const app = require('./app');

// const port = process.env.PORT || 8888;

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
