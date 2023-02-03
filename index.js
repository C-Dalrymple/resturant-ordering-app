import { menuArray } from './data.js'

const infoForm = document.getElementById("info-form")
const confirmationMsg = document.getElementById("confirmation-msg")

let orderArray = []
let totalPrice = 0

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        getOrderArray(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        removeOrderItems(e.target.dataset.remove)
    } else if (e.target.id === 'complete-btn')
        openModal()
})

// get menu items
function getMenuItems() {
    let menuHtml = ''
     
    menuArray.forEach(function(food){
        menuHtml += `
            <div class="food-inner">
                <p class="food-emoji">${food.emoji}</p>
                <div class="food-info">
                    <p class="food-name">${food.name}</p>
                    <p class="food-ingredients">${food.ingredients}</p>
                    <p class="food-price">$${food.price}</p>
                </div>
                <i class="fa-solid fa-circle-plus add-food" data-add="${food.id}"></i>
            </div>
        ` 
    })
    return menuHtml 
}

// render menu
function renderMenu(){
    document.getElementById('menu-section').innerHTML = getMenuItems()
}

renderMenu()

//order section array
function getOrderArray(foodId){
    const targetFoodObj = menuArray.filter(function(food){
        return food.id.toString() === foodId
    })[0]
    
    orderArray.push(targetFoodObj)
    
    totalPrice = 0
    orderArray.forEach(function(food){
        totalPrice += food.price
    })
    
    getOrderItems()
}
//render order section

function getOrderItems(){
    let foodAddedHtml = ''
    let orderMenuHtml = ''
    
    orderArray.forEach(function(food){
        foodAddedHtml += `
        <div class="food-added">
            <div>
                ${food.name}
                <button id="remove-btn" data-remove="${food.id}">REMOVE</button>
            </div>
            <div id="food-price">
                $${food.price}  
            </div>
        </div>
        `
        orderMenuHtml = `
        <div class="container" id="container">
            <h2>Your Order</h2>
            <div class="order-inner">
                ${foodAddedHtml}
            </div>
            <hr>
            <div class= "total-price">
                <div>
                    <p>Total Price</p>
                </div>
                <div class="food-price">
                    $${totalPrice}
                </div>
            </div>
        
            <button class="complete-btn" id="complete-btn">Complete order</button>
        </div>
        `
        return orderMenuHtml
    })
    
    document.getElementById("order-section").innerHTML = orderMenuHtml
}

// remove item from order

function removeOrderItems(foodId){
    const targetFoodObj = menuArray.filter(function(food){
        return food.id.toString() === foodId
    })[0]
    
    orderArray.splice(orderArray.indexOf(targetFoodObj),1)
    
    totalPrice = 0
    orderArray.forEach(function(item){
        totalPrice += item.price
    })
    
    getOrderItems()
}

// open modal
function openModal(){
    modal.classList.toggle("hidden")
}

//pay button

infoForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const infoFormData = new FormData(infoForm)
    const fullName = infoFormData.get("full-name")
    
    let container = document.getElementById("container")
    container.classList.add("hidden") 
    modal.classList.toggle("hidden") 
    confirmationMsg.classList.toggle("hidden")
    
    confirmationMsg.innerHTML += `
        <h4>Thanks, ${fullName}! Your order is on its way!</h4>
        `
})