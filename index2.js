const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', matchRoutes);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
