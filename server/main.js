const express = require('express');

var app = express()
app.get('/api/:game/:region/:id', function(req, res) {
    var data = {
      nakamura : {
        name : 'Nakanokura Liquor Store',
        type : 'Restaurant',
        description : 'Un restau avec des liqueurs.\nEnfin de l\'alcool quoi.'
      },
      ginya : {
        name : '寿司 吟屋 Sushiya Gin',
        type : 'Restaurant',
        description : 'Sushi Restaurant',
        items : [{
          name : '太巻き - Thick Roll',
          price : '50文'
        },{
          name : '鯖の押し寿司 - Pressed Mackerel Sushi',
          price : '80文'
        }

        ]
      }
    };
    res.send(JSON.stringify({
      id : req.params.id,
      data : data[req.params.id]
    }))
})

.listen(5001)
