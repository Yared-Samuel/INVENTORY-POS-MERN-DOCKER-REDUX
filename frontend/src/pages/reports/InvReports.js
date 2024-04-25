import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvBalance,
  getStoreBalance,
} from "../../redux/features/reports/reportSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import DataTable from "react-data-table-component";
import Search from "../../components/search/Search";
import "./Reports.css";
import { MdOutlinePointOfSale } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const InvReports = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const [filterSale, setFilterSale] = useState("");

  const invBalanceCol = [
    {
      name: "Store Name",
      selector: (row) => row.storeName,
      sortable: true,
    },
    {
      name: "product / Balance",
      cell: (row) => (
        <div>
          {row.data.map((item, index) => (
            <div
              key={index}
              style={{
                // display: "flex",
                // justifyContent: "space-between",
                margin: 0,
                padding: 0,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  margin: 0,
                  padding: 0,
                  color: "teal",
                }}
              >
                {item.productName}
              </div>
              
              <div
               style={{
                display: "flex",
                justifyContent: "space-between",
                
              }}>
              <div
                style={{
                  margin: 0,
                  color: "#E25E3E",
                }}
              >
                {item.quantity}   {item.measurment}
                
              </div>   
              
              </div>
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },
  ];

  const storeBalance = [
    {
      name: "Store Name",
      selector: (row) => row.storeName,
      sortable: true,
    },
    {
      name: "product / Balance",
      cell: (row) => (
        <div>
          {row.data.map((item, index) => (
            <div
              key={index}
              style={{
                // display: "flex",
                // justifyContent: "space-between",
                margin: 0,
                padding: 0,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  margin: 0,
                  padding: 0,
                  color: "teal",
                }}
              >
                {item.productName}
              </div>
              
              <div
               style={{
                display: "flex",
                justifyContent: "space-between",
                
              }}>
              <div
                style={{
                  margin: 0,
                  color: "#E25E3E",
                }}
              >
                {item.quantity}   {item.measurmentValue}
                
              </div>   
              <div
                style={{
                  
                  margin: 0,
                  color: "#A21EEE",
                  marginLeft: "5px",
                  justifySelf: "right"
                }}
              >
                {item.sub_quantity}   {item.sub_measurment}
                
              </div>
              </div>
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },
  ];

  const { invBalances, storeBalances,  isError, message } =
    useSelector((state) => state.report);
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getInvBalance());
      // dispatch(getDailyServe())
      // dispatch(getDailyPurchase())
      // dispatch(getStoreDailySale())
      dispatch(getStoreBalance());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  //  Filter
  const filterGetInvBalance = invBalances.filter((row) => {
    const storeName = row.storeName.toString(); // Convert the number to a string
    return storeName.toLowerCase().includes(filterSale.toLowerCase());
  });

  const filterStoreBalance = storeBalances.filter((row) => {
    const storeName = row.storeName.toString(); // Convert the number to a string
    return storeName.toLowerCase().includes(filterSale.toLowerCase());
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
        backgroundColor: "#47A992",
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
      },
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
      },
    },
  };

  const goToSaleReports = () => {
    navigate("/reports");
  };
  const goToGrandReports = () => {
    navigate("/grand-reports");
  };

  return (
    <>
      <div className="top-title">
        <div className="multi-button">
          <button className="report-btn" onClick={goToSaleReports}>
            <MdOutlinePointOfSale /> Sale Report
          </button>
          <button className="report-btn-active">
            <MdOutlinePointOfSale /> Balance Report
          </button>
          <button className="report-btn" onClick={goToGrandReports}>
            <MdOutlinePointOfSale /> Grand Report
          </button>
        </div>

        <div className="search">
          <Search
            type="text"
            value={filterSale}
            onChange={(e) => setFilterSale(e.target.value)}
          />
        </div>
      </div>

      <div className="containers">
        <div className="boxs">
          <DataTable
            title="Main Store Balance"
            columns={invBalanceCol}
            data={filterGetInvBalance}
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
          />
        </div>

        <div className="boxs">
          <DataTable
            title="Each Stores Balance"
            columns={storeBalance}
            data={filterStoreBalance}
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
          />
        </div>
      </div>
    </>
  );
};

export default InvReports;
