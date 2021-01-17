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
import Chip from '@material-ui/core/Chip';
import { useState } from 'react';
import './App.css';

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

  const filteredData = data;
  const [query, setQuery] = useState("");
  const tags = [];

  function retrieveRandom() {
    console.log("Random called");
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <Container className={classes.cardGrid} maxWidth="md">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <h1>Relationship Roulette</h1>
        <p>{data.length} ideas to bring some adventure to your relationship! </p>
        <Grid container spacing={4} alignItems={"center"}>
          <Box m={1}> 
            <Button variant="contained" color="primary" onClick={() => setQuery("him")}>For him</Button>
          </Box>
          <Box m={1}> 
            <Button variant="contained" color="primary" onClick={() => setQuery("her")}>For her</Button>
          </Box>
          <Box m={1}> 
            <Button variant="contained" color="primary" onClick={() => setQuery("gift")}>Gifts</Button>
          </Box>
          <Box m={1}> 
            <Button variant="contained" color="primary" onClick={() => setQuery("date")}>Date ideas</Button>
          </Box>
        </Grid>
         _
        <Grid container spacing={4} align>
          <Box m={1}> 
            <Button variant="contained" color="primary" onClick={() => retrieveRandom()}>Gimme a random idea</Button>
            </Box>
        </Grid>
      </header>

      <Container maxWidth="md">
        
      </Container>

      <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

            {data.filter(data => data.tags.includes(query)).map((filteredData, index) => (

            // {filteredData && filteredData.map((poll) => (
              <Grid item key={index} xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={"https://source.unsplash.com/random/640x360/?sig="+index}
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
                  <Grid>
                    <Chip label={filteredData.tags.split(',')[0]} variant="outlined" />
                    <Chip label={filteredData.tags.split(',')[1]} variant="outlined" />
                    <Chip label={filteredData.tags.split(',')[2]} variant="outlined" />
                    <Chip label={filteredData.tags.split(',')[3]} variant="outlined" />
                  </Grid>
                  
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions> */}
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