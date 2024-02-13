// import axios from "axios"
// import { useSelector } from "react-redux"
// import {url} from "../App/Api"

// const PayButton = ({cartItems}) => {
// const user  = useSelector(store => store.user)
//     const handleCheckout = () => {
// axios.post(`${url}/stripe/create-checkout-session`, {cartItems,
// userId: user.id
// }) .then ((res) => {
//     if (res.data.url){
//         window.location.href = res.data.url
//     }
// }).catch((err) => {
//     console.log(err)
// })
//     }
    
//     return (
//         <button style={{cursor: 'pointer', backgroundColor:'#5433FF', color: 'white', height: '37.5px', fontSize: "108%" }} onClick={() => handleCheckout()}> Pay Online with Stripe</button>
//     )
// }
// export default PayButton