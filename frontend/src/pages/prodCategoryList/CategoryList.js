import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice"
import { getProdCat } from '../../redux/features/productCategory/categorySlice'
import "./CategoryList.css"
import { SpinnerImg } from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ButtonPrimary from '../../components/button/ButtonPrimary'

const CategoryList = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()


  const goCreateProduct = () =>{
    navigate("/add-prodCat")
  }

  const {categories, isLoading, isError, message} = useSelector((state)=>state.category)

  useEffect(() => {
   if (isLoggedIn === true) {
    dispatch(getProdCat())
   }
   if(isError){
    console.log(message)
   }
    
  }, [dispatch, isLoggedIn, message, isError])


  // Begin Pagination

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(categories.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(categories.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, categories]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % categories.length;

    setItemOffset(newOffset);
  }
   
  // End pagination
  
  return (
    <div className='product-list'>
    <hr />
    <div className='table'>
      <div className='--flex-between --flex-dir-column'>
        <span>
          <h3>Product Category</h3>
        </span>
        <span>
          {/* <Search value={search} onChange={(e)=> setSearch(e.target.value)}/> */}
        </span>
      </div>
      <ButtonPrimary  onClick = {goCreateProduct} names="New Category (አይነት ፍጠር)" className="--btn --btn-primary button-create"/>

      {isLoading && <SpinnerImg />}
      <div className='table'>
        {!isLoading && categories.length === 0 ? (
          <p>No products found!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Description</th>
                
              </tr>
            </thead>
            <tbody>
              {
                currentItems.map((category, index)=>{
                  const {_id,  name, description} = category
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{description}</td>
                      
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )}
      </div>
      <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="< Prev"
      renderOnZeroPageCount={null}
      containerClassName='pagination'
      pageLinkClassName='page-num'
      previousLinkClassName='page-num'
      nextLinkClassName='page-num'
      activeLinkClassName='activePage'
    />
    </div>
  </div>
  )
}

export default CategoryList