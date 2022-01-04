const ItemCtrl = (function(){
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }
    const data = {
        items: [
            {id: 0,name: "Steak Dinner", calories: 1200},
            {id: 1,name: "Cookie", calories: 400},
            {id: 0,name: "Eggs", calories: 300}
        ],
        total: 0
    }

    return {
        getItems: function (){
            return data.items
        }
    }
    return {
        logData: function (){
            return data
        }
    }
})();

//UI CTRL
const UICtrl = (function (){
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
        }
    }
})();

const App = (function(ItemCtrl, UICtrl){
    return {
        init: function(){
            console.log("Initializing App")
            //Getting items from data structure
            const items =ItemCtrl.getItems()
            UICtrl.populateItemList(items)
        }
    }
})(ItemCtrl, UICtrl);

App.init()