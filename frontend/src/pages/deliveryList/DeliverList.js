import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { getDelivers } from '../../redux/features/delivery/deliverSlice';
import { SpinnerImg } from '../../components/loader/Loader'
import "./DeliverList.scss"
import DataTable from 'react-data-table-component';
import Search from '../../components/search/Search'
import moment from 'moment';
import ButtonPrimary from '../../components/button/ButtonPrimary';

// createTheme 
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
          color: "black",
          backgroundColor: "white",
          fontSize: "1.2rem",
          padding: "2px",
          margin: "0"
        }
      },
 }

const DeliverList = () => {

    const dispatch = useDispatch()
    const isLoggedIn =  useSelector(selectIsLoggedIn)
    const navigate = useNavigate()

    useRedirectLoggedOutUser("/login");
    const goCreateDeliver = () =>{
    navigate("/add-delivery")
    }

    // Filtering


    const [filterText, setFilterText] = useState('');

  const columns = [
    {
      name: 'From Store',
      selector: row => row.to_mainstore && row.to_mainstore.name ? row.to_mainstore.name : '',
      sortable: true,
      
    },
    {
      name: 'To Store',
      selector: row => row.to_store && row.to_store.name ? row.to_store.name : '',
      sortable: true,
      
    },
    {
      name: 'Product',
      selector: row => row.product && row.product.name ? row.product.name : '',
      sortable: true,
    },
     
    {
      name: 'Quantity',
      selector: (row) => {
        const product = row.product;
        if (product && product.measurment) {
          if (product.sub_measurment_value !== null) {
            return (
              row.quatity / product.sub_measurment_value + " - " + product.measurment + " | " + row.quatity % product.sub_measurment_value + " - " + product.sub_measurment
            );
          } else {
            return row.quatity + ' - ' + product.measurment;
          }
        } else {
          return 'Quantity Not Available';
        }
      },
    },
    
   
    
    
    
    
    
    
    {
      name: 'Date',
      selector: row => moment(row.date).format('DD-MMM-YYYY'),
      sortable: true,
  },
    
  ];

    const { delivers, isLoading, isError, message } = useSelector((state)=>state.deliver)
    useEffect(() => {
      if(isLoggedIn === true) {
        dispatch(getDelivers())
        console.log(delivers)
      }
      
      if(isError) {
        console.log(message)
      }
    }, [isLoggedIn, isError, message, dispatch])

      // Filter
  const filteredPurchases = delivers.filter(
    row =>{
    const nameString = row.product && row.product.name ? row.product.name.toString() : '';
    const storeString = row.to_store && row.to_store.name ? row.to_store.name.toString() : '';
    const mainStoreString = row.to_mainstore && row.to_mainstore.name ? row.to_mainstore.name.toString() : '';
    return(
      nameString.toLowerCase().includes(filterText.toLowerCase()) ||
      row.date.toLowerCase().includes(filterText.toLowerCase()) ||
      storeString.toLowerCase().includes(filterText.toLowerCase()) ||
      mainStoreString.toLowerCase().includes(filterText.toLowerCase()) 
    )
    });


    
  
  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
        <ButtonPrimary  onClick = {goCreateDeliver} names="Delivery (ምርት አስተላልፍ)" className="--btn --btn-primary button-create"/>

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
          {!isLoading && delivers.length === 0 ? (
            <p>No products found!</p>
          ) : (

            <DataTable
            
            title="Transfer List / የስርጭት ዝርዝር"
              
              columns={columns}
              data={filteredPurchases}
              selectableRows
              persistTableHead
              pagination
              fixedHeaderScrollHeight="300px"
              // customStyles={customStyles}
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

export default DeliverList