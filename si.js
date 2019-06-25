var http=require("http");
var url=require("url");
var fs=require("fs");
var query=require("querystring");

//=================================

var m1=require("./SInt");
//==============================

function process(req,resp)
{
	var u=url.parse("req.url");
	resp.writeHead(200,{"content-type":"text/html"});
	
	switch(u.pathname)
	{
		case '/':
			fs.readFile("si.html",function(err,data)
			{
				if(err)
				{
					resp.write("some error");
					console.log(err);
					
				}
				else
				{
					resp.write(data);
					resp.end();
					
				}
				
				
			}
			);
			break;
			
		//========================
	case '/Simple_Interest'	:
		var str="";
		req.on('data',function(d)
		{
			
			str+=d;
		}
		
		);
		req.on('err',function()
		{
			console.log(str);
			var ob=query.parse(str);
			
			var SI=m1.interest(ob.principle,ob.rate,ob.period);
			
			resp.end("<h1>simple interest is "+SI+": </h1>" );
			
		}
		)
		
		
		
	}
	
	
}
var server=http.createServer(process);
server.listen(4000);
