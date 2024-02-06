import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

function OrderPage() {
  const dispatch = useDispatch();
  const menu = useSelector(store => store.menu);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    axios.get('/api/menu')
      .then(response => {
        console.log('Menu: ', response.data)
        dispatch({ type: 'SET_MENU_ITEMS', payload: response.data })
      })
      .catch(error => {
        console.error(error)
        alert('Could not fetch menu! It is broken')
      })
  }

  return (
    <main>
   
      <Grid container spacing={2}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                height: '100%',
              }}
            >
            
            <CardMedia
  component="img"
  src={`/images/${item.img}`}  
  sx={{
    height: 225,
  }}
/>
              <CardContent>
                <Typography
                  variant="body1"
                  nowrap="true"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <b>{item.name}</b>
                </Typography>
                <div style={{ textAlign: 'center' }}>
                  <Chip
                    label="Details"
                    variant="filled"
                    sx={{
                      borderRadius: '75%',
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                      marginTop: '10px',
                    }}
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default OrderPage;
