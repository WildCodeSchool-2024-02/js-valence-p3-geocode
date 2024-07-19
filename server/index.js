const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/routes');

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3310', 'http://localhost:3000'],
}));

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3310;
app.listen(PORT, () => {
  console.info(`Server running on port: http://localhost:${PORT}`);
});
