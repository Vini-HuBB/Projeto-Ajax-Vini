const bodyParser = require("body-parser") //Biblioteca que acabamos de instalar
const express = require("express") //Biblioteca que acabamos de instalar 
const app = express() //Criar o servidor do app da biblioteca


app.use(express.static('.')) //Criar o servidor
app.use(bodyParser.urlencoded({
    extended: true

}))


app.use(bodyParser.json()) //Middleware para ler dados do corpo da requisição(Formulários)
const multer = require("multer") //Middleware para lidar com uploads de arquivos

const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, '.upload')
    },
filename: function(req, file, callback){
        callback(null, '${Date.now()}_$(file.originalname}')

}

}) //Rota post que recebe um arquivo

const upload = multer({storage}).single('arquivo')
// Para salvar o arquivo no destino correto

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if(err){
            return res.end('Ocorreu um erro!')
        }

        res.end('Concluído com sucesso!')
    })
})

app.listen(8080, () => console.log('Executando...')
) //Coloca o servidor para rodar na porta 8080