import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import { select, /*transition,*/ line, axisBottom, scaleLinear } from 'd3'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green, orange } from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
// import CountryMap from './CountryMap'

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

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20])
  const svgRef = useRef()

  // var t = transition().duration(750)

  useEffect(()=> {
    //make API calls here
    console.log("hello, world!")
  }, [data])
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container  justify={"space-evenly"} spacing={4}>

          <Grid items lg= {3}>
            <svg></svg>
          </Grid>

          <Grid items lg={6}>
              {/* <CountryMap /> */}
          </Grid>

          <Grid items lg= {3}>
            <svg></svg>
          </Grid>

        </Grid>
      </Container>
    </ThemeProvider>
    );
}

export default App;
