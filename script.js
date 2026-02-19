 // --- 1.Local storage ---
// Function to load products into the table
function loadProducts() {
    const tableBody = document.querySelector('tbody');
    const storedProducts = JSON.parse(localStorage.getItem('myProducts')) || [];
    
    // If we have stored products,we add stored data to your existing list
    storedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><div class="img-wrapper"><img src="${product.img}" class="product-img-large"></div></td>
            <td><strong>${product.name}</strong><br><small>${product.desc}</small></td>
            <td>Ksh ${product.price}</td>
            <td><button class="purchase-btn" onclick="startPayment(${product.price}, '${product.name}')">Purchase</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// --- 2. FORM VALIDATION & ADDING DATA ---

function addProduct(event) {
    event.preventDefault(); // Prevent page reload
    
    const id = document.getElementById('prodId').value;
    const name = document.getElementById('prodName').value;
    const price = document.getElementById('prodPrice').value;
    const desc = document.getElementById('prodDesc').value;

    // Simple Validation
    if (!id || !name || isNaN(price)) {
        alert("Please enter valid product details!");
        return;
    }

    const newProduct = { id, name, price, desc, img: "placeholder.jpg" };
    
    let products = JSON.parse(localStorage.getItem('myProducts')) || [];
    products.push(newProduct);
    localStorage.setItem('myProducts', JSON.stringify(products));
    
    alert("Product added successfully!");
    window.location.href = "index.html"; // Redirect back to shop
}

// --- 3. EVENT HANDLING: MPESA PAYMENT SIMULATION ---
function startPayment(amount, productName) {
    // Prompt for Phone Number
    const phoneNumber = prompt(`You are buying ${productName} for Ksh ${amount}. Enter your M-Pesa number (e.g., 0712345678):`);

    // Validation
    const phoneRegex = /^(07|01|254)\d{8}$/;
    
    if (!phoneNumber) {
        return; // User cancelled
    }

    if (!phoneRegex.test(phoneNumber)) {
        alert("Error: Invalid M-Pesa number. Please use 07xx... format.");
        return;
    }

    // Dynamic UI feedback
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Processing...";

    // Simulating API Latency
    setTimeout(() => {
        alert(`STK Push sent to ${phoneNumber}. Please enter your PIN on your phone to authorize Ksh ${amount}.`);
        btn.disabled = false;
        btn.innerHTML = originalText;
    }, 1500);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('tbody')) loadProducts();
});
