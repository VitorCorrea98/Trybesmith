import express from 'express';
import productRouter from './routers/product.route';
import userRouter from './routers/user.route';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/users', userRouter);
export default app;
