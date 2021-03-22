const request = require("request");
const cheerio = require("cheerio");
const express = require("express")
const app = express()



app.get("/nobetci/:il" , async (req , res) => {
    let eczaneler = []
    let options = {
        url: 'https://www.eczaneler.gen.tr/nobetci-' + req.params.il,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    }
    request(options, (error, resp, body) => {
        if (!error && resp.statusCode == 200) {
            const $ = cheerio.load(body)
            $("#nav-bugun .row").each((i, el) => {
                const name = $(el).find(".isim").text()
                const address = $(el).find(".text-capitalize").text()
                const subAddress = $(el).find(".text-secondary").text()
                const timing = $(el).find(".text-success").text()
                const phoneNumber = $(el).find(".py-lg-2").text()
                eczaneler.push( {
                    name,
                    address,
                    subAddress,
                    timing,
                    phoneNumber
                })
            })
            res.send(eczaneler)
        }  
    }) 
})
app.get("/nobetci/:il/:ilce" , async (req , res) => {
    let eczaneler = []
    let options = {
        url: 'https://www.eczaneler.gen.tr/nobetci-' + req.params.il + "-" + req.params.ilce,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    }
    request(options, (error, resp, body) => {
        if (!error && resp.statusCode == 200) {
            const $ = cheerio.load(body)
            $("#nav-bugun .row").each((i, el) => {
                const name = $(el).find(".isim").text()
                const address = $(el).find(".text-capitalize").text()
                const subAddress = $(el).find(".text-secondary").text()
                const timing = $(el).find(".text-success").text()
                const phoneNumber = $(el).find(".py-lg-2").text()
                
                eczaneler.push( {
                    name,
                    address,
                    subAddress,
                    timing,
                    phoneNumber
                })

            })
        }
        res.send(eczaneler)
    })
})


app.listen(3000 , () => {
    console.log("server çalıştı");
})