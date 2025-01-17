const webPush = require('web-push');

// Replace with your generated VAPID keys
const vapidKeys = {
    publicKey: "YOUR_PUBLIC_KEY_HERE",
    privateKey: "YOUR_PRIVATE_KEY_HERE"
};

webPush.setVapidDetails(
    'mailto:somerandomexampleperson@gmail.com', // Replace with the email you used
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Dummy in-memory storage for subscriptions (the same array used in subscribe.js)
let subscriptions = [];

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { message } = req.body;  // Extract message to send from the request body

        // Send notification to all subscriptions
        const notifications = subscriptions.map(sub => {
            return webPush.sendNotification(sub, JSON.stringify({ title: 'New Notification', body: message }))
                .catch(error => console.error('Notification error:', error));
        });

        await Promise.all(notifications);
        res.status(200).json({ status: 'Notifications sent!' });
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
};
