const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
<<<<<<< HEAD

=======
const session = require('express-session');
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
<<<<<<< HEAD
=======
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
>>>>>>> 015e47b095f8a90b74d7f4e2eeb9f102f2ffc4e7

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', require('./src/routes/user.routes'));
app.use('/otp', require('./src/routes/otp.routes'));

app.use(require('./src/middlewares/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
