import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { orderAPI } from '../services/api';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm({ amount, onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        try {
            const { data } = await orderAPI.createPaymentIntent(amount);
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                onSuccess(result.paymentIntent.id);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='p-4 border rounded-lg'>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                    },
                }} />
            </div>
            {error && <div className='text-red-600'>{error}</div>}
            <button 
                type='submit'
                disabled={!stripe || loading}
                className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50'
            >
                {loading ? 'Processing...' : `Pay Rp ${amount.toLocaleString('id-ID')}`}
            </button>
        </form>
    );
}

export default function StripeCheckout({ amount, onSuccess }) {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} onSuccess={onSuccess} />
        </Elements>
    );
}