let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio')

//TODO: remove "-" from output
//TODO: write teams to output obj as well

let baseUrl = 'http://en.wikipedia.org/w/api.php?action=parse&page=2016%E2%80%9317_Premier_League&prop=text&section=9&format=json';

request(baseUrl, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		let result = JSON.parse(body);
		let rawHtml = result.parse.text["*"];
		let $ = cheerio.load(rawHtml);

		// -1 to acount for header
		let rowCount = $('tr').length - 1;
		let resultsArray = new Array(rowCount);

		$('tr').each(function (i, tr) {
			if (i != 0) {
				let $$ = cheerio.load(tr);
				let currentRowArray = new Array(rowCount);
				$$('td').each(function (j, td) {
					let result = null;
					if (td.lastChild != null) {
						if (td.lastChild.lastChild != null) {
							let data = td.lastChild.lastChild.data;
							if (data != "a") {
								result = data;
							}
						}
						else if (!!td.lastChild.data) {
							result = td.lastChild.data;
						}
					}
					currentRowArray[j] = result;
				});
				resultsArray[i - 1] = currentRowArray;
			}
		});
		let output = JSON.stringify(resultsArray);
		fs.writeFile("output.JSON", output, function (err) {
			if (err) {
				console.log("ERROR: " + err.message)
			}
			else {
				console.log("SUCCESS: wrote data to output.JSON");
			}
		});
	}
});