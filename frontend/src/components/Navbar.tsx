import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchProductsQuery } from '../store/api/product.api'
import { useDebounce } from '../hooks/debounce'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/action'

const Navbar: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth)
  const { logout } = useActions()
  const [dropdown, setDropdown] = useState<boolean>(false)
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState<string>('')
  const debounced = useDebounce(searchText)
  const { data: searchedProducts, isLoading: searchedProductsIsLoading } =
    useSearchProductsQuery(debounced, {
      skip: debounced.length < 3,
      refetchOnFocus: true,
    })

  useEffect(() => {
    setDropdown(debounced.length > 2)
  }, [debounced, searchedProducts])

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const onSearchProduct = (productId: number) => {
    setDropdown(false)
    setSearchText('')
    navigate(`/product/${productId}`)
  }
  return (
    <nav className="h-20 bg-gray-800 flex justify-start items-center space-x-6 px-10">
      <Link to={`/`} className="text-white text-2xl font-medium">
        Proshop
      </Link>

      <div
        className="flex-row hidden md:flex relative"
        onMouseLeave={() => setDropdown(false)}
      >
        <input
          type="text"
          className="focus:outline-none p-3 md:w-96"
          value={searchText}
          onChange={onSearchInputChange}
          placeholder="Type more than 2 char..."
        />
        {dropdown && (
          <div className="absolute top-[48px] left-0 right-32 max-h-[200px] w-96 shadow-md bg-white overflow-y-auto z-30 rounded-b-lg scrollbar-hide">
            {searchedProducts?.length === 0 && (
              <p className="flex flex-row justify-start items-center p-2">
                No results
              </p>
            )}
            {searchedProductsIsLoading && (
              <p className="flex flex-row justify-start items-center p-2">
                Loading...
              </p>
            )}
            {searchedProducts?.map((product) => (
              <div
                className="py-2 px-4 flex flex-row justify-start items-center text-sm hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                key={product.id}
                onClick={() => onSearchProduct(product.id)}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-[3rem] mr-2 rounded-md"
                />{' '}
                {product.name}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center px-2 uppercase text-md border-2 border-green-500 font-medium text-green-500 hover:text-white hover:bg-green-500 cursor-pointer">
          Search
        </div>
      </div>
      <div className=" flex-row space-x-6 hidden md:flex cursor-pointer">
        <Link to={`/cart`} className="text-gray-500 text-xl hover:text-white">
          Cart
        </Link>
        <div className="relative group">
          <h2 className="text-gray-500 text-xl group-hover:text-white">
            {userInfo ? (
              userInfo.name
            ) : (
              <Link
                to={`/sign-in`}
                className="text-gray-500 text-xl hover:text-white"
              >
                Login
              </Link>
            )}
          </h2>
          {userInfo && (
            <div className="hidden bg-white rounded-lg shadow-md p-1 w-40 absolute top-7 z-50 group-hover:block">
              <ul className="flex flex-col space-y-2 px-2 py-1">
                <li
                  className="hover:bg-gray-300 rounded-md px-1"
                  onClick={() => logout()}
                >
                  Logout
                </li>
                <Link
                  to={`/profile`}
                  className="hover:bg-gray-300 rounded-md px-1"
                >
                  Profile
                </Link>
                {userInfo?.isAdmin && (
                  <Link
                    to={`/admin`}
                    className="hover:bg-gray-300 rounded-md px-1"
                  >
                    Admin
                  </Link>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
