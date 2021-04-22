import './App.css';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import { green, orange } from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

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
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing = {4}>
          <Grid items>
            <div id="1">
              <svg></svg>
            </div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
    );
}

export default App;
