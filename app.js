const http = require('http');
const url = require('url');
const user = require('./user'); 

const server = http.createServer((req, res) => {
    if(req.method === "GET"){
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        if(pathname === '/'){
            try{
                res.setHeader("Content-Type", "html");
                res.statusCode = 200;
                res.end("<h1>Hello World</h1>");
            }catch(error){
                res.setHeader("Content-Type", "text");
                res.statusCode = 400;
                res.end(error.message);
            }
        }
        else if(pathname === '/user'){
            try{
                res.setHeader("Content-Type", "json");
                res.statusCode = 200;
                res.end(JSON.stringify(user));          
            }catch(error){
                res.setHeader("Content-Type", "text");
                res.statusCode = 400;
                res.end(error.message);
            }

        }
        else{
            res.setHeader("Content-Type", "json");
            res.statusCode = 404;
            const error = {
                "status": "Not Found!!!",
                "message": "Resource Not Found"
            }
            res.end(error);
        }
    }else{
        res.statusCode = 405;
        res.setHeader("Content-Type", "json");
        res.statusCode = 404;
        const error = {
            "status": "Tidak Diizinkan!!!",
            "message": "Metode HTTP tidak diizinkan"
        }
        res.end(error);
    }
})

server.listen(3000, () => {
    console.log("server");
})