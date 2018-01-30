var http = require('http');
var options = {
                                  hostname: '0b2b934d.ngrok.io',
port:null,                                 
path:'/ledonoff',
 method: 'GET',
                                  headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                                                }
                           };
                           msg ='';
                           var reqs = http.request(options, function(respose) {
                           respose.setEncoding('utf8');
                           respose.on('data', function(chunk) {
                                                                msg += chunk;
                                                        });
                                                        respose.on('end', function() {
                                                                console.log("Invoked Dummy Services");
                                                        });
                                                 });
                                                reqs.end();
