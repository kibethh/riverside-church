require('./db/mongoose');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

const viewsRouter = require('./routers/viewRoutes');
const userRouter = require('./routers/userRoutes');
const sermonRouter = require('./routers/sermonRoutes');
const newsRouter = require('./routers/newsRoutes');
const eventsRouter = require('./routers/eventsRoutes');
const membersRouter = require('./routers/membersRoutes');
const departmentRouter = require('./routers/departmentRoutes');
const showcaseRouter = require('./routers/showcaseRoutes');
const galleryRouter = require('./routers/galleryRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const authController = require('./controllers/authController');

//paths
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const app = express();
//Define paths for express config
app.set('view engine', 'ejs');
app.set('views', viewsPath);
//Global middlewares
//SET security HTTP headers
app.use(helmet());
//Development logging
if (process.env.NODE_ENV.trim() === 'development') {
  app.use(morgan('dev'));
}
//Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
// app.use('/', limiter);

//setup public directory to serve
//serving static files
app.use(express.static(publicDirectory));
//Body parser, reading data from the body into req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));

//Parsing data from cookies
app.use(cookieParser());
//Data sanitization against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    //To be excluded
    whitelist: ['duration'],
  })
);

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });
// checking if there is logged in user
app.use(authController.isLoggedIn);

app.use('/', viewsRouter);
app.use('/api/v1/', userRouter);
app.use('/api/v1/sermons', sermonRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/members', membersRouter);
app.use('/api/v1/departments', departmentRouter);
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/showcase', showcaseRouter);
app.use('/api/v1/gallery', galleryRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

console.log(process.env.NODE_ENV);

app.use(globalErrorHandler);

module.exports = app;
