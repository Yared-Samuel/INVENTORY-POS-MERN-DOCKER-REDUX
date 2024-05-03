import React, { useEffect, useState } from "react";
import "./PurchaseList.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../../redux/features/purchase/purchaseSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import DataTable from "react-data-table-component";
import Search from "../../components/search/Search";
import Card from "../../components/card/Card";
import moment from "moment";
import * as XLSX from "xlsx";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import ButtonPrimary from "../../components/button/ButtonPrimary";

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
      fontSize: "1rem",
      height: "2px",
      padding: "0",
      margin: "0",
    },
  },

  headCells: {
    style: {
      fontSize: "1.2rem",
      backgroundColor: "#47A992",
      color: "white",
    },
  },
  cells: {
    style: {
      fontWeight: "bold",
      color: "black",
      backgroundColor: "white",
      fontSize: "1.2rem",
      padding: "2px",
      margin: "0"
      
    },
  },
};

const PurchaseList = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const goCreatePurchase = () => {
    navigate("/add-purchase");
  };

  // Filtering

  const [filterText, setFilterText] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [tinNotNull, setTinNotNull] = useState(false);

  const columns = [
    {
      name: "Product",
      selector: (row) => row.product?.name || "",
      sortable: true,
    },
    {
      name: "Stored At",
      selector: (row) => row.to_mainstore?.name || "",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.date).format("DD-MMM-YYYY"),
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quatity,
    },
    {
      name: "Unit Price",
      selector: (row) => row.unit_price,
    },
    {
      name: "Total Price",
      selector: (row) => row.total_price,
    },
    {
      name: "Tin No.",
      selector: (row) => row.tin,
    },
  ];

  const { purchases, isLoading, isError, message } = useSelector(
    (state) => state.purchase
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getPurchases());
      console.log(purchases);
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  // Filter
  const filteredPurchases = purchases.filter((row) => {
    const nameString =
      row.product && row.product.name ? row.product.name.toString() : "";

    const date = moment(row.date);
    const tin = row.tin;
    // Check if the date is within the selected date range
    const isDateInRange =
      (!fromDate || date.isSameOrAfter(fromDate)) &&
      (!toDate || date.isSameOrBefore(toDate));

    // Check if the row matches the "Tin Not Null" checkbox
    const tinMatches = !tinNotNull || (tinNotNull && tin);

    return (
      nameString.toLowerCase().includes(filterText.toLowerCase()) &&
      isDateInRange &&
      tinMatches
    );
 
  });

  const exportData = () => {
    const dataToExport = filteredPurchases.map((row) => ({
      Product: row.product.name,
      Date: moment(row.date).format("DD-MMM-YYYY"),
      Quantity: row.quantity,
      "Unit Price": row.unit_price,
      "Total Price": row.total_price,
      "Tin No.": row.tin,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FilteredData");

    XLSX.writeFile(wb, "exported_data.xlsx");
  };


  return (
    <Card>
      <div className="product-list">
        <div className="table">
          <div className="--flex-between --flex-dir-column">
            <span>
            <ButtonPrimary  onClick = {goCreatePurchase} names="purchase (ግዢ)" className="--btn --btn-primary button-create"/>
            </span>
            <div>
              <Search
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>

            <span className="yar">
              <div className="date-search">
                <div>
                  <input
                    type="date"
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={tinNotNull}
                onChange={() => setTinNotNull(!tinNotNull)}
              />
              <span className="slider round"></span>
            </label>
            <button className="export-btn" onClick={exportData}>
              <BsFillCloudDownloadFill size={20} color="black" />
            </button>
          </div>

          {isLoading && <SpinnerImg />}
          <div className="table">
            {!isLoading && purchases.length === 0 ? (
              <p>No products found!</p>
            ) : (
              <DataTable
                title="Purchase List / የግዢ ዝርዝር"
                columns={columns}
                data={filteredPurchases}
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
    </Card>
  );
};

export default PurchaseList;
