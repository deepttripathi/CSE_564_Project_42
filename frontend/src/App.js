import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}


// import './App.css';
// import React, { useState, /*useRef,*/ useEffect } from 'react'
// // import { select, /*transition,*/ line, axisBottom, scaleLinear } from 'd3'
// import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
// import { green, orange } from '@material-ui/core/colors'
// import Container from '@material-ui/core/Container'
// import Grid from '@material-ui/core/Grid'
// import BarChart from './charts/BarChart'
// import CountryMap from './charts/CountryMap'

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: green[500]
//     },
//     secondary: {
//       main: orange[500]
//     }
//   }
// })

// function App() {
//   const [mapData, setMapData] = useState([{}])
//   const [radialData, setRadialData] = useState([{}])
//   const [colorMap, setColorMap] = useState([{}])
//   // const [pieData, setPieData] = useState([{}])
//   // const [populationData, setPopulationData] = useState([{}])
//   // const [religionData, setReligionData] = useState([{}])
//   // const [pcpData, setPcpData] = useState([{}])

//   // const svgRef = useRef()

//   // var t = transition().duration(750)
//   const fetchMapData = async()=> {
//     const response = await fetch('/get_map_data/Score',{
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         "Access-Control-Allow-Origin" : "*", 
//         "Access-Control-Allow-Credentials" : true 
//       }
//     })
//     const data = await response.json()
//     return data
//   }

//   const fetchRadialData = async()=> {
//     const response = await fetch('/get_bar_chart_data/India',{
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         "Access-Control-Allow-Origin" : "*", 
//         "Access-Control-Allow-Credentials" : true 
//       }
//     })
//     const data = await response.json()
//     return data
//   }

//   const fetchColorMap = async()=> {
//     const response = await fetch('/get_color_map/Score', {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         "Access-Control-Allow-Origin" : "*", 
//         "Access-Control-Allow-Credentials" : true 
//       }
//     })
//     const data = await response.json()
//     return data
//   }

//   // const fetchPieData = async()=> {
//   //   const response = await fetch('/get_bar_chart_data/India',{
//   //     method: "GET",
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       "Access-Control-Allow-Origin" : "*", 
//   //       "Access-Control-Allow-Credentials" : true 
//   //     }
//   //   })
//   //   const data = await response.json()
//   //   return data
//   // }

//   // const fetchPopulationData = async()=> {
//   //   const response = await fetch('/get_internet_data/Score',{
//   //     method: "GET",
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       "Access-Control-Allow-Origin" : "*", 
//   //       "Access-Control-Allow-Credentials" : true 
//   //     }
//   //   })
//   //   const data = await response.json()
//   //   return data
//   // }

//   // const fetchReligionData = async()=> {
//   //   const response = await fetch('/get_religion_data/Score',{
//   //     method: "GET",
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       "Access-Control-Allow-Origin" : "*", 
//   //       "Access-Control-Allow-Credentials" : true 
//   //     }
//   //   })
//   //   const data = await response.json()
//   //   return data
//   // }

//   // const fetchPcpData = async()=> {
//   //   const response = await fetch('/get_bar_chart_data/India',{
//   //     method: "GET",
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       "Access-Control-Allow-Origin" : "*", 
//   //       "Access-Control-Allow-Credentials" : true 
//   //     }
//   //   })
//   //   const data = await response.json()
//   //   return data
//   // }
//   useEffect(async ()=> {
//     //make API calls here
//     console.log('start')
//     const mapData_from_api = await fetchMapData()
//     const radialData_from_api = await fetchRadialData()
//     const colorMap_from_api = await fetchColorMap()
//     // const pieData_from_api = await fetchPieData()
//     // console.log('pieData:', pieData_from_api)
//     // const populationData_from_api = await fetchPopulationData()
//     // console.log('populationData:', populationData_from_api)
//     // const religionData_from_api = await fetchReligionData()
//     // console.log('religionData:', religionData_from_api)
//     // const pcpData_from_api = await fetchPcpData()
//     // console.log('pcpData:', pcpData_from_api)

//     setMapData(mapData_from_api)
//     setRadialData(radialData_from_api)
//     setColorMap(colorMap_from_api)
//     // setPieData(pieData_from_api)
//     // setPopulationData(populationData_from_api)
//     // setReligionData(religionData_from_api)
//     // setPcpData(pcpData_from_api)
//   }, [])

//   //add an option bar
//   return (
//     <ThemeProvider theme={theme}>
//       <Container>

//           <Grid items lg= {3} style={{padding: 8}}>
//             <BarChart width={500} height={400} data={radialData}></BarChart>
//           </Grid>

//           <Grid items lg={6} style={{padding: 8}}>
//               <CountryMap mapData={mapData} colorMap={colorMap} />
//           </Grid>

//           <Grid items lg= {3} style={{padding: 8}}>
//           </Grid>
//       </Container>
//     </ThemeProvider>
//     );
// }

// export default App;
