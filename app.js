const ItemCtrl = (function(){
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }
    const data = {
        items: [
            //{id: 0,name: "Steak Dinner", calories: 1200},
            //{id: 1,name: "Cookie", calories: 400},
            //{id: 2,name: "Eggs", calories: 300}
        ],
        total: 0
    }

    return {
        getItems: function (){
            return data.items
        },
        addItem: function(name, calories){
            let ID
            //Creating the ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            // calories to number
            calories = parseInt(calories);
            // creating new item
            newItem = new Item(ID, name, calories);
            // adding them to items array
            data.items.push(newItem);
            return newItem
        },
        logData: function (){
            return data
        }
    }



})();

//UI CTRL
const UICtrl = (function (){
    //UI Selectors
    const UISelectors = {
        itemList: "#item-list",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        addBtn: ".add-btn"
    }
    return {
        populateItemList: function(items){
            let html = "";

            items.forEach(function (item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
            });
            //insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput: function (){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item){
            // Creating the li element
            const li = document.createElement("li");
            // adding the class
            li.className = "collection-item";
            // adding HTML
            li.innerHTML = `<strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
               </a>`;
            // inserting item to UI
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li)
        },
        clearInput: function (){
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        }
    }
})();

// APP CONTROLLER
const App = (function(ItemCtrl, UICtrl){
    const loadEventListeners = function (){
        //get UI selectors
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);
    }
    // item add submit function
    const itemAddSubmit= function(event){
        //get form input from UI controller
        const input = UICtrl.getItemInput()
        console.log(input)
        //check for name and calorie input
        if(input.name !== "" && input.calories !== ""){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            UICtrl.addListItem(newItem)
            // clear fields
            UICtrl.clearInput();
        }
        event.preventDefault()
    }
    return {
        init: function(){
            console.log("Initializing App")
            //Getting items from data structure
            const items =ItemCtrl.getItems()
            UICtrl.populateItemList(items)
            // load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

App.init()