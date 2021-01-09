import React from 'react';
import Button from '../Button/index';
import './style.css';

function Decisions() {
  return (
    <form>
      <label htmlFor="status-decision" control="decisions">
        Decisions
        <select className="container" id="status-decision" name="decisions">
          <option>Active</option>
          <option>Inactive</option>
          <option>Incomplete</option>
          <option>Suspended</option>
          <option>Closed</option>
        </select>
      </label>
      <div className="decision-making">
        <Button text="Cancel" />
      </div>
      <div className="decision-making">
        <Button text="Confirm" />
      </div>
    </form>
  );
}

export default Decisions;
