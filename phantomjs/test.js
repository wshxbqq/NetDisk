console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://flash.17173.com/flashfile/2013-01-23/20130123145727675.shtml';
page.open(url, function (status) {
    //Page is loaded!
    //phantom.exit();
});

window.setTimeout(function () {
    page.render('D:/t.jpg');
    phantom.exit();
}, 6000);