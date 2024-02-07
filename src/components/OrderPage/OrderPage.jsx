import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function OrderPage() {
  const dispatch = useDispatch();
  const menu = useSelector((store) => store.menu);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    axios
      .get('/api/menu')
      .then((response) => {
        console.log('Menu: ', response.data);
        dispatch({ type: 'SET_MENU_ITEMS', payload: response.data });
      })
      .catch((error) => {
        console.error(error);
        alert('Could not fetch menu! It is broken');
      });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '25%' }}>
       
      </div>
      <div style={{ width: '70%' }}>
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
                  src={`/images/${item.url}`}
                  sx={{
                    height: 150,
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
                        borderRadius: '40%',
                        cursor: 'pointer',
                      }}
                      onClick={() => openModal(item)}
                    />
                    <Button
                      variant="filled"
                      size="small"
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
      </div>

      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogContent>
          {selectedItem && (
            <div>
              <Typography variant="h5">{selectedItem.description}</Typography>
              <img
                style={{ maxWidth: "100%", height: 'auto' }}
                src={`/images/${selectedItem.url}`}
                alt="image"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default OrderPage;
