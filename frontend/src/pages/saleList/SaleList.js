import React, {useEffect, useState} from 'react'
import { SpinnerImg } from '../../components/loader/Loader'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import { getSales } from '../../redux/features/sale/saleSlice'
import DataTable from 'react-data-table-component'
import Search from '../../components/search/Search'
import { getSaleService } from '../../redux/features/sale/saleServiceSlice'
// import { compareAsc, format } from 'date-fns'
import moment from 'moment';
import ButtonPrimary from '../../components/button/ButtonPrimary';




const SaleList = () => {



  const dispatch = useDispatch();
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  const navigate = useNavigate()


  useRedirectLoggedOutUser("/login");

  const goCreateSale = () =>{
    navigate("/add-sale")
  }

  // Filtering

  const [filterText, setFilterText] = useState('');
  const [filterTexts, setFilterTexts] = useState('');



  const {sales, isLoading, isError, message} = useSelector((state)=>state.sale)
  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getSales())
    }    

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  const {saleServices , isLoadingServe,isErrorServe} = useSelector((state)=>state.saleService)
  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getSaleService())
    }    

    if(isErrorServe) {
      console.log(message)
    }
  }, [isLoggedIn,isErrorServe , message, dispatch])


  // Filter
  const filteredPurchases = sales.filter(
    row =>
      (row.product && row.product.name && row.product.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.date && row.date.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.to_store && row.to_store.name && row.to_store.name.toLowerCase().includes(filterText.toLowerCase())) 
  );
  const filteredPurchasess = saleServices.filter(
    row =>
      (row.serve && row.serve.serveName && row.serve.serveName.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.date && row.date.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.to_store && row.to_store.name && row.to_store.name.toLowerCase().includes(filterText.toLowerCase())) 
      
  );


  const customStyle = {
    table: {
      style: {
        width: "100%",
        margin: "0",
        // padding: "2px",
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
            fontSize: "1rem",
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
            color: "black",
            backgroundColor: "white",
            fontSize: "1.2rem",
            padding: "2px",
            margin: "0"
          }
        },
   }


   const columnss = [
    {
      name: 'Store',
      selector: row => row.to_store && row.to_store.name ? row.to_store.name : '',
      sortable: true,
  },
    
    {
        name: 'Product',
        selector: row => row.serve && row.serve.serveName ? row.serve.serveName : "",
    },
    {
        name: 'Quantity',
        selector: row => row.quatity + "       -      " + row.measured_by,
        // selector: row => row.measured_by,
    },
    {
        name: 'Sale',
        selector: row => row.total_price,
        // selector: row => row.measured_by,
    },
    
    {
        name: 'Date',
        selector: row =>  moment(row.date).format('DD-MMM-YYYY'),
    },
  ];
  const columns = [
    {
      name: 'Store',
      selector: row => row.to_store && row.to_store.name ? row.to_store.name : '',
      sortable: true,
  },
    
    {
        name: 'Product',
        selector: row => row.product && row.product.name ? row.product.name : '',
    },
    {
        name: 'Quantity',
        selector: row => row.quatity  + "       -      " + row.measured_by,
        // selector: row => row.measured_by,
    },
    {
        name: 'Sale',
        selector: row => row.total_price,
        // selector: row => row.measured_by,
    },
    
    {
        name: 'Date',
        selector: row => moment(row.date).format('DD-MMM-YYYY'),
    },
  ];
   
  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
        <ButtonPrimary  onClick = {goCreateSale} names="Sales (ምርት ሽያጭ)" className="--btn --btn-primary button-create"/>

          <span>
            <Search 
            type="text"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}

            />
          </span>
        </div>
        
        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoading && sales.length === 0 ? (   <p>No sales found!</p>
          ) : (

            <DataTable
            
            title="Product sales list / የሽያጭ ዝርዝር"
              
              columns={columns}
              data={filteredPurchases}
              selectableRows
              persistTableHead
              pagination
              paginationPerPage={7} // Set the minimum pagination value to 5
              paginationRowsPerPageOptions={[7, 10, 15, 20]} // Define available pagination options
              fixedHeaderScrollHeight="300px"
              highlightOnHover
              pointerOnHover
              dense
              // theme="solarized"
              customStyles={customStyle}
              
            />
           
          )}
        </div>

      </div>

      {/* Second table */}
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
        <div></div>
          <span>
            <Search 
            type="text"
            value={filterTexts}
            onChange={e => setFilterTexts(e.target.value)}

            />
          </span>
        </div>
        
        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoadingServe && saleServices.length === 0 ? (   <p>No sales found!</p>
          ) : (

            <DataTable
            
            title="Service sales list / የሽያጭ ዝርዝር"
              
              columns={columnss}
              data={filteredPurchasess}
              selectableRows
              persistTableHead
              pagination
              fixedHeaderScrollHeight="300px"
              // customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              dense
              // theme="solarized"
              customStyles={customStyle}
            />
           
          )}
        </div>
      </div>
    </div>
  )
}

export default SaleList