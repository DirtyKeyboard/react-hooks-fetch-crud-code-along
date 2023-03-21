import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(async() => {
    const raw = await fetch('http://localhost:4000/items')
    const data = await raw.json();
    setItems(data);
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function updateItem(obj)
  {
    const newItems = [...items]
    newItems.map(el => {
      if (el.id === obj.id)
        el.isInCart = obj.isInCart
    })
    setItems(newItems)
  }

  const deleteFromItems = async(itemId) => {
    const config = {method:'DELETE'}
    await fetch(`http://localhost:4000/items/${itemId}`, config)
    const newArray = items.filter(el => (itemId !== el.id))

    setItems(newArray)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm setItems={setItems}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} updateItem={updateItem} deleteFromItems={deleteFromItems}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
