// script.js
document.getElementById('pos-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let itemName = document.getElementById('item-name').value;
    let itemQuantity = parseInt(document.getElementById('item-quantity').value);
    let itemPrice = parseFloat(document.getElementById('item-price').value);

    let cartItems = document.getElementById('cart-items');
    let listItem = document.createElement('li');
    listItem.textContent = `${itemName} - ${itemQuantity} x $${itemPrice.toFixed(2)} = $${(itemQuantity * itemPrice).toFixed(2)}`;
    cartItems.appendChild(listItem);

    let totalPriceElement = document.getElementById('total-price');
    let totalPrice = parseFloat(totalPriceElement.textContent);
    totalPrice += itemQuantity * itemPrice;
    totalPriceElement.textContent = totalPrice.toFixed(2);

    document.getElementById('pos-form').reset();
});

document.getElementById('checkout').addEventListener('click', function() {
    alert('Checkout complete! Total: $' + document.getElementById('total-price').textContent);
});

// Aditional Scripts
document.getElementById('checkout').addEventListener('click', function() {
    let items = [];
    document.querySelectorAll('#cart-items li').forEach(function(item) {
        items.push(item.textContent);
    });

    fetch('https://script.google.com/macros/s/AKfycbyvkR-Jk8XKrJAf-IVTIGb72py-luJB4J1l2f6zhRxPtj1oJuYumEhvE7ssLXyblwhRQw/exec', {
        method: 'POST',
        body: JSON.stringify({
            items: items.join('\n'),
            totalPrice: document.getElementById('total-price').textContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
});