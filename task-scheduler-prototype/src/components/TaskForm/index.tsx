import { useTask } from "../../hooks/useTask";
import "./TaskForm.css";

export default function TaskForm() {
  const { 
    cron, command, recurrent, scheduledDate, 
    handleSubmit, setCronValue, setCommandValue, setScheduledDateValue, setReccurentValue 
  } = useTask();

  return (
    <form onSubmit={handleSubmit} className="task-form">
       <div className="recurrent-container">
        <input
          type="checkbox"
          id="recurrent"
          checked={recurrent}
          onChange={(e) => setReccurentValue(e.target.checked)}
        />
        <label htmlFor="recurrent">Recurrent Task</label>
      </div>
      {recurrent ? (
        <input
          type="text"
          value={cron}
          onChange={(e) => setCronValue(e.target.value)}
          placeholder="Cron Expression"
          className="task-input"
        /> 
      ) : (
        <input
          type="datetime-local"
          id="dateTime"
          value={scheduledDate}
          placeholder="One time task"
          onChange={(e) => setScheduledDateValue(e.target.value)}
        />
      )
    }
      <input
        type="text"
        value={command}
        onChange={(e) => setCommandValue(e.target.value)}
        placeholder="Command"
        className="task-input"
      />
      <button type="submit" className="task-button">
        Add Task
      </button>
    </form>
  );
}
