var http = require('http');
var express = require('express');
var app = express()
var inc_ct;
var counter;
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

app.get('/getTemperature' , function(req,res){
  console.log('listening on port 8087!')

  counter = localStorage.getItem('counter')
  inc_ct = localStorage.getItem('inc_ct')

  console.log('Counter - ' + counter + ' , File_no - ' + inc_ct);
  if(counter == undefined && inc_ct == undefined) {
        localStorage.setItem('counter', 0);
        localStorage.setItem('inc_ct', 0);
  }

  var temperature = req.query.current_temperature;
  if(counter < 5) {
         invokingMainService(temperature)
         counter++;
         localStorage.setItem('counter', counter);
  } else if(inc_ct < 5)  {
         counter = 0;
         invokingMainService(temperature)
     inc_ct++;
         localStorage.setItem('inc_ct', inc_ct);
        localStorage.setItem('counter', counter);
  } else {
         counter =0 ; inc_ct = 0;
         invokingMainService(temperature)
         localStorage.setItem('counter',0);
         localStorage.setItem('inc_ct',0);
         console.log("No such Orders");
  }
});

function invokingMainService(temperature){

         var config = require('/home/ubuntu/project/Predix_SCM/Temp_data/JsonData_' + inc_ct + '.json');
         var postData = {
            "order_id": config.invokeinput[counter].order_id,
            "package_id": config.invokeinput[counter].package_id,
            "current_temperature": temperature,
            "location": config.invokeinput[counter].location,
            "max_temperature": config.invokeinput[counter].max_temperature,
                "time": config.invokeinput[counter].time,
                "carrier": config.invokeinput[counter].carrier,
                "min_temperature": config.invokeinput[counter].min_temperature,
                "shipping_address" : config.invokeinput[counter].shipping_address,
                "order_date" : config.invokeinput[counter].order_date,
                "events" : config.invokeinput[counter].events
        }

    console.log(JSON.stringify(postData));

           var options = {
                  url: 'http://104.214.115.118:8085/process_invoke',
                  method: 'POST',
				  body : postData,
                  headers: {
                        'Content-Type': 'application/json; charset=utf-8'
             }                
        }

        var post_req = http.request(options, function(res) {
      res.setEncoding('utf8');
          res.before(function(){ console.log("Befor Invoking")});

      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
          res.on('error', function (chunk) {
          console.log('Error Response: ' + chunk);
      });

  });
  // post the data
   post_req.end();
}

app.listen(8087);

