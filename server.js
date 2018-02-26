const express = require('express');
const csvFilePath='./public/free-zipcode-database-Primary.csv'
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static('public'))
var Converter = require("csvtojson").Converter;
// create a new converter object
var converter = new Converter({});
let zips;
// call the fromFile function which takes in the path to your
// csv file as well as a callback function
converter.fromFile(csvFilePath,function(err,result){
    // if an error has occured then handle it
    if(err){
        console.log("An Error Has Occured");
        console.log(err);
    }
    var json = result;
    zips = Array.from(json)

});

app.get('/api/:zip', (req, res) => {
  let info = zips.find(item => {
     return item.Zipcode == req.params.zip
  })
  if(info){
    res.send({zip: info.Zipcode, lat: info.Lat , lon: info.Long});
  }else{
    res.status(500).send({error: "We Couldn't Find That Zipcode"})
  
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
