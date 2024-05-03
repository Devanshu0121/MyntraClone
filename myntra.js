let myntra_products = document.querySelector(".myntra-products");
let no_of_items = document.querySelector(".no_of_items");
let bag_items_container = document.querySelector(".bag-items-container");
let bag_summary = document.querySelector(".bag-summary");
let noItemAdded = document.querySelector(".noItemAdded");
let bagItems = [];
 
onload();
function onload(){
    let bagitemstr = localStorage.getItem("bagItems");
    bagItems = bagitemstr ? JSON.parse(bagitemstr) : [];
    main();
    bagitemscontainer();
    PriceDetails();
}

function AddtoBag(item_id){
    bagItems.push(item_id);
    localStorage.setItem("bagItems",JSON.stringify(bagItems));
    no_of_items.innerHTML = bagItems.length; 
}

function main(){
    no_of_items.innerHTML = bagItems.length;
    if(!myntra_products){
        return;
    }
    myntra_products.innerHTML = '';
        items.forEach(item=>{
            myntra_products.innerHTML += `
                <div class="myntra-products-images">
                    <div class="product">
                        <img src="${item.image}" alt="" class="product-image">
                        <div class="product-details">
                            <div class="rating">${item.rating.stars}|${item.rating.count}</div>
                            <div class="product-name">${item.company}</div>
                            <div class="product-discription">${item.item_name}</div>
                            <div class="discount-details">
                                <span class="price">Rs ${item.current_price}</span>
                                <span class="cutting-text">Rs ${item.original_price}</span>
                                <span class="discount">(${item.discount_percentage}%)</span>
                            </div>
                            <button class="myntra-item1 btn-bag" onclick="AddtoBag(${item.id})">Add to Bag</button>
                        </div>
                    </div>
                </div>`;
    });
}

function bagitemscontainer(){
    if(!bag_items_container){
        return;
    }
    bag_items_container.innerHTML = "";

    for(let i=0;i<bagItems.length;i++){
        for(let j=0;j<items.length;j++){
            if(bagItems[i] == items[j].id){
                bag_items_container.innerHTML += `
                <div class="bag-item-container">
                    <div class="item-left-part">
                        <img class="bag-item-img" src="${items[j].image}">
                    </div>
                    <div class="item-right-part">
                        <div class="company">${items[j].company}</div>
                        <div class="item-name">${items[j].item_name}</div>
                        <div class="price-container">
                            <span class="current-price">Rs ${items[j].current_price}</span>
                            <span class="original-price">Rs ${items[j].original_price}</span>
                            <span class="discount-percentage">(${items[j].discount_percentage}% OFF)</span>
                        </div>
                        <div class="return-period">
                            <span class="return-period-days">14 days</span> return available
                        </div>
                        <div class="delivery-details">
                            Delivery by
                            <span class="delivery-details-days">10 Oct 2024</span>
                        </div>
                    </div>
                    <div class="remove-from-cart" onclick="RemovefromCart(); bagItems.splice(${i},1);">X</div>
                </div>`;
            }    
        }
    }
}

function RemovefromCart(){
    localStorage.setItem("bagItems",JSON.stringify(bagItems));
    onload();
}

function PriceDetails(){
    if(!bag_summary){
        return;
    }
    if(bagItems.length == 0){
        noItemAdded.innerHTML = `
        <div class="noItemAddedwrite">
            <h4>No Item Added</h4>
        </div>
        `;
        bag_summary.innerHTML = "";
    }else{ 
        let ActualPrice = 0 , Totalprice = 0 , originalprice = 0 ;
        for(let m=0 ; m<bagItems.length ; m++){
            ActualPrice += items[bagItems[m]-1].current_price;
            originalprice += items[bagItems[m]-1].original_price;
        }
        Totalprice = ActualPrice + 99;
        bag_summary.innerHTML = `
            <div class="bag-details-container">
                <div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
                <div class="price-item">
                    <span class="price-item-tag">Total MRP</span>
                    <span class="price-item-value">Rs ${originalprice}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Discount on MRP</span>
                    <span class="price-item-value priceDetail-base-discount">-Rs ${originalprice - ActualPrice}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Actual Price</span>
                    <span class="price-item-value">Rs ${ActualPrice}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Convenience Fee</span>
                    <span class="price-item-value">Rs 99</span>
                </div>
                <hr>
                <div class="price-footer">
                    <span class="price-item-tag">Total Amount</span>
                    <span class="price-item-value">Rs ${Totalprice}</span>
                </div>
            </div>    
            <button class="btn-place-order">
                <div class="css-xjhrni" onclick="placeOrder();">PLACE ORDER</div>
            </button>
        `;
    }
}

function placeOrder(){
    alert(`Your ${bagItems.length} Item has been Shipped`);
}
