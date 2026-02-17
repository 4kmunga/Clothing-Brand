// Mpesa logic 
const endpoint = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
const authHeader = `Bearer ${YOUR_ACCESS_TOKEN}`;

const payload = {
    "BusinessShortCode": "0755325194", // Your Paybill/Till number
    "Password": "GENERATED_PASSWORD",
    "Timestamp": "20260216235000",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": req.body.amount,
    "PartyA": req.body.phone,
    "PartyB": "174379",
    "PhoneNumber": req.body.phone,
    "CallBackURL": "https://yourdomain.com",
    "AccountReference": req.body.itemName,
    "TransactionDesc": "Payment for " + req.body.itemName
};


document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewGrid = document.querySelector('.review-grid');

    // 1. Load existing reviews from LocalStorage on page load
    const displayReviews = () => {
        const savedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        // Optional: Keep your original hardcoded reviews or clear and show only saved ones
        // reviewGrid.innerHTML = ''; 
        
        savedReviews.forEach(rev => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="stars">★★★★★</div>
                <p>"${rev.text}"</p>
                <strong>— ${rev.name}</strong>
            `;
            reviewGrid.appendChild(card);
        });
    };

    displayReviews();

    // 2. Handle new review submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page refresh

        const nameInput = reviewForm.querySelector('input[type="text"]');
        const textInput = reviewForm.querySelector('textarea');

        const newReview = {
            name: nameInput.value,
            text: textInput.value,
            date: new Date().toLocaleDateString()
        };

        // 3. Save to LocalStorage array
        const existingReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        existingReviews.push(newReview);
        localStorage.setItem('userReviews', JSON.stringify(existingReviews));

        // 4. Update the UI immediately
        const newCard = document.createElement('div');
        newCard.className = 'review-card';
        newCard.innerHTML = `
            <div class="stars">★★★★★</div>
            <p>"${newReview.text}"</p>
            <strong>— ${newReview.name}</strong>
        `;
        reviewGrid.appendChild(newCard);

        // 5. Reset form and alert user
        reviewForm.reset();
        alert('Review Submitted! It is now saved in your browser.');
    });
});

