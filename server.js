const express = require("express");
const morgan = require("morgan");
const got = require("got");
require("dotenv").config();
const app = express();

var cors = require('cors')


const { router } = require("./booksRouter");

const PORT = process.env.PORT || 8081;
const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const thirdPartyApiKey = process.env.WEATHER_API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(cors())
// app.use('/api', router);

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
//     next();
// })

app.get("/api/weather", async (req, res) => {
  try {
    // req.query.params
    // req.params
    // req.body
    // req.headers
    const {
        latitude,
        longitude
    } = req.query;

if(!latitude) {
    return res.status(400).json({message: 'latitude parametr is mandatory'})
}

if(!longitude) {
    return res.status(400).json({message: 'longitude parametr is mandatory'})
}

    const response = await got (thirdPartyBaseUrl, {
      searchParams: {
        key: thirdPartyApiKey,
        lat: latitude,
        lon: longitude,
      },
      responseType: "json",
    });
    const [weatherData] = response.body.data;
    const {
      city_name,
      weather: { description },
      temp
    } = weatherData;
    res.json({
      city_name,
      description,
      temp
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.use((req, res) => {
//     res.send('middleware request')
// });

// app.get('/home', (req, res) => {
//     res.send('get request')
// });

// app.delete('/home', (req, res) => {
//     res.send('delete request')
// });

app.listen(PORT, (err) => {
  if (err) console.error("Error at aserver launch", err);
  console.log(`Server works at port ${PORT}!`);
});
