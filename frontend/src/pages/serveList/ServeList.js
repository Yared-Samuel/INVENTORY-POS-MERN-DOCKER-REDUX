import React, {useEffect} from 'react'
// import "./AddServe.scss"
import { SpinnerImg } from '../../components/loader/Loader'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from "react-icons/ai"
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import { getServes } from '../../redux/features/serve/serveSlice'
import ButtonPrimary from '../../components/button/ButtonPrimary'

const ServeList = () => {

  const dispatch = useDispatch()
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  const navigate = useNavigate()


  useRedirectLoggedOutUser("/login");

  const goCreateservice = () =>{
    navigate("/add-serve")
  }

  const {serves, isLoading, isError, message} = useSelector((state)=>state.serve)
 
  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getServes())
    }    

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Services</h3>
          </span>
          {/* <span>
            <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
          </span> */}
        </div>
        <ButtonPrimary  onClick = {goCreateservice} names="New serve (አዲስ አገልግሎት)" className="--btn --btn-primary button-create"/>

        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoading && serves.length === 0 ? (
            <p>No products found!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Code</th>
                  <th>Serveice Name</th>
                  <th>Selling Price</th>
                  <th>Measured By</th>
                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    serves.map((serve, index)=>{
                    const {_id, serveName, serveCode, servePrice, serveMeasure} = serve
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{serveCode}</td>
                        <td>{serveName}</td>
                        <td>{servePrice}</td>
                        <td>{serveMeasure}</td>
                        
                        <td className='icons'>
                          <span>
                            <AiOutlineEye size={25} color='purple'/>
                          </span>
                          <span>
                            <FaEdit size={20} color='green'/>
                          </span>
                          <span>
                            <FaTrashAlt size={20} color='red'/>
                          </span>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )}
        </div>
        {/* <ReactPaginate
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
      /> */}
      </div>
    </div>
  )
}

export default ServeList