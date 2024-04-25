import React, {useEffect, useState} from 'react'
import "./productList.scss"
import { SpinnerImg } from '../../components/loader/Loader'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from "react-icons/ai"
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from "../../redux/features/product/productSlice"
import { useNavigate } from 'react-router-dom'
import Search from '../../components/search/Search'
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component'
import ButtonPrimary from '../../components/button/ButtonPrimary'

const customStyle = {
  table: {
    style: {
      width: "100%",
      margin: "0",
      padding: "2px",
    },
  },
  header: {
    style: {
      width: "100%",
      margin: "0",
      padding: "0",
    },
  },
  pagination: {
    style: {
      width: "100%",
      height: "5px",
      margin: "0",
      padding: "0",
      color: "White",
      backgroundColor: "#47A992"
    },
  },
      rows: {
        style: {
          fontSize: "1.2rem",
          padding: "0",
          margin: "0", 
        },
      },
  
      headCells: {
        style: {
          fontSize: "1.6rem", 
          backgroundColor: "#47A992",
          color: "white",
        }
      },
      cells: {
        style: {
          fontWeight: "bold",
          borderStyle: "solid",
          borderWidth: "0.02px",
          borderColor: "#47A992",
          color: "black",
          backgroundColor: "white",
          fontSize: "1.5rem",
        }
      },
 }

const ProductList = () => {

  const dispatch = useDispatch()
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  const navigate = useNavigate()



  const [filterText, setFilterText] = useState("");
    
    

  useRedirectLoggedOutUser("/login");
 

  const goCreateProduct = () =>{
    navigate("/add-product")
  }
  const goCreateProductCategory = () =>{
    navigate("/add-prodCat")
  }
  const goToCategory = () =>{
    navigate("/prodCat")
  }

  const columns = [
    {
      name: "Product",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: "Measurment",
      selector: (row) => row.measurment,
      sortable: true,
    },
    {
      name: "Sub Measurment",
      selector: (row) => row.sub_measurment,
    },
    {
      name: "Measurment Value",
      selector: (row) => row.sub_measurment_value,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    
  ];

  const {products, isLoading, isError, message} = useSelector((state)=>state.product)
  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getProducts())
    }    

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

const filteredProduct = products.filter((row)=>{
  const nameString = row.name.toString()
  return(
    nameString.toLowerCase().includes(filterText.toLowerCase())
  )
})



  

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
        
        <span>
            <h3>Products</h3>
          </span>
          
          
          <span>
            <Search value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
          </span>
        </div>
        <div className='--flex-between'>
        <ButtonPrimary  onClick = {goCreateProduct} names="Product (ምርት መዝግብ)" className="--btn --btn-primary button-create"/>

        <ButtonPrimary  onClick = {goCreateProductCategory} names="Create Category (ምርት አይነት)" className="--btn --btn-primary button-create"/>

        <ButtonPrimary  onClick = {goToCategory} names="Cat List (ምርት አይነት ዝርዝር)" className="--btn --btn-primary button-create"/>

        </div>
        
        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoading && filteredProduct.length === 0 ? (
            <p>No products found!</p>
          ) : (
            <DataTable
                title="Product List / የምርት ዝርዝር"
                columns={columns}
                data={filteredProduct}
                selectableRows
                persistTableHead
                pagination
                fixedHeaderScrollHeight="300px"
                highlightOnHover
                pointerOnHover
                dense
                customStyles={customStyle}
                
              />
          )}
        </div>
        
      </div>
    </div>
  )
}

export default ProductList