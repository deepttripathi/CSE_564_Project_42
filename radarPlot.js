var radar_url="http://127.0.0.1:5000/get_radar_data"

async function getJson(dataUrl){
    var response = await fetch(dataUrl,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true 
        }
    });
    return await response.json();
}
        
async function drawRadarPlot(country){

    // console.log(typeof country)
    chart_url=radar_url;
    console.log(chart_url);
    var bar_data=await getJson(chart_url);

    console.log(country)

    if (country !== 'undefined'){
        RadarChart(bar_data, country);
    }
    else{
        console.log('inside draw radar');
        RadarChart(bar_data);
    }
        

    

    // columns=["GDP per capita","Social support","Healthy life expectancy","Freedom to make life choices","Generosity",
    // "Perceptions of corruption","Percentage","percentage_non_religious"]

    // for (let index = 0; index < 8; index++) {
    //     const element = bar_data[0][columns[index]];
    //     console.log(element)
        
    // }

    
}

