import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const itemAlreadyExist = cartList.find(
      eachItem => eachItem.id === product.id,
    )
    // console.log(itemAlreadyExist)
    if (itemAlreadyExist === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.onIncrementQuantityCartItem(itemAlreadyExist.id)
    }
  }

  removeCartItem = uniqueId => {
    const {cartList} = this.state
    // console.log(cartList)
    const updatedList = cartList.filter(
      eachProduct => eachProduct.id !== uniqueId,
    )
    // console.log(updatedList)
    if (updatedList.length !== 0) {
      this.setState({cartList: updatedList})
    } else {
      this.setState({cartList: []})
    }
  }

  onIncrementQuantityCartItem = uniqueId => {
    const {cartList} = this.state
    const getCartItem = cartList.find(eachItem => eachItem.id === uniqueId)
    // console.log(getCartItem)
    const newCartList = cartList.filter(
      eachProduct => eachProduct.id !== uniqueId,
    )
    // console.log(newCartList)

    const updatedQuantity = getCartItem.quantity + 1
    const updatedProduct = {...getCartItem, quantity: updatedQuantity}
    if (newCartList.length > 0) {
      this.setState({
        cartList: [newCartList, updatedProduct],
      })
    } else {
      this.setState({
        cartList: [updatedProduct],
      })
    }

    // console.log(updatedProduct)
  }

  onDecrementQuantityCartItem = uniqueId => {
    const {cartList} = this.state
    const getCartItem = cartList.find(eachItem => eachItem.id === uniqueId)
    // console.log(getCartItem)

    // console.log(newCartList)
    if (getCartItem.quantity > 1) {
      const newCartList = cartList.filter(
        eachProduct => eachProduct.id !== uniqueId,
      )
      const updatedQuantity = getCartItem.quantity - 1
      const updatedProduct = {...getCartItem, quantity: updatedQuantity}
      if (newCartList.length > 0) {
        this.setState({
          cartList: [newCartList, updatedProduct],
        })
      } else {
        this.setState({
          cartList: [updatedProduct],
        })
      }
    } else {
      this.removeAllCartItems()
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.onIncrementQuantityCartItem,
          decrementCartItemQuantity: this.onDecrementQuantityCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
