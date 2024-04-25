import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { MdOutlinePointOfSale } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getStorelists } from "../../redux/features/store/storelistSlice";
import { getGrandId } from "../../redux/features/grandReport/grandSlice";
import "./Reports.css";

const GrandReport = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { storelists, isLoading, isError, message } = useSelector(
    (state) => state.storelist
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getStorelists());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, dispatch, isError, message]);

  const { grands, grandIsError, grandIsSuccess, grandIsLoading } = useSelector(
    (state) => state.grand
  );
  useEffect(() => {
    if (selectedStore) {
      dispatch(getGrandId({ _id: selectedStore }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedStore]);

  const goToSaleReports = () => {
    navigate("/reports");
  };
  const goToBalanceReports = () => {
    navigate("/inv-reports");
  };
  const goToGrandReports = () => {
    navigate("/grand-reports");
  };

  const handleStoreChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSelectedStore(value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const isDateInRange = (date) => {
    if (!startDate || !endDate) return true;

    return date >= startDate && date <= endDate;
  };

  return (
    <>
      <div className="top-title">
        <div className="multi-button">
          <button className="report-btn" onClick={goToSaleReports}>
            <MdOutlinePointOfSale /> Sale Report
          </button>
          <button className="report-btn" onClick={goToBalanceReports}>
            <MdOutlinePointOfSale /> Balance Report
          </button>
          <button className="report-btn-active" onClick={goToGrandReports}>
            <MdOutlinePointOfSale /> Grand Report
          </button>
        </div>
      </div>
      <div className="filterContainer">
        <select name="to_store" onChange={handleStoreChange} className="select">
          <option disabled selected value="">
            Select Store / ስቶር ምረጥ
          </option>

          {storelists.map((storelist) => {
            const { _id, name } = storelist;
            return (
              <option key={_id} value={_id}>
                {name}
              </option>
            );
          })}
        </select>
        <div className="dateRange">
          <div>
            <input
              type="date"
              id="start-date"
              onChange={handleStartDateChange}
              placeholder="Select start date"
            />
          </div>
          <div>
            <input
              type="date"
              id="end-date"
              onChange={handleEndDateChange}
              placeholder="Select end date"
            />
          </div>
        </div>
      </div>
      <>
        {Object.keys(grands).map(
          (date) =>
            isDateInRange(date) && (
              <div key={date} className="grand-report-section">
                <p className="date">{date}</p>
                <div className="grand-type-section">
                  {grands[date]["pd"] && (
                    <div>
                      <p className="types">product Delivered / ገቢ</p>
                      <hr></hr>
                      <div className="grandTotal">
                        Grand Total:{" "}
                        {grands[date]["pd"].reduce(
                          (total, item) => total + item.total_price,
                          0
                        )}
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>product / እቃ</th>
                            <th>quantity / ብዛት</th>
                            <th>in Cash / በብር</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grands[date]["pd"].map((item) => (
                            <tr className="lis" key={item._id}>
                              <td>{item.product && item.product.name}</td>
                              <td>{item.quatity}</td>
                              <td> {item.total_price} birr</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Add other types (ps, pps, pu) here */}
                  {["ps", "pps", "pu"].map((type) => (
                    <div key={type}>
                      {grands[date][type] && (
                        <div className="transaction">
                          <p className="types">
                            {type === "ps"
                              ? "product Soled / ሽያጭ"
                              : type === "pu"
                              ? "Product used / ጥቅም ላይ የዋሉ"
                              : type === "pps"
                              ? "Processed & soled / ሽያጭ"
                              : "Other / ያልተገለጸ"}
                          </p>
                          <hr></hr>
                          <div className="grandTotal">
                            Grand Total:{" "}
                            {grands[date][type].reduce(
                              (total, item) => total + item.total_price,
                              0
                            )}
                          </div>

                          <table>
                            <thead>
                              <tr>
                                <th>product / እቃ</th>
                                <th>quantity / ብዛት</th>
                                <th>in Cash / በብር</th>
                              </tr>
                            </thead>
                            <tbody>
                              {grands[date][type].map((item) => (
                                <tr className="lis" key={item._id}>
                                  <td>
                                    {type === "pps"
                                      ? item.serve && item.serve.serveName
                                      : item.product && item.product.name}
                                  </td>
                                  <td>{item.quatity}</td>
                                  <td>{item.total_price} birr</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </>
    </>
  );
};

export default GrandReport;
