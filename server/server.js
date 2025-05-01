import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import CouncilRoutes from './routes/CouncilRoutes.js';
import deviceRoutes from './routes/deviceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import emailRoutes from './routes/emailRoutes.js';
import nodemailer from 'nodemailer';

//Initialize Express
const app = express();

//Connect to database
const startServer = async () => {
    await connectDB();

    //Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(clerkMiddleware()); 

    //Routes

    app.get('/', (req, res) => res.send("API Working"));

    app.get("/debug-sentry", function mainHandler(req, res) {
        throw new Error("My first Sentry error!");
    });
    app.post('/webhooks', clerkWebhooks);
    app.use('/api/council', CouncilRoutes);
    app.use('/api/devices', deviceRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/email', emailRoutes);

    //Port
    const PORT = process.env.PORT || 5000;

    Sentry.setupExpressErrorHandler(app);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch(err => {
    console.error('Failed to start server', err);
});