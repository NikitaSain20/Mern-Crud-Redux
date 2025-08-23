import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "./ContextReducer";
import { apiUrl } from "../App";
export default function Crud() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [location, setlocation] = useState("");
  const [updateState, setUpdateState] = useState(false);
  const [id, setId] = useState("");
  const { state, dispatch } = useContext(CrudContext);
  const handleOrder = async (e) => {
    e.preventDefault();
    if (item && price && location) {
      dispatch({ type: "ADD", payload: { item, price, location } });
    }
    setItem("");
    setPrice("");
    setlocation("");
    await postData();
    fetchData();
  };
  const handleDelete = async (order) => {
    try {
      const response = await fetch(`${apiUrl}/deleteOrder/${order._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch({
          type: "DELETE",
          payload: id,
        });
        fetchData();
      } else {
        console.log("errror in deleting successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateState = (updatedItem) => {
    setId(updatedItem._id);
    setItem(updatedItem.item);
    setPrice(updatedItem.price);
    setlocation(updatedItem.location);
    setUpdateState(true);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/updateOrder/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item,
        price,
        location,
      }),
    });
    if (response.ok) {
      ("Updated data successfully!!");
      if (id !== null && item && price && location) {
        dispatch({ type: "UPDATE", payload: { id, item, price, location } });
      }
      setItem("");
      setPrice("");
      setlocation("");
      setUpdateState(false);
      fetchData();
    } else {
      console.log("error in updating data successfully!!");
    }
  };
  const postData = async (e) => {
    const response = await fetch(`${apiUrl}/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: item,
        price: price,
        location: location,
      }),
    });
  };
  const fetchData = async () => {
    const response = await fetch(`${apiUrl}/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    dispatch({
      type: "SETDATA",
      payload: data.allOrders,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      }}
    >
      <div className="container">
        <h1 className="text-center text-uppercase fw-bold text-white mb-5 shadow-sm">
          Basic CRUD Operation
        </h1>

        <div className="card shadow-lg p-4 mb-5 rounded-4 bg-white">
          <form className="row g-3 align-items-end justify-content-center">
            <div className="col-md-3">
              <label htmlFor="itemInput" className="form-label fw-semibold">
                Item
              </label>
              <input
                type="text"
                className="form-control text-capitalize"
                id="itemInput"
                placeholder="Enter item name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="priceInput" className="form-label fw-semibold">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="locationInput" className="form-label fw-semibold">
                Location
              </label>
              <input
                type="text"
                className="form-control text-capitalize"
                id="locationInput"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>

            <div className="col-md-2 text-center">
              {updateState === false ? (
                <button
                  type="submit"
                  className="btn btn-success w-100 px-3 py-2"
                  onClick={handleOrder}
                >
                  Add
                </button>
              ) : (
                <button
                  className="btn btn-warning w-100 px-3 py-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle text-center bg-white shadow-sm rounded-4">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Location</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {state.order.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td className="text-capitalize">{order.item}</td>
                  <td>{`Rs. ${order.price}`}</td>
                  <td className="text-capitalize">{order.location}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(order)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleUpdateState(order)}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
