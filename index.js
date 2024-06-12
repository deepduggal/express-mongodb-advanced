import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import mongoose, { connect } from 'mongoose';
import routes from './src/routes/index.js';

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.vxrsjss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

connect(uri, {
  dbName: 'test'
})
  .then(() => {
    console.log('Connected to the database.');
    app.use(express.json());
    app.use(routes);

    app.listen(3000, () => {
      console.log('Server is running on port 3000.');
    });
  })
  .catch(() => {
    mongoose.connection.close();
    console.log('Disconnected from the database.');
  });