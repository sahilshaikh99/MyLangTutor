import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


//Home page
const Home = () => {

    const navigate = useNavigate();
    const languages = [
        {
            name: "Hindi",
            code: "hi"
        },
        {
            name: "Spanish",
            code: "es"
        },
        {
            name: "Japanese",
            code: "ja"
        },
        {
            name: "French",
            code: "fr"
        }
    ]
    const generateCard = (name: string, code: string) => (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => languageSelectHandler(code)}>Learn More</Button>
          </CardActions>
        </React.Fragment>
      );
    const LanguageList = languages.map((data) => {
       return( 
        <Grid item xs={6}>

        <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{generateCard(data.name, data.code)}</Card>
        </Box>
        </Grid>)

    })

    const languageSelectHandler = (language: string): void => {
        navigate(`/learn?language=${language}`);
    }
    return <div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> 
        {LanguageList}
        </Grid>

       </div>
}
export default Home;