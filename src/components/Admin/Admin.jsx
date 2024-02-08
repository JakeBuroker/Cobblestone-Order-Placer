
import { useEffect } from "react";
import axios from "axios";


function Admin() {

useEffect(() => {
    fetchOrders();
  }, []);

    const fetchOrders = () => {
        axios
          .get('/api/orders')
          .then((response) => {
            console.log('order: ', response.data);
          })
          .catch((error) => {
            console.error(error);
            alert('Could not fetch orders! It is broken');
          });

return(
<h1>Admin</h1>

)

    }
}





export default Admin