//criei o servidor e configurei com express
const express = require("express")
const server = express()

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing",
        url: "https://github.com/rommel-s"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercício",
        category: "Saúde",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing",
        url: "https://github.com/rommel-s"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing",
        url: "https://github.com/rommel-s"
    },

    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Diversão",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing",
        url: "https://github.com/rommel-s"
    }
]

//configuração de arquivos estáticos
server.use(express.static("public"))

//criei uma rota / e capturo o pedido do cliente para responder
server.get("/", function (req, res) {

    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for ( idea of reversedIdeas ) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render("index.html", { ideas: lastIdeas })

})

server.get("/ideas", function (req, res) {

    const reversedIdeas = [...ideas].reverse()
    return res.render("ideas.html", { ideas: reversedIdeas})

})

//liguei o servidor na porta 3000
server.listen(3000)