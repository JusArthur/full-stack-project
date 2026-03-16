import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menuRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/menu', menuRoutes);

app.listen(PORT, () => {
  console.log(`Back-end server running on port ${PORT}`);
});