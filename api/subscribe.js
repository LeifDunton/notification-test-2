// Dummy in-memory storage for subscriptions
let subscriptions = [];

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const subscription = req.body;  // This is the subscription object from the frontend
        subscriptions.push(subscription);  // Store the subscription
        console.log('Subscription added:', subscription);
        res.status(201).json({ message: 'Subscription stored successfully!' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
