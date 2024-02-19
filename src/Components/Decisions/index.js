import React from 'react';
import './style.css';

// TODO: change this to use reactstrap components
function Decisions() {
  return (
    <form>
      <label className="decision-selection" htmlFor="status-decision">
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
        <button className="buttonContainer" type="button">Cancel</button>
        <button className="buttonContainer confirm" type="submit">Confirm</button>
      </div>
    </form>
  );
}

export default Decisions;
