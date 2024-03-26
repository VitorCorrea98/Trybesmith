import express from 'express';
import productRouter from './routers/product.route';
import userRouter from './routers/user.route';
import loginRouter from './routers/login.route';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);

export default app;
