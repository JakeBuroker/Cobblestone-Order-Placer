import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';


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
        <div className="container">
          <ul>
            {menu.map((item) => (
              <li  max-width="10px" key={item.id}>
                {item.name}: {item.description} {item.price} <img  src={`/src/images/${item.img}`} ></img>
              </li>
            ))}
          </ul>
        </div>
      );
            }  

export default OrderPage;