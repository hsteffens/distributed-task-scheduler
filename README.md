# distributed-task-scheduler

The distributed task scheduler allow clients register a task and the time it should be executed. The tasks can be of two types:
 - **one-time task**: These are scheduled at a specific time, and once executed will not be repeated again.
    - One-time tasks shall be configurable in Pacific time. 
 - **recurring tasks**: These can be scheduled using Cron syntax and the system needs to execute them repeatedly according to the schedule.

## Requirements

- A task is either one-time execution or recurring.
- Clients must be able to register a task with either a specific time of execution or cron syntax for recurring tasks.
- A task should be picked up for execution within 10 seconds of its scheduled execution.
- Clients must be able to see the current list of scheduled tasks.
- Clients must be able to delete a task.
- Clients must be notified about the execution of their tasks.

## How to run 

```bash
docker-compose up --build
```

**Task Scheduler Prototype**: http://localhost:8080
**Task Scheduler Service**: http://localhost:3000

## Project architecture

The archictural aspects and desing of this project can be found in this document [Design Document](https://github.com/hsteffens/distributed-task-scheduler/blob/main/Distributed%20Task%20Scheduler.docx)


### Project Demo

YouTube Link: https://youtu.be/SddBMHRZsvo
