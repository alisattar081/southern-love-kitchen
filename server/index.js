const express = require('express');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(express.json());
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

module.exports = app;
