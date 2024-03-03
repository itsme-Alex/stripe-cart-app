export async function fetchProducts() {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function initiateCheckout(cartItems) {
    try {

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartItems: cartItems }),
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const { url } = await response.json();
        window.location.href = url;
    } catch (error) {
    }
}
