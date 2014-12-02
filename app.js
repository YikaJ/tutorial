var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//网页图标
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* session会话 */
var cookieSession = require("cookie-session");
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require("./settings")

/* 路由 */
var routes = require('./routes/index');
var users = require('./routes/users');
var tutorials = require('./routes/tutorials');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //path.join用于路径连接
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());//解析客户端请求
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* session会话 */
/*app.use(cookieSession({secret: settings.cookieSecret}))
app.use(session({
    secret: settings.cookieSecret,
    store: settings.db
}))*/
/*这里是设置了静态资源的路径，从上往下优先级*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
/*这里是路由*/
app.use('/', routes);
app.use('/tutorials', tutorials);
app.use('/users', users);
app.use('/admin', admin); //匹配到routes文件夹

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
