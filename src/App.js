import theme from './Theme'
import data from './Data'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import './App.css';
// import './blendIn.js';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function App() {

  const classes = useStyles();

  const [game, setGameID] = useState("");

  function createNewGame() {
    let newID = newRandomID();
    window.history.pushState("object or string", "", "/"+newID);
    setGameID(newID);
  }
  function newRandomID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 22 characters
    // after the decimal.
    return '' + Math.random().toString(24).substr(2, 4).toUpperCase();
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <Container className={classes.cardGrid} maxWidth="md">
      <header className="App-header">
        <h1>Blend In!</h1>
        <p>The social deduction game!</p>
        <p>Room code {game}</p>
        <Grid container spacing={4} alignItems={"center"}>
          <Box m={1}> 
            <Button variant="contained" color="primary" onClick={() => createNewGame()}>Create new game!</Button>
          </Box>
        </Grid>
         _
      </header>

      <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

            {data.filter(data => data).map((filteredData, index) => (

            // {filteredData && filteredData.map((poll) => (
              <Grid item key={index} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={""+index} 
                    title= {filteredData.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {filteredData.title}  
                    </Typography>
                    <Typography>
                      Description goes here.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;