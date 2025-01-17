self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
        body: data.body,
        title: data.title,
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});
