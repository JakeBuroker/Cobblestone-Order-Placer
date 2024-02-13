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
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

function OrderPage() {
  const dispatch = useDispatch();
  const menu = useSelector((store) => store.menu);
  const cart = useSelector((store) => store.cart)
  const total = useSelector((store) => store.total)
  const categories = useSelector((store) => store.categories)
  const cartCount = useSelector((store) => store.cartCount )
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const history = useHistory()

  useEffect(() => {
    fetchMenu();
    fetchCategories()
  }, []);

  const USD = (number) => {
    if (number == 0) {
      return '$0.00';
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  };


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

  const fetchMenuCategories = (categoryId) => {
    axios.get(`/api/categories/${categoryId}`)
      .then((response) => {
        dispatch({ type: 'SET_MENU_ITEMS', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching menu items by category:', error);
        alert('Could not fetch menu items for the selected category.');
      });
  };
const fetchCategories = () => {
  axios
    .get('/api/categories')
    .then((response) => {
      console.log('Menu: ', response.data);
      dispatch({ type: 'SET_CATEGORIES', payload: response.data });
    })
    .catch((error) => {
      console.error(error);
      alert('Could not fetch menu! It is broken');
    });
};

  const handleCategoryChange = (event, categoryId) => {
    fetchMenuCategories(categoryId);
    console.log(categoryId)
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

  const handleRemove = (index, price) => {
    dispatch({ type: 'REMOVE', payload: { index, price } });
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
      <main style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3%', gap: '15px' }}>
      <div style={{ width: '12%' }}>
        <Typography align="end" variant="h6" sx={{ marginBottom: 2 }}>
         <b> Categories</b>
        </Typography>
        <ToggleButtonGroup
          orientation="vertical"
          value={selectedCategories.category_id}
          onChange={handleCategoryChange}
          
          exclusive
          sx={{ marginLeft:"20px",display: 'flex', flexDirection: 'column', gap: 1, }}
        >
          {categories.map((category) => (
            <ToggleButton key={category.category_id} value={category.category_id} sx={{ width: '125.5%',justifyContent: 'center' }}>
              <b>{category.name}</b>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
        <div style={{ width: '79%', }}>
          <Grid container spacing={2}>
            {menu.map((item, index) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={2.25}>
                <Card sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',     
                  border: '1.5px solid black',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  },
                }}>
                  <CardMedia
                    component="img"
                    src={`/images/${item.url}`}
                    sx={{
                      height: 142,
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                      borderBottom: '1.75px solid',  

                      
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, height: "95px", padding: '0.5px', backgroundColor: "hsl(60, 73%, 94%)",
                         }}>
                  
                      <tr style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '15px' }}>{item.name} </tr>
                      <tr style={{ display: 'flex', justifyContent: 'center', gap: '5px'}}> ${item.price}</tr>
                   
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '20px' }}>
                      <Chip
                        label="Details"
                        onClick={() => openModal(item)}
                        sx={{
                          borderRadius: '20px',
                          cursor: 'pointer',
                          color: '#027662',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundcolor: "hsl(60, 73%, 95%)",
                          },
                        }}
                      />
                      <Chip
                        label="Add"
                        onClick={() => handleAdd(item)}
                        sx={{
                          borderRadius: '20px',
                          cursor: 'pointer',
                          backgroundColor:"#027662;" ,
                          color: "white",
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: "#035a4c",
                          },
                        }}
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
    sx: {
      width: "20%",
      fontSize: "1rem",
      backgroundColor: "#087c69",
      color: "white", 
    }
  }}>
  <Typography  variant="h6" component="p" sx={{ 
      fontSize: "1.4rem", 
      textAlign: 'center', 
      fontWeight: 'bold', 
      color: "white", 
      marginBottom: "0px", backgroundColor: "#087c69"
       
      
     
    }}>
    Cart
  </Typography>
  <ul style={{  listStyle: 'none', padding: 5 }}>
    {cart.map((cartItem, index) => (
      <li key={cartItem.id} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: "10px",
          
        }}>
        <span>{cartItem.name} {USD(cartItem.price)}</span>
        <Button 
          onClick={() => handleRemove(index, cartItem.price)}
          sx={{ 
            minWidth: "20px", 
            padding: 1, 
            marginLeft: "10px", 
            color: 'white', 
            borderColor: 'white', 
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
            },
          }}
        >
          X
        </Button>
      </li>
    ))}
  </ul>
  <Typography variant="h6" sx={{ 
      fontSize: "1.25rem", 
      textAlign: 'center', 
      marginTop: "20px", 
      marginBottom: "20px", 
    }}>
    Total: {USD(total)}
  </Typography>
  <Button 
    fullWidth 
    variant="contained" 
    sx={{
      color: '#087c69',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        
      },
    }} 
    onClick={() => handleCheckout()}
  >
    CHECKOUT
  </Button>
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
     
      <div style={{ marginRight: "-27.5px",marginBottom: "2250px",display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '2.5%' }}>
  <ShoppingCartIcon 
    sx={{
      cursor: 'pointer',
      color: "#027662",
      fontSize: "3rem",
      '&:hover': {
        borderRadius: "10px 10px 10px 10px",
        backgroundColor: "hsl(60, 73%, 95.5%)"}
    }}
    onClick={() => setDrawerOpen(true)}
  />
  <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-end', 
      paddingRight: '3rem',
      
      textAlign: 'right',
    }}>
    <p style={{ 
      color: "#027662", 
      margin: 0, 
      fontSize: '1rem', 
    }}>
      {cartCount} items
    </p>
    <p style={{ 
      margin: 0, 
      fontSize: '1.25rem', 
      fontWeight: 'bold', 
    }}>
      Total {USD(total)}
    </p>
  </div>
</div>
    </main>
  );
}

export default OrderPage;