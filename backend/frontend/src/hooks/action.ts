import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { productActions } from '../store/slices/product.slice'
import { uiActions } from '../store/slices/ui.slice'
import { cartActions } from '../store/slices/cart.slice'
import { authActions } from '../store/slices/auth.slice'

const actions = {
  ...productActions,
  ...uiActions,
  ...cartActions,
  ...authActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
