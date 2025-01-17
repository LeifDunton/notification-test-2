
const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Dummy database for storing subscriptions
let subscriptions = [];

// VAPID keys for web-push notifications (generate your own!)
const vapidKeys = {
    publicKey: "BKGAHvGpHfhFMOxqd-if5nEHM-a972eR2z3MFwwkn0gTAAFUMiCO9P6ICwurIzFCHUVq-0_esweYl2ziUyHGk9s",
    privateKey: "z9y8Q6VtywrpdDw1xBAU2eVhQ2DtXjw_6eTeDn-jZ1A"
};
webPush.setVapidDetails(
    'mailto:somerandomexamplpeperson@gmail.com', // Replace with the email you used in the generator
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint for clients to subscribe
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({ message: 'Subscription added successfully!' });
});

// Endpoint to send notifications
app.post('/send-notification', (req, res) => {
    const message = req.body.message;
    const notifications = subscriptions.map(sub => {
        return webPush.sendNotification(sub, JSON.stringify({ title: 'New Notification', body: message }))
            .catch(error => console.error('Notification error:', error));
    });
    Promise.all(notifications).then(() => res.json({ status: 'Notifications sent!' }));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
