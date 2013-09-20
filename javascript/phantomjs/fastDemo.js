console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://www.google.com/';
page.open(url, function (status) {
    //Page is loaded!
    //phantom.exit();
});

window.setTimeout(function () {
    page.render('a.png');
    phantom.exit();
}, 6000);