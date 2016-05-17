var http = require('http'),
    fs = require('fs');

var port = process.env.PORT


function stampUrl (urlString){

if(isNaN(urlString)){var natural = urlString, unix = (Date.parse(urlString))/1000;

if (isNaN(unix)){natural = null, unix = null};

}

if(!isNaN(urlString)){ var date_ = new Date (urlString * 1000);
    unix = urlString, 
    natural = date_.toLocaleString("en-US", {month: 'long', day: 'numeric', year: 'numeric'}) 
    
}

console.log("This is natural time: ", natural);
console.log("This is unix time: ", unix);
    
return {unix: unix, natural: natural};
    
}




http.createServer(function(request, response) {  

var urL = decodeURIComponent(request.url.substring(1));  
console.log("This is the URL: ", urL);

	if (request.url == "/"){
	fs.readFile('./index.html', function (err, htmlFile) {
    if (err) {
        throw err; }
	
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(htmlFile);  
        response.end(); 
	});
	}
	
	else if (request.url == "/favicon.ico"){}
	
	else if(urL.length>0){
	    response.writeHead(200, { 'Content-Type': 'application/json' }); 
        response.end(JSON.stringify(stampUrl(urL)));
	}
	
	
	
	else{
		response.writeHeader(200, {"Content-Type": "text/html"});  
        response.end("Error");  
	}
	
	
    }).listen(port);