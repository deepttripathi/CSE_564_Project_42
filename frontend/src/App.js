import './App.css';
import React, { useState, /*useRef,*/ useEffect } from 'react'


import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { green, orange } from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'


// import { select, /*transition,*/ line, axisBottom, scaleLinear } from 'd3'
// import BarChart from './charts/BarChart'
import CountryMap from './charts/CountryMap'
import RadialChart from './charts/radarChartN'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500]
    },
    secondary: {
      main: orange[500]
    }
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



function App() {

  const [mapData, setMapData] = useState([{}])
  const [radialData, setRadialData] = useState([{}])
  const [colorMap, setColorMap] = useState([{}])
  // const [pieData, setPieData] = useState([{}])
  // const [populationData, setPopulationData] = useState([{}])
  // const [religionData, setReligionData] = useState([{}])
  // const [pcpData, setPcpData] = useState([{}])

  // const svgRef = useRef()

  // var t = transition().duration(750)
  const fetchMapData = async () => {
    const response = await fetch('/get_map_data/Score', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    })
    const data = await response.json()
    return data
  }

  const fetchRadialData = async () => {
    const response = await fetch('/get_radar_data', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    })
    const data = await response.json()
    // console.log(data)
    return data
  }

  const fetchColorMap = async () => {
    const response = await fetch('/get_color_map/Score', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    })
    const data = await response.json()
    return data
  }

  // const fetchPieData = async()=> {
  //   const response = await fetch('/get_bar_chart_data/India',{
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin" : "*", 
  //       "Access-Control-Allow-Credentials" : true 
  //     }
  //   })
  //   const data = await response.json()
  //   return data
  // }

  // const fetchPopulationData = async()=> {
  //   const response = await fetch('/get_internet_data/Score',{
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin" : "*", 
  //       "Access-Control-Allow-Credentials" : true 
  //     }
  //   })
  //   const data = await response.json()
  //   return data
  // }

  // const fetchReligionData = async()=> {
  //   const response = await fetch('/get_religion_data/Score',{
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin" : "*", 
  //       "Access-Control-Allow-Credentials" : true 
  //     }
  //   })
  //   const data = await response.json()
  //   return data
  // }

  // const fetchPcpData = async()=> {
  //   const response = await fetch('/get_bar_chart_data/India',{
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Access-Control-Allow-Origin" : "*", 
  //       "Access-Control-Allow-Credentials" : true 
  //     }
  //   })
  //   const data = await response.json()
  //   return data
  // }
  useEffect(async () => {
    //make API calls here
    console.log('start')
    
    const mapData_from_api = await fetchMapData()
    const radialData_from_api = await fetchRadialData()
    const colorMap_from_api = await fetchColorMap()
    // const pieData_from_api = await fetchPieData()
    // console.log('pieData:', pieData_from_api)
    // const populationData_from_api = await fetchPopulationData()
    // console.log('populationData:', populationData_from_api)
    // const religionData_from_api = await fetchReligionData()
    // console.log('religionData:', religionData_from_api)
    // const pcpData_from_api = await fetchPcpData()
    // console.log('pcpData:', pcpData_from_api)

    setMapData(mapData_from_api)
    setRadialData(radialData_from_api)
    setColorMap(colorMap_from_api)
    // setPieData(pieData_from_api)
    // setPopulationData(populationData_from_api)
    // setReligionData(religionData_from_api)
    // setPcpData(pcpData_from_api)
  }, [])

  const classes = useStyles();

  //add an option bar
  return (
    <ThemeProvider theme={theme}>
      <Container style={{ padding: "0px", margin: "0px" }}>

        <Grid container style={{ height: "48vh", width: "100vw" }}>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper}>
              <RadialChart radialData={radialData}></RadialChart>
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={6}>
            <Paper style={{ height: "100%" }} className={classes.paper}>
              <CountryMap mapData={mapData} colorMap={colorMap} />
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper}>
              <svg style={{ height: "100%", width: "100%" }}>
              </svg>
            </Paper>
          </Grid>
        </Grid>


        <Grid container style={{ height: "48vh", width: "100vw" }}>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper}>
              <svg style={{ height: "100%", width: "100%" }}>
              </svg>
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={6}>
            <Paper style={{ height: "100%" }} className={classes.paper}>
              <svg style={{ height: "100%", width: "100%" }}>
              </svg>
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper}>
              <svg style={{ height: "100%", width: "100%" }}>
              </svg>
            </Paper>
          </Grid>
        </Grid>


      </Container>
    </ThemeProvider>
  );
}

export default App;
