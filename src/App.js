import "./styles.css";
import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setJobs(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );

  const { title, dates, duties, company } = jobs[value];
  const companies = jobs.map((job) => job.company);
  const handleActiveCompany = (index) => setValue(index);
  return (
    <section className="section">
      <div className="title">
        <h2>Info</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {companies.map((company, index) => {
            return (
              <button
                className={`job-btn ${value === index && "active-btn"}`}
                onClick={() => handleActiveCompany(index)}
                key={index}
              >
                {company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-dates">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
