import express from 'express';
import path from 'path';

const publicPath = path.join(__dirname, '../public');
const app = express();
const { PORT: port = 3000 } = process.env;

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server now start on port ${port}`));