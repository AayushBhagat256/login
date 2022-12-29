import React, { useEffect, useState } from 'react'
import './Homepage.css'
//import Cards from './Card'
//import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {  grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
//import photo from './21547.jpg'
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Homepage() {
  useEffect(
    ()=>{
      Aos.init({duration:2000});
    },[]
  )
  let username = localStorage.getItem("name");
  let access = localStorage.getItem("accessToken")
  //console.log(username)
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const settingfun = () => {
    console.log("setting clicked")


  }
  const [entry,setEntry]=useState([])
  useEffect(() => {
      getData();
    }, [])
    let linkurl = "https://therecipepool.pythonanywhere.com/"
  const getData=()=>{
    //var axios = require('axios');
var data = JSON.stringify({
  "meal": [
    "breakfast"
  ]
});

var config = {
  method: 'post',
  url: 'https://therecipepool.pythonanywhere.com/api/filter-meal/',
  headers: { 
    'Authorization': 'Bearer '+access, 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  console.log(response.data[0])
  console.log(response.data[0].id)
  setEntry(response.data)
  // let k = response.data.length()
  // console.log(k);
})
//.then((objdata)=>{setEntry(objdata.data)})
.catch(function (error) {
  console.log(error);
});

  }
  useEffect(
    ()=>{
      getData();
    },[]
  )

let val;
let val1;
const clickcheck=()=>{
  console.log("dinner clicked")
   val = document.getElementById("dinner").value
  console.log(val)
  
}
const clickcheck2=()=>{
  
  val1 = document.getElementById("break").value
  console.log(val1)
}
const clickcheck1=()=>{
  
  val = document.getElementById("meal").value
  console.log(val)
}

  return (
    <div className='mainbody'>
      <div className="welcome">Welcome , {username}</div>
      <div className="select">
        <Button variant="contained" onClick={clickcheck2} value= 'breakfast' id='break' className='mx-1'>BreakFast</Button>
        <Button variant="contained" onClick={clickcheck1} value= 'meal' id='meal'className='mx-1'>Lunch</Button>
        <Button variant="contained" onClick={clickcheck} value = 'dinner' id='dinner'className='mx-1'>Dinner</Button>
        
      </div>
      {/* lets make a grid here */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} >
          {
            entry.map(map=>
              <Grid data-aos="fade-up" item xs={6} md={3} >
              <Item >
                <div className="card mx-1">
                  <Card sx={{ maxWidth: 345, bgcolor: grey[900] }}>
                    <CardHeader sx={{ color: 'white' }}
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
  
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings" sx={{ color: 'white' }} onClick={settingfun}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={map.cuisine.cuisine_name}
                      subheaderTypographyProps={{ color: 'white' }}
                      subheader={map.label}
  
                    />
  
                    <CardMedia
                      component="img"
                      height="194"
                      //image={photo}
                      image={linkurl+map.image}
                      alt="Paella dish"
                    />
                    
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" sx={{ color: 'white' }} className='like'>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share" sx={{ color: 'white' }} className='share'>
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        sx={{ color: 'white' }}
                        className='showmore'
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph sx={{ color: 'white' }}>Method:</Typography>
                        <Typography sx={{ color: 'white' }}>
                          {
                             map.steps_list.map(
                              map2=>
                              // <p>{map2.id}</p>
                              <p>{map2.steps}</p>
                             )
                         }
                        </Typography>
                        
                      <Typography variant="body2" color="text.secondary" className='des' sx={{ color: 'white' }}>
                        <span className='des'>Ingridients:</span>
                        {
                          map.ingredient_list.map(
                            map3=>
                            <div className="ingri">
                            <p className='des'>{map3.name}</p>
                            <p className='des'>Quantity : {map3.quantity}</p>
                            </div>
                            
                          )
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className='des' paragraph sx={{ color: 'white' }}>
                        <span className='des'>Why its healthy ??</span>
                        <p className='des'>{map.healthLabels}</p>
                      </Typography>
                    
                        <Typography paragraph sx={{ color: 'white' }}>
                          Health label :
                          
                        {/* <p>{map.ingredient_list.name}</p> */}
                         {/* <p>{getIngridents()}</p>  */}
                        </Typography>
                        <Typography paragraph sx={{ color: 'white' }}>
                          Total Nutrients:
                          <p>{map.totalNutrients}</p>
                        </Typography>
                        <Typography sx={{ color: 'white' }}>
                          Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                      </CardContent>
                      <CardContent>
                      
                    </CardContent>
                    </Collapse>
                  </Card>
                </div>
              </Item>
            </Grid>  
            )
          }
          {/* <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid> */}
          
          {/* #one more */}
          </Grid>
      </Box>

    </div>
  )
}

export default Homepage
