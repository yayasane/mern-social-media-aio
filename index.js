const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const usersRoute = require('./routes/users.routes')
const authRoute = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const conversationRoutes = require('./routes/conversation.routes')
const messageRoutes = require('./routes/message.routes')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
dotenv.config()

const app = express()
const corsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: [
    'Orgin',
    'Accept',
    'X-Request-With',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'authorization',
  ],
  exposedHeaders: [
    'Acces-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
    'authorization',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}
// app.use(cors(corsOptions))

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) console.log('Connected to MongoDB')
    else console.log('Connexion error: ' + err)
  },
)

//Quand on un requête vers cette path, ne construit pas de requête, vas simplement dans le dosssier public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    // console.log(req.body.name)
    //req.body n'a peut-être pas encore été entièrement renseigné. Cela dépend de l'ordre dans lequel le client transmet les champs et les fichiers au serveur.
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, resp) => {
  console.log(req.body.name)
  try {
    return resp.status(200).send('File uploaded succesfully')
  } catch (error) {
    console.log(err)
  }
})

app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)

/***********const app = require('./app')*** Heroku Deployement START *****************/
// Related with Heroku deployement
app.use(express.static(path.join(__dirname, 'client', 'build')))

// ...
// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
/************** Heroku Deployement END *****************/
// const server = require('http').Server(app)
// const io = (module.exports.io = require('socket.io')(server))
// const SocketManager = require('./SocketManager')
// io.on('connection', SocketManager)
app.listen(process.env.PORT || 5000, (res, err) => {
  console.log(res)
  console.log('Backend server in running')
})
