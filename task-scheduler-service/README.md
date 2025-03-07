# task-scheduler-service

The task-scheduler-service is a expressjs microservice, that allow users create one-time and recurring tasks

## Tech Stack

- Node +20
- Express v4
- IO Redis v5
- Node Cron v3
- WebSocket

## How to run

```bash
docker-compose up -d
```

```bash
npm install
```

```bash
npm run dev
```

## Endpoints

### Creating one-time and recurring tasks

```bash
curl --location 'http://localhost:3000/task-schedule' \
--header 'Content-Type: application/json' \
--data '{
  "cron_expression": "33 * 6 3 *",
  "job": "Print Hello World",
  "recurrent": false
}'
```

### List all scheduled tasks

```bash
curl --location 'http://localhost:3000/task-schedule'
```

### Delete a scheduled task by Id

```bash
curl --location --request DELETE 'http://localhost:3000/task-schedule/b3cdbdef-fd85-417f-9ecd-e8c5af16785e'
```