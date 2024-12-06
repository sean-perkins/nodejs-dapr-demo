const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/orders', (req, res) => {
    console.log('Order received:', req.body);
    res.status(200).send('Order processed');
});

app.get('/', (req, res) => {
    res.send('Hello, Dapr!');
});

const { DaprClient } = require('@dapr/dapr');

const daprClient = new DaprClient("localhost", 3500);

app.post('/state', async (req, res) => {
    const state = req.body;
    await daprClient.state.save("statestore", [{ key: "order", value: state }]);
    res.status(200).send('State saved');
});

app.get('/state', async (req, res) => {
    const state = await daprClient.state.get("statestore", "order");
    res.status(200).json(state);
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

