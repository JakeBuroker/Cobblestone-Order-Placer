import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function OrderPlacedPage() {
const history = useHistory()

return (
    <div>
    <h1>Order Placed!</h1>

<button onClick={() => history.push("/user")}>View Order</button>
    <button onClick={() => history.push("/home")} >Return Home</button>
    </div>
)}



export default OrderPlacedPage