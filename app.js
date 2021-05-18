// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = 3000
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('calvin777'))

// user information
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

// 設定首頁路由
app.get('/', (req, res) => {
  if (!req.signedCookies.user) {
    return res.render('login')
  } else {
    return res.render('home', { name: req.signedCookies.user })
  }
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  let msg = ''
  const user = users.find(user => user.email === email)
  if (!user) {
    msg = "Email didn/'t exsit"
    return res.render('login', { email: msg })
  } else {
    if (user.password !== password) {
      msg = "Wrong password !!"
      return res.render('login', { email: msg })
    } else {
      res.cookie('user', user.firstName, { path: '/', signed: true, httpOnly: true })
      res.render('home', { name: user.firstName })
    }
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('user', { path: '/' })
  res.redirect('/')
})

// 設定 port 3000
app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`)
})