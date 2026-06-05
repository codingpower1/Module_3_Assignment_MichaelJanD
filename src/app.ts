import express from 'express';
import eventRoutes from './routes/eventRoutes';

const app = express();
app.use(express.json());
app.use('/api/v1/events', eventRoutes);

export default app;