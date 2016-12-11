let http = require('http');
let bl = require('bl');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio')

let baseUrl = 'http://en.wikipedia.org/w/api.php?action=parse&page=2016%E2%80%9317_Premier_League&prop=text&section=9&format=json';

request(baseUrl, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		
		let result = JSON.parse(body)
		let rawHtml = result.parse.text["*"]
		// ExtractData(rawHtml)
		// console.log(result.parse.text["*"])
		let $ = cheerio.load(rawHtml)

		$('td').each(function(i, td) {
			// if (i == 3)
			// {
			// 	console.log(td.lastChild.lastChild.data)
			// }
			if (td.lastChild != null)
			{
				if (td.lastChild.lastChild != null)
				{
					let data = td.lastChild.lastChild.data
					if (data != "a")
					{
						console.log(td.lastChild.lastChild.data)
					}
					else{
						console.log(null)
					}
					
				}
				else if ( !!td.lastChild.data)
				{
					console.log(td.lastChild.data)
				}
				else
				{
					console.log(null)
				}
				
			}
			else
			{
				console.log(null)
			}
				
		})
		console.log($('tr').length -1)

	}
})