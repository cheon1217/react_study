const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const memberRoutes = require('./routes/member');
const boardRoutes = require('./routes/board');
const reviewRoutes = require('./routes/review');

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/members', memberRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
