let fs = require('fs');

function addResults(team, matchScore, venue)
{
	if (venue == "HOME")
	{
		team.goalsAgainst += matchScore[1]; 
		team.goalsFor += matchScore[0];
		
		if (matchScore[1] > matchScore[0])
		{
			team.losses++;
		}
		else if (matchScore[1] < matchScore[0])
		{
			team.wins++;
		}
		else
		{
			team.draws++;
		}
	}
	else 
	{
		team.goalsAgainst += matchScore[0]; 
		team.goalsFor += matchScore[1];
		
		if (matchScore[0] > matchScore[1])
		{
			team.losses++;
		}
		else if (matchScore[0] < matchScore[1])
		{
			team.wins++;
		}
		else
		{
			team.draws++;
		}
	}
}

function createTeamArray(jsonData, teamsToShow)
{
	let result = [];
	for (let i = 0; i < jsonData._TeamNamesByIndex.length; i++)
	{
		if (!!teamsToShow[i])
		{
			var teamData = 
			{
				teamName : jsonData._TeamNamesByIndex[i],
				wins: 0,
				losses: 0,
				draws: 0,
				goalsFor: 0,
				goalsAgainst: 0,
				id: i
			};
			result[i] = teamData;
		}
	}
	return result;
}

function createStateRows(jsonData, teamsToShow, opponentsToShow, locationFilter)
{
	let teamArray = createTeamArray(jsonData, teamsToShow);

	const jsonArray = jsonData.resultsArray;
	for (let i = 0; i < jsonArray.length; i++)
	{
		let currentRow = jsonArray[i];
		for (let j = 0; j < currentRow.length; j++)
		{
			if (!!currentRow[j])
			{
				if (!!teamsToShow[i] && !!opponentsToShow[j] && (locationFilter === "HOME" || locationFilter === "ALL"))
				{
					addResults(teamArray[i], currentRow[j], "HOME");
				}
				if (!!teamsToShow[j] && !!opponentsToShow[i] && (locationFilter === "AWAY" || locationFilter === "ALL"))
				{
					addResults(teamArray[j], currentRow[j], "AWAY");
				}
			}
		}
	}
	return teamArray;
}

// testing a bit

const jsondata = {"_TeamNamesByIndex":["ARSENAL","BOURNEMOUTH","BURNLEY","CHELSEA","CRYSTAL PALACE","EVERTON","HULL","LEICESTER CITY","LIVERPOOL","MANCHESTER CITY","MANCHESTER UNITED","MIDDLESBROUGH","SOUTHAMPTON","STOKE CITY","SUNDERLAND","SWANSEA CITY","TOTTENHAM HOTSPUR","WATFORD","WEST BROMWICH ALBION","WEST HAM UNITED"],"_TeamNameToIndexMapping":{"ARSENAL":0,"BOURNEMOUTH":1,"BURNLEY":2,"CHELSEA":3,"CRYSTAL PALACE":4,"EVERTON":5,"HULL":6,"LEICESTER CITY":7,"LIVERPOOL":8,"MANCHESTER CITY":9,"MANCHESTER UNITED":10,"MIDDLESBROUGH":11,"SOUTHAMPTON":12,"STOKE CITY":13,"SUNDERLAND":14,"SWANSEA CITY":15,"TOTTENHAM HOTSPUR":16,"WATFORD":17,"WEST BROMWICH ALBION":18,"WEST HAM UNITED":19},"resultsArray":[[null,[3,1],null,[3,0],[2,0],null,null,null,[3,4],null,null,[0,0],[2,1],[3,1],null,[3,2],[1,1],null,[1,0],null],[[3,3],null,null,null,null,[1,0],[6,1],[1,0],[4,3],null,[1,3],null,[1,3],null,[1,2],null,[0,0],null,[1,0],null],[[0,1],[3,2],null,null,[3,2],[2,1],[1,1],null,[2,0],[1,2],null,[1,0],null,null,[4,1],[0,1],null,[2,0],null,null],[null,[3,0],[3,0],null,null,[5,0],null,[3,0],[1,2],null,[4,0],null,null,[4,2],null,null,[2,1],null,[1,0],[2,1]],[null,[1,1],null,[0,1],null,null,null,null,[2,4],[1,2],[1,2],null,[3,0],[4,1],null,[1,2],null,null,[0,1],[0,1]],[[2,1],null,null,null,[1,1],null,null,null,[0,1],null,[1,1],[3,1],[3,0],[1,0],null,[1,1],[1,1],null,null,[2,0]],[[1,4],null,null,[0,2],[3,3],[2,2],null,[2,1],null,[0,3],[0,1],null,[2,1],[0,2],null,null,null,null,[1,1],null],[[0,0],null,[3,0],null,[3,1],[0,2],null,null,null,[4,2],null,[2,2],[0,0],null,null,[2,1],null,null,[1,2],[1,0]],[null,null,null,null,null,null,[5,1],[4,1],null,[1,0],[0,0],null,null,[4,1],[2,0],null,null,[6,1],[2,1],[2,2]],[[2,1],[4,0],[2,1],[1,3],null,[1,1],null,null,null,null,null,[1,1],[1,1],null,[2,1],null,null,[2,0],null,[3,1]],[[1,1],null,[0,0],null,null,null,null,[4,1],null,[1,2],null,[2,1],[2,0],[1,1],[3,1],null,[1,0],null,null,[1,1]],[null,[2,0],null,[0,1],[1,2],null,[1,0],[0,0],[0,3],null,null,null,null,[1,1],null,[3,0],[1,2],[0,1],null,null],[null,null,[3,1],[0,2],null,[1,0],null,null,[0,0],null,null,[1,0],null,null,[1,1],[1,0],[1,4],[1,1],[1,2],null],[null,[0,1],[2,0],null,null,null,null,[2,2],null,[1,4],null,null,[0,0],null,[2,0],[3,1],[0,4],[2,0],[1,1],null],[[1,4],null,null,[0,1],[2,3],[0,3],[3,0],[2,1],[2,2],null,null,[1,2],null,null,null,null,null,[1,0],[1,1],null],[null,[0,3],null,[2,2],[5,4],null,[0,2],null,[1,2],[1,3],[1,3],null,null,null,[3,0],null,null,[0,0],null,[1,4]],[null,null,[2,1],[2,0],[1,0],null,[3,0],[1,1],[1,1],[2,0],null,null,null,null,[1,0],[5,0],null,null,null,[3,2]],[[1,3],[2,2],null,[1,2],[1,1],[3,2],[1,0],[2,1],null,null,[3,1],null,null,[0,1],null,null,[1,4],null,null,null],[null,null,[4,0],null,null,[1,2],[3,1],null,null,[0,4],[0,2],[0,0],null,null,null,[3,1],[1,1],[3,1],null,[4,2]],[[1,5],[1,0],[1,0],null,null,null,[1,0],null,null,null,[0,2],[1,1],[0,3],[1,1],[1,0],null,null,[2,4],null,null]]};
const top6 = [true,false,false,true,false,false,false,false,true,true,true,false,false,false,false,false,true,false,false,false]
const bottom5 = [false,false,false,false,true,false,true,false,true,false,false,true,false,false,true,true,false,false,false,false]
console.log(createStateRows(jsondata,top6,bottom5, "ALL"));

