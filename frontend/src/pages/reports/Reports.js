import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDailySale, getStoreDailySale } from '../../redux/features/reports/reportSlice'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import DataTable from 'react-data-table-component';
import Search from '../../components/search/Search'
import "./Reports.css"
// import { compareAsc, format } from 'date-fns'
import moment from 'moment';
import {MdOutlinePointOfSale} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

const Reports = () => {

  const dispatch = useDispatch()
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  const [filterSale, setFilterSale] = useState('');


  const goToSaleReports = () =>{
    navigate("/reports")
    }
   const goToBalanceReports = () =>{
    navigate("/inv-reports")
    }
    const goToGrandReports = () => {
      navigate("/grand-reports");
    };
  const dailySalesCol = [
    {
      name: 'Date',
      selector: row => moment(row.date).format('DD-MMM-YYYY'),
      sortable: true,
      type: 'date'
      
    },
    {
        name: 'Sale',
        selector: row => row.totalSales,
        sortable: true,
    },    
  ];

  
  const dailyStoreSalescol = [
    {
      name: 'Date',
      selector: row => moment(row.date).format('DD-MMM-YYYY'),
      sortable: true,
    },
    {
      name: 'Store Name',
      selector: row => row.storeName,
      sortable: true,
    },
    {
      name: 'Sale',
      selector: row => row.quantity,
      sortable: true,
    },
  ];


  

  const {dailySales,  dailyStoreSales ,isLoading, isError, message} = useSelector((state)=>state.report)
  useEffect(() => {
    if(isLoggedIn === true){
        dispatch(getDailySale())
        dispatch(getStoreDailySale())
        
      }  
      if(isError) {
        console.log(message)
      }  
  }, [isLoggedIn, isError, message, dispatch])
  console.log(dailyStoreSales)
//  Filter
const filterDailySales = dailySales.filter((row) => {
  const totalSalesString = row.totalSales.toString(); // Convert the number to a string
  return (
    totalSalesString.toLowerCase().includes(filterSale.toLowerCase()) ||
    row.date.toLowerCase().includes(filterSale.toLowerCase())
  );
});

const filterStoreDailySale = dailyStoreSales.filter((row) => {
  const totalSalesString = row.quantity.toString(); // Convert the number to a string
  
  return (
    totalSalesString.toLowerCase().includes(filterSale.toLowerCase()) ||
    row.date.toLowerCase().includes(filterSale.toLowerCase()) ||
    row.storeName.toLowerCase().includes(filterSale.toLowerCase()) 

  );
});


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




  return (
    <>
    <div className='top-title'>
      
    
    <div class="multi-button">
      <button className='report-btn-active' onClick={goToSaleReports}><MdOutlinePointOfSale /> Sale Report</button>
      <button className='report-btn' onClick={goToBalanceReports}><MdOutlinePointOfSale /> Balance Report</button>
      <button className='report-btn' onClick={goToGrandReports}><MdOutlinePointOfSale /> Grand Report</button>
    </div>
    

    <div className='search'>
    <Search
            type="text"
            value={filterSale}
            onChange={e => setFilterSale(e.target.value)}
          />
    </div>
    
    </div>
    
    
    <div className='containers'>
      <div className='boxs'>
      <DataTable
            
            title="Daily Sales"
              
              columns={dailySalesCol}
              data={filterDailySales}
              selectableRows
              persistTableHead
              pagination
              paginationPerPage={10} // Set the minimum pagination value to 5
              paginationRowsPerPageOptions={[5, 10, 15, 20]} // Define available pagination options
              fixedHeaderScrollHeight="300px"
              // customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              dense
              theme="solarized"
              customStyles={customStyle}
              fixedHeader='true'

              
            />
      </div>

      <div className='boxs'>

      <DataTable
            
            title="Daily Store Sales"
              
              columns={dailyStoreSalescol}
              data={filterStoreDailySale}
              selectableRows
              selectableRowsHighlight
              persistTableHead
              pagination
              paginationPerPage={10} // Set the minimum pagination value to 5
              paginationRowsPerPageOptions={[5, 10, 15, 20]} // Define available pagination options
              fixedHeaderScrollHeight="300px"
              // customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              dense
              theme="solarized"
              customStyles={customStyle}
              fixedHeader='true'
              
            />
      </div>
      
      
    </div>
    {/* <div className='containers'>
      
      

      <div className='boxs'>
      <p>Purchase</p>

      <DataTable
            
            // title="Daily Purchase"
              
              columns={dailyPurchaseCol}
              data={filterDailyPurchases}
              selectableRows
              persistTableHead
              pagination
              paginationPerPage={5} // Set the minimum pagination value to 5
              paginationRowsPerPageOptions={[5, 10, 15, 20]} // Define available pagination options
              fixedHeaderScrollHeight="300px"
              // customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              dense
              theme="solarized"
              customStyles={customStyle}
              
            />
      </div>

    </div> */}
    </>
  )
}

export default Reports