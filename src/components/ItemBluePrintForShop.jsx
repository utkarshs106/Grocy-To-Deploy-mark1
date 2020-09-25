import React, { useState, useEffect } from "react";
import $ from "jquery";

function ItemBluePrintForShop(props) {
  var [newItemName, setNewItemName] = useState();
  var [newItemPrice, setNewItemPrice] = useState();

  var itemNameId = props.itemId + "1";
  var itemPriceId = props.itemId + "2";
  var itemSaveId = props.itemId + "3";
  var [checked, setChecked] = useState(0);

  function changeItemValue(e) {
    setNewItemName(e.target.value);
  }

  function changeItemPrice(e) {
    setNewItemPrice(e.target.value);
  }

  function pushToParent() {
    for (var i = 0; i < props.deleteArray.length; i++) {
      if (props.deleteArray[i] === props.itemId) {
        props.deleteArray.splice(i, 1);
        checked = 1;
        break;
      }
    }

    if (checked === 0) {
      props.setDeleteArray(props.deleteArray.concat(props.itemId));
    }
    console.log("This is delete array" + props.deleteArray);
  }

  function editItems() {
    $("#" + itemNameId).attr("readOnly", false);
    $("#" + itemPriceId).attr("readOnly", false);
    $("#" + itemSaveId).show();
    setNewItemPrice(props.itemPrice);
    setNewItemName(props.itemName);
  }

  function save() {
    console.log(newItemName);
    console.log(newItemPrice);
    $("#" + itemSaveId).hide();
    $("#" + itemNameId).attr("readOnly", true);
    $("#" + itemPriceId).attr("readOnly", true);

    var data = {
      newItemName: newItemName,
      newItemPrice: newItemPrice,
      itemId: props.itemId,
      shopId: props.shopId
    };
    var url = "https://ytezo.sse.codesandbox.io/updateItemsFromShops";
    fetch(url, {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  }

  return (
    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0">
      <script
        src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossOrigin="anonymous"
      ></script>
      <input type="checkbox" onChange={pushToParent} checked={checked} />
      <input
        type="text"
        id={itemNameId}
        className="itemName flex-grow w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
        placeholder="Item Name"
        readOnly={true}
        onChange={changeItemValue}
        defaultValue={props.itemName}
      />

      <input
        type="text"
        id={itemPriceId}
        className="itemPrice flex-grow w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
        placeholder="Item Price"
        readOnly={true}
        onChange={changeItemPrice}
        defaultValue={props.itemPrice}
      />
      <input
        type="Button"
        style={{ color: "red" }}
        defaultValue="Edit"
        onClick={editItems}
      />
      <input
        type="Button"
        id={itemSaveId}
        style={{ display: "none" }}
        defaultValue="Save"
        onClick={save}
      />
    </div>
  );
}

export default ItemBluePrintForShop;
