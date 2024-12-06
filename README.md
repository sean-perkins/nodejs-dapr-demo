# Dapr Node.js Demo

This is a demo application showcasing Dapr's capabilities with Node.js. It includes endpoints for state management and Pub/Sub communication.

---

## Endpoints and Usage

### 1. Health Check

**Endpoint:**
```
GET /
```

**Description:**
A simple health check to verify that the application is running.

**Example:**
```
curl http://localhost:3000
```

**Response:**
```
Hello, Dapr!
```

---

### 2. Publish an Order (Pub/Sub)

**Endpoint:**
```
POST /v1.0/publish/pubsub/orders
```

**Description:**
Publish a message to the `orders` topic using Dapr's Pub/Sub.

**Example:**
```
curl -X POST http://localhost:3500/v1.0/publish/pubsub/orders \
-H "Content-Type: application/json" \
-d '{"orderId": "12345"}'
```

**Expected Behavior:**
The application logs will display the published order:
```
Order received: { "orderId": "12345" }
```

---

### 3. Save State

**Endpoint:**
```
POST /state
```

**Description:**
Save a key-value pair in the configured state store.

**Example:**
```
curl -X POST http://localhost:3000/state \
-H "Content-Type: application/json" \
-d '{"orderId": "12345"}'
```

**Response:**
```
State saved
```

---

### 4. Retrieve State

**Endpoint:**
```
GET /state
```

**Description:**
Retrieve the state stored in the state store.

**Example:**
```
curl http://localhost:3000/state
```

**Response:**
```
{"orderId": "12345"}
```

---

## Additional Information

- **Pub/Sub Topic:** The application listens for messages published to the `orders` topic.
- **State Store Name:** The state store is configured as `statestore` using Redis.

---

## Logs

To view logs for the application and Dapr sidecar:

1. Application logs:
   These are displayed in the terminal where the application is running.

2. Dapr sidecar logs:
   ```
   dapr logs --app-id node-app
   ```

---

## Cleanup

To stop the application and remove dependencies:

1. Stop the Dapr application:
   ```
   dapr stop --app-id node-app
   ```

2. Stop and remove the Redis container:
   ```
   docker stop redis
   docker rm redis
   ```