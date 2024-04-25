import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/product/productSlice";
// import Card from '../card/Card'
import "./PurchaseForm.css";
import { useNavigate } from "react-router-dom";
import { getMainStore } from "../../redux/features/mainStore/mainStoreSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { GiReturnArrow, GiSave } from "react-icons/gi";

const PurchaseForm = ({ purchase, savePurchase, handleInputChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const gToServe = () => {
    navigate("/purchase");
  };

  // Get product
  const { products, isError, message } = useSelector((state) => state.product);
  const { mainstores } = useSelector((state) => state.mainstore);

  useEffect(() => {
    dispatch(getProducts());
    // console.log(products)

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getMainStore());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, dispatch, isError, message]);

  return (
    <div className="add-purchase">
      <div className="btn-back">
        <button type="button" className="back-button" onClick={gToServe}>
          Back <GiReturnArrow />
        </button>
      </div>
      <div className="card">
        <form onSubmit={savePurchase}>
          <div className="input-dynamic">
            <select
              name="product"
              className="select"
              value={purchase?.product}
              onChange={handleInputChange}
            >
              <option disabled value={""}>
                Select product / የሚገዛውን እቃ ምረጥ
              </option>
              {products.map((product, index) => {
                const { _id, name } = product;
                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>

            <select
              name="to_mainstore"
              className="select"
              value={purchase?.to_mainstore}
              onChange={handleInputChange}
            >
              <option disabled value={""}>
                Select Store / ዋና ስቶር ምረጥ
              </option>
              {mainstores.map((store, index) => {
                const { _id, name } = store;
                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>

            <input
              type="decimal"
              className="input-one"
              placeholder="Purchase Quantity / የእቃው ብዛት"
              name="quatity"
              value={purchase?.quatity}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-dynamic">
            <input
              type="decimal"
              className="input-one"
              placeholder="Unit Price / ነጠላ ዋጋ"
              name="unit_price"
              value={purchase?.unit_price}
              onChange={handleInputChange}
            />

            <input
              type="date"
              className="input-one"
           
              placeholder="Date / ቀን"
              name="date"
              value={purchase?.date}
              onChange={handleInputChange}
              id="date"
            />
            <input
              type="number"
              className="input-one"
              placeholder="TIN / ቲን ቁጥር"
              name="tin"
              value={purchase?.tin}
              onChange={handleInputChange}
            />
          </div>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save product .<GiSave />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
