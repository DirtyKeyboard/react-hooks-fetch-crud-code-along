import React, { useState } from "react";

function ItemForm({setItems}) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const handleSubmit = async(e) => {
    if (name==="")
      alert('You must input a name')
    else
    {
      e.preventDefault();
      const newItem = {name: name, category: category, isInCart: false}
      const configObj = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newItem)
      }
      console.log(newItem)
      setName("")
      setCategory("")

      const resp = await fetch('http://localhost:4000/items', configObj)
      const converted = await resp.json();
      setItems((items) => ([...items, converted]))
  }
  
  }
  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
