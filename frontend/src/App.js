import './App.css';
import React, { useState, /*useRef,*/ useEffect } from 'react'


import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { green, orange } from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


// import { select, /*transition,*/ line, axisBottom, scaleLinear } from 'd3'
// import BarChart from './charts/BarChart'
import CountryMap from './charts/CountryMap'
import RadialChart from './charts/radarChartN'
import ParallelChart from "./charts/pcp"
import ScatterPlot from './charts/scatterplot'
import ScatterPlot1 from './charts/scatterPlot1'

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



function App() {

  const [mapData, setMapData] = useState([{}])
  const [radialData, setRadialData] = useState([{}])
  const [radialCountry, setRadialCountry] = useState('')
  const [colorMap, setColorMap] = useState([{}])
  const [feature, setFeature] = useState(['Score'])
  const [parallelData, setParallelData] = useState([])
  const [scatterData, setScatterData] = useState([{}])
  const [pieData, setPieData] = useState([{}])
  // const [countryData, setCountryData] = useState([{}])
  // const [pieData, setPieData] = useState([{}])
  // const [populationData, setPopulationData] = useState([{}])
  // const [religionData, setReligionData] = useState([{}])
  // const [pcpData, setPcpData] = useState([{}])

  // const svgRef = useRef()

  // var t = transition().duration(750)
  const fetchMapData = async (feature) => {
    const url = 'get_map_data/' + feature
    const response = await fetch(url, {
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

  const fetchScatterData = async (feature) => {
    const url = 'get_scatter_data/' + feature
    const response = await fetch(url, {
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

  const fetchColorMap = async (feature) => {
    const curl = '/get_color_map/' + feature
    const response = await fetch(curl, {
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
  const fetchparallelData = async () => {
    const response = await fetch('/get_pcp_data', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    })
    const data = await response.json()
    console.log("fetch mapDta:", data)
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

  // const fetchcountryData = async(radialCountry)=> {
  //   console.log("ccountry", radialCountry)
  //   const cUrl='/get_country_data/'+radialCountry
  //   const response = await fetch(cUrl,{
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


  // const mapData_from_api = fetchMapData()
  // const radialData_from_api = fetchRadialData()
  // const colorMap_from_api = fetchColorMap()

  // setMapData(mapData_from_api)
  // setRadialData(radialData_from_api)
  // setColorMap(colorMap_from_api)

  useEffect(async () => {
    //make API calls here
    console.log('start')
    console.log('start124', feature)
    const mapData_from_api = await fetchMapData(feature)
    const radialData_from_api = await fetchRadialData()
    const colorMap_from_api = await fetchColorMap(feature)
    const pcpData_from_api = await fetchparallelData()
    const scatterData_from_api = await fetchScatterData(feature)
    // const countryData_from_api = await fetchcountryData(radialCountry)

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
    setParallelData(pcpData_from_api)
    setScatterData(scatterData_from_api)
    // setCountryData(countryData_from_api)
    // setPieData(pieData_from_api)
    // setPopulationData(populationData_from_api)
    // setReligionData(religionData_from_api)
    // setPcpData(pcpData_from_api)
  }, [feature])

  const classes = useStyles();

  const handleChange = (event) => {
    setFeature(event.target.value);
  };



  //add an option bar
  return (
    <ThemeProvider theme={theme}>

      <div style={{ display: 'inline' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Happiness, Internet and Religion</h3>
        </div>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={feature}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Select attribute</em>
            </MenuItem>
            <MenuItem value={"Score"}>Score</MenuItem>
            <MenuItem value={"Overall rank"}>Overall rank</MenuItem>
            <MenuItem value={"GDP per capita"}>GDP per capita</MenuItem>
            <MenuItem value={"Social support"}>Social support</MenuItem>
            <MenuItem value={"Healthy life expectancy"}>Healthy life expectancy</MenuItem>
            <MenuItem value={"Freedom to make life choices"}>Freedom to make life choices</MenuItem>
            <MenuItem value={"Generosity"}>Generosity</MenuItem>
            <MenuItem value={"Perceptions of corruption"}>Perceptions of corruption</MenuItem>
            {/* <MenuItem value={"Population"}>Population</MenuItem> */}
            <MenuItem value={"Percentage"}>Internet Users(%)</MenuItem>
            <MenuItem value={"percentage_non_religious"}>Non-religious people(%)</MenuItem>
          </Select>
        </FormControl>

      </div>

      <Container style={{ padding: "0px", margin: "0px" }}>

        <Grid container style={{ height: "47vh", width: "100vw" }}>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper} variant={"outlined"}>
              <RadialChart radialData={radialData} radialCountry={radialCountry} ></RadialChart>
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={6}>
            <Paper style={{ height: "100%" }} className={classes.paper} variant={"outlined"}>
              <CountryMap mapData={mapData} colorMap={colorMap} feature={feature} setRadialCountry={setRadialCountry} />
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper} variant={"outlined"}>
              <ScatterPlot1 data={scatterData} feature={feature} />
            </Paper>
          </Grid>
        </Grid>


        <Grid container style={{ height: "38vh", width: "100vw" }}>
          <Grid style={{ height: "100%" }} item xs={6}>
            <Paper style={{ height: "100%" }} className={classes.paper} variant={"outlined"}>
              <ParallelChart data={parallelData} setPieData={setPieData} />
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper} variant={"outlined"}>
              <svg style={{ height: "100%", width: "100%" }}>
              </svg>
            </Paper>
          </Grid>
          <Grid style={{ height: "100%" }} item xs={3}>
            <Paper style={{ height: "100%" }} className={classes.paper} variant={"outlined"}>
              <ScatterPlot data={scatterData} feature={feature} />
            </Paper>
          </Grid>
        </Grid>


      </Container>
    </ThemeProvider>
  );
}

export default App;
