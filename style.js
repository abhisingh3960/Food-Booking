// URLs
const menuUrl = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

// Function to fetch and display the menu
async function getMenu() {
    try {
        const response = await fetch(menuUrl);
        const foodItems = await response.json();
        // console.log(foodItems);
        
        const menuSection = document.querySelector('.menu_section .grid-row-three');
        menuSection.innerHTML = ""; // Clear existing menu items

        foodItems.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            // console.log(item.imgSrc);
            const{imgSrc , name , price }=item;
            
            card.innerHTML = `
                 <div class="card_img">
                                <img src="${imgSrc}" alt=" ${name}">
                            </div>
                
                <div class="card_footer">
                    <div>
                        <h4>${name}</h4>
                        <p>$${price}/-</p>
                    </div>
                    <div class="plus_icon"><i class="fa-solid fa-plus"></i></div>
                </div>
            `;
            menuSection.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
}

// Function to simulate order taking
function TakeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const burgers = ["Cheeseburger", "Veggie Burger", "Chicken Burger"];
            const selectedBurgers = [];
            while (selectedBurgers.length < 3) {
                const burger = burgers[Math.floor(Math.random() * burgers.length)];
                if (!selectedBurgers.includes(burger)) selectedBurgers.push(burger);
            }
            resolve({ order: selectedBurgers });
        }, 2500);
    });
}

// Function to simulate order preparation
function orderPrep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function to simulate payment
function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function to thank the user
function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

// Function to handle the entire ordering process
async function handleOrderProcess() {
    try {
        await getMenu();
        const order = await TakeOrder();
        console.log("Order received:", order);
        
        const prepStatus = await orderPrep();
        console.log("Order preparation status:", prepStatus);
        
        const paymentStatus = await payOrder();
        console.log("Payment status:", paymentStatus);
        
        if (paymentStatus.paid) thankyouFnc();
    } catch (error) {
        console.error("Error in order process:", error);
    }
}

// Run `getMenu()` when the page loads and then handle the order process
window.onload = handleOrderProcess;
