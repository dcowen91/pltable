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

let jsonData = JSON.parse(fs.readFileSync('output.JSON', 'utf8'));


const top6 = [true,false,false,true,false,false,false,false,true,true,true,false,false,false,false,false,true,false,false,false];
const bottom5 = [false,false,false,false,true,false,true,false,true,false,false,true,false,false,true,true,false,false,false,false];
const all = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
console.log(createStateRows(jsonData,top6,all, "ALL"));

