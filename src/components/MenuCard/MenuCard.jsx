// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';


// function MenuCard({ item }) {
//     const dispatch = useDispatch();
//     const menu = useSelector(store => store.menu);


      
//       return (
//         <Card variant="outlined">
//           <CardContent>
//             <h2>{item.name}</h2>
//             <p>{item.description}</p>
//             <p>Price: {item.price}</p>
//             <img src={`/images/${item.img}`} alt={item.name} />
//           </CardContent>
//           <CardActions>
//             <Stack direction="row" spacing={2}>
//               <Button variant="outlined" onClick={() => {
//                 // Dispatch your ADD TO CART action here
//                 dispatch({ type: 'ADD_TO_CART', payload: item });
//               }}>
//                 ADD TO CART
//               </Button>
//             </Stack>
//           </CardActions>
//         </Card>
//       );
//     }
  
//   export default MenuCard;