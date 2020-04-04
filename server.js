//criei o servidor e configurei com express
const express = require("express")
const server = express()

//exportando o bando de dados
const db = require("./db")

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

//configuração de arquivos estáticos
server.use(express.static("public"))

//habilitar req.body
server.use(express.urlencoded({ extended:true }))

//criei uma rota / e capturo o pedido do cliente para responder
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de dados")
        }
        
        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for ( idea of reversedIdeas ) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", { ideas: lastIdeas })
    })

})

server.get("/ideas", function (req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de dados")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideas.html", { ideas: reversedIdeas})

    })


})

server.post("/", function (req, res) {
    //inserir dados na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?, ?, ?, ?, ?);
    `
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de dados")
        }

        return res.redirect("/ideas")
    })
})

//liguei o servidor na porta 3000
server.listen(3000)