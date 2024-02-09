import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { DialogContent, Dialog, buttonBaseClasses } from '@mui/material';
import CategorySelector from '../CategorySelector/CategorySelector'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import CheckoutPage from '../CheckoutPage/CheckoutPage';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

function OrderPage() {
  const dispatch = useDispatch();
  const menu = useSelector((store) => store.menu);
  const cart = useSelector((store) => store.cart)
  const total = useSelector((store) => store.total)
  const cartCount = useSelector((store) => store.cartCount )
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useHistory()

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

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE', payload: index });
  };

  const handleAdd = (item) => {

    dispatch({
      type: 'ADD',
      payload: {
        id: item.menu_item_id,
        name: item.name,
        description: item.description,
        price: item.price,
        url: item.url,
        quantity: 1
      }})}

    const handleCheckout = () => {
      history.push('/Checkout')
    }

  return (
    <main style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3%' }}>
      <div style={{ width: '20%' }}>
        <CategorySelector />
       </div>
      <div style={{ width: '80%' }}>
        <Grid  container spacing={0.75}>
          {menu.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={2.8} >
              <Card
                sx={{
                  border: '2px solid',
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
                      sx={{
                        borderRadius: '35%',
                        cursor: 'pointer',
                        marginRight: '5px',
                        marginTop: '10px',
                        color: 'white',
                        backgroundColor:"black"
                      }}
                      onClick={() => openModal(item)}
                    />
                    <Chip
                      label="Add"
                      sx={{
                        borderRadius: '35%',
                        cursor: 'pointer',
                        marginTop: '10px',
                        color: "white",
                        backgroundColor:"#087c69"
                      }}
                        onClick={() => handleAdd(item)}
                    />
                   </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Drawer
  anchor="right"
  open={drawerOpen}
  onClose={closeDrawer}
  variant="temporary"
  PaperProps={{
    sx: { width: "20%" },
    fontSize: "300%",
  }}
>
  <ul>
  <p  style={{ fontSize: "150%", textAlign: 'center', marginRight:'35px' }}>Cart</p>
    {cart.map((cartItem, index) => (
      <p key={cartItem.id}>
        <button onClick={() => handleRemove(index)}>X</button> {cartItem.name} {cartItem.price}
      </p>
    ))}
  </ul>
  <h5 style={{ fontSize: "150%", textAlign: 'center', }}>Total: ${total}</h5>
  <Button sx={{
                  border: '2px solid',
                  color: 'green'
                }} onClick={() => handleCheckout()}>CHECKOUT</Button>
</Drawer>


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
      <p>{cartCount}</p>
      <div style={{ width: '8%' }}>
        <ShoppingCartIcon 
          sx={{
            cursor: 'pointer',
            marginRight: '10px',
            color: "#087c69",
            fontSize: "300%",
          }}
          onClick={() => setDrawerOpen(true)} 
        />
         <p style={{ marginRight: '80%' }}
         >Total ${total}</p>
      </div>
    </main>
  );
}

export default OrderPage;