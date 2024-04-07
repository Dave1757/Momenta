// Summary Start
document.getElementById('rzp-button1').onclick = async function (e) {
  e.preventDefault();

  try {
    let response = await fetch("http://localhost:80/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 50000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Payment request failed with status: ${response.status}`);
    }

    let orderData = await response.json();

    let options = {
      "key": "rzp_test_JFFFUL2hS2Euas", // Replace With Your Actual Razorpay Key
      "amount": "50000",
      "currency": "INR",
      "order_id": orderData.id,
      "handler": function (response) {
        if (response.razorpay_payment_id) { // Check For Successful Payment
          alert("Payment Successful!");
          alert(`Your Payment Id is: ${response.razorpay_payment_id}`);
          window.location.href = "registration.html"; // Redirect After Successful Payment
        } else {
          alert("Payment Failed! Please try again.");
        }
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("An error occurred during payment. Please try again.");
  }
};
// Summary End

//Close Button Starts
function redirectToPage() {
  window.location.href = 'registration.html';
}
//Close Button Ends