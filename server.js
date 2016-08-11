var express = require("express");
var app = express();

// app.use(express.logger());
app.use(express.static('src'));
app.use('/assets', express.static('src/assets'));
app.use('/bower_components', express.static('bower_components'));

var port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log("Listening on " + port);
});
