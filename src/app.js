const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')




const app = express()


//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Shailesh'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Shailesh'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helptext: 'Some helpful text',
        title: 'Help',
        name: 'Shailesh'
        
    })
})


// app.get('', (req, res) =>{

//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) =>{
//     res.send([{
//         name: 'shailesh',
//         age:24
//     },
//     {
//         name: 'alhil',
//         age:28
//     }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page!</h1>')
// })

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error:'Please provide a query param address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error,forecastdata) =>{
          if(error){
              return res.send({error})
          }
          res.send({
              forecast: forecastdata,
              location,
              address: req.query.address
          })

        })

    })
     
})

app.get('/products', (req,res) =>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })

    }

  

    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Shailesh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Shailesh',
        errorMessage: 'Page not found'
    } )

})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
