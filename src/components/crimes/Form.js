import React from 'react';
import AutoComplete from '../common/AutoComplete';
// import GoogleMap from '../common/GoogleMap';


const Form = ({ handleSubmit, handleChange, data, toggleSubmitReport }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="select">
          <label htmlFor="name">Name Shown</label>
          <select placeholder="Username" name="reportName"
            onChange={handleChange}>
            <option defaultValue>{data.username}</option>
            <option value="annoymous">annoymous</option>
          </select>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <div className="select">
            <label htmlFor="name">Crime</label>
            <select placeholder="Crime" name="crime" value={data.crime} onChange={handleChange}>
              <option defaultValue disabled value="">Please choose</option>
              <option>Robbery</option>
              <option>Motor Vehicle</option>
              <option>Assault</option>
              <option>Sexual Offence</option>
              <option>Gun Crime</option>
              <option>Racist Crime</option>
              <option>Homophobic Crime</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="name">Current Location</label>
        <input className="input" placeholder="Your location" value={data.pos} onChange={handleChange}/>
      </div>

      <div className="field">
        <label htmlFor="name">Location</label>
        <AutoComplete className="input" placeholder="Location" name="location" location={data.location} onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="name">Date of incident</label>
        <input className="input" type="date" placeholder="Date of incident" name="date" value={data.date} onChange={handleChange}/>

      </div>
      <div className="field">
        <label htmlFor="name">Incident Description</label>
        <input className="input" placeholder="Incident Description" name="incidentDescription" value={data.incidentDescription} onChange={handleChange}/>

      </div>
      {data.submitReport ? (
        <div>
          <p>Do you confirm that this incident happened to you and all of the above information is correct?</p>
          <button onSubmit={handleSubmit} className="button is-primary">Yes</button>
          <button onClick={toggleSubmitReport} className="button is-primary">No</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleSubmitReport} className="button is-primary">Submit</button>
        </div>
      )}
    </form>
  );
};

export default Form;
