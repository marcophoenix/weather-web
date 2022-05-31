const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicdirec = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', publicdirec)
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicdirec))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'mohit',
        identity: 'mohit'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        identity: 'mohit',
        name: 'this is a weather webapp'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'this is some helful text',
        title: 'HELP',
        identity: 'mohit',
        name: 'please refer to original text'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                data: data.tmp_min,
                address: req.query.address
            })
        })
    })

})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide a query for seach'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help 404 error',
        error: "help url not found",
        name: 'mohit'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: '404 error',
        name: 'mohit'
    })
})
app.listen(3000, () => {
    console.log('server is up 3000')
})