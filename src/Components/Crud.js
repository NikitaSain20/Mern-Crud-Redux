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
    // console.log("Deleting Order ID:", OrderId);
    console.log(order._id);
    console.log(id);
    try {
      const response = await fetch(`${apiUrl}/deleteOrder/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        console.log("deleted successfully");
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
      console.log("Updated data successfully!!");
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
    <div>
      <h1 className="text-danger text-center m-5"> BASIC CRUD OPERATION</h1>
      <form className="w-100 mx-5 my-3 d-flex justify-content-center">
        <div class="mb-3 mx-5">
          <label for="exampleInputEmail1" class="form-label">
            Item:
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 mx-5">
          <label for="exampleInputPassword1" class="form-label">
            Price:
          </label>
          <input
            type="tel"
            class="form-control"
            id="exampleInputPassword1"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 mx-5">
          <label for="exampleInputPassword1" class="form-label">
            Loaction:
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            value={location}
            onChange={(e) => {
              setlocation(e.target.value);
            }}
          />
        </div>
        {updateState === false ? (
          <button
            type="submit"
            class="btn btn-success btn-sm m-4"
            onClick={handleOrder}
          >
            ADD
          </button>
        ) : (
          <button className="btn btn-warning btn-sm m-4" onClick={handleUpdate}>
            UPDATE
          </button>
        )}
      </form>
      <div className="d-flex justify-content-center w-100">
        <table class="table table-danger table-striped-columns w-75 text-center ms-5">
          <thead>
            <tr>
              <th scope="col">Id</th>
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
                <td>{order.item}</td>
                <td>{order.price}</td>
                <td>{order.location}</td>
                <td>
                  <button
                    className="btn btn-danger me-3"
                    onClick={() => {
                      handleDelete(order);
                    }}
                  >
                    DELETE
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleUpdateState(order);
                    }}
                  >
                    UPDATE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
