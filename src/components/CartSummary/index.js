// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity
      })
      console.log(total)
      return (
        <>
          <h1 className="price-head">
            <span className="span-ele">Order Total:</span> Rs {total}/-
          </h1>
          <p className="item-para">{cartList.length} items in cart</p>
          <button type="button" className="check-button">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
