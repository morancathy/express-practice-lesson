//load express
//there is no path here. It now will assume its a built in module, or node module folder(read only..never mess with)
const express = require('express');
// create our express app
//this function returns back to us an object and ...
//industry standard is to name this 'app'
//express has a bunch of methods on it
const app = express();

const fs = require('fs'); //create/reading a file and doing something with file i read

app.engine('hypatia', (filePath, options, callback) => {         //app.engine is the outer funtion
  fs.readFile(filePath, (err, content) => {
    if (err) {
      return callback(err)
    }
    const rendered = content.toString()     //have to turn into string
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', '<h1>' + options.message + '</h1>')
      .replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})

app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine


app.get('/', (req, res) => {
  res.render('template', {title: 'Hey', message: "Hello There", content: "I am the boss Ricky Ross"})
})
//above is a callback funtion. The first arguement is the request object, 2nd is response object.

app.get('/about-me', (req, res) => {
  res.render('template', {title: 'Hey', message: 'Rick Ross', content: 'The most underrated Rapper in the game. However I dont know who he is'})
})

app.get('/another-one', (req, res) => {
  res.render('template', {title: 'We The Best', message: 'Who!', content: 'We Taking Over, Major Key Alert, Yall Know who it is'})
})

app.get('*', (req, res) => {
  res.status(404).render("template", {title: '404', message: 'You Played Yourself', content:""})
})

//two parameters we need are request and response
app.get('/neet', (req, res)=> {
  res.send('I am Neet and I code awesome')
})

app.get('/santos', (req, res)=>{
  res.redirect('/neet')
})
app.listen(3000, () => console.log('hello i am listening on port 3000'))
//3000 is a random number but i know my computer isnt using this
