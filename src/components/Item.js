import React from "react";

function Item({ item, updateItem, deleteFromItems }) {
  const handleAddToCart = async(e) => {
   const config = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      isInCart: !item.isInCart
    })
   }
   const resp = await fetch(`http://localhost:4000/items/${item.id}`, config)
   const conv = await resp.json()
   updateItem(conv)
  }

  const handleDelete = async(e) => {
    deleteFromItems(item.id);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
