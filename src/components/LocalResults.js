import React, { useEffect, useState } from "react";
import { fetchLocalResults } from "../services/serpApiService";
import { generateEmailTemplate } from "../services/emailService";
import { replaceCompanyPlaceholder } from "../utils/emailTemplateHelper";
import "./LocalResults.css"; // Assuming you will add styles in this CSS file
import SearchBar from "./SearchBar";

const LocalResults = () => {
  const [results, setResults] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({
    subject: "",
    body: "",
  });
  const [emailTemplate, setEmailTemplate] = useState({
    subject: "",
    body: "",
  });
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [tempLoading, setTempLoading] = useState(false);

  const height = window.innerHeight;

  const user = {
    name: "John McCants",
    skills: [
      "Mobile app development",
      "React Native",
      "Swift",
      "Web Development",
    ],
    hourlyWage: "$20",
    links: [
      "github.com/johnmccants002",
      "linkedin.com/johnmccants",
      "youtube.com/johnmccants",
    ],
  };

  const handleGenerateEmails = async () => {
    if (results.length === 0) return;
    const company = results[0]; // Assuming you want to generate email for the first company in the list
    try {
      const template = await generateEmailTemplate(user, company);
      console.log(JSON.stringify(template));

      console.log(template.body, "THIS IS THE TEMPLATE BODY");
      const newTemp = JSON.parse(template.body);
      setEmailTemplate(newTemp);
      setCurrentTemplate(newTemp);
    } catch (error) {
      console.log("ERROR GENERATING EMAIL: ", error);
    }
  };

  const handleUpdateTemplate = (companyName) => {
    const newTemp = replaceCompanyPlaceholder(emailTemplate, companyName);
    setCurrentTemplate(newTemp);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchLocalResults(query);
      setResults(data);
    } catch (e) {
      console.log("ERROR GETTING DATA: ", e);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const data = await fetchLocalResults();
    //     setResults(data);
    //   } catch (e) {
    //     console.log("ERROR GETTING DATA: ", e);
    //   }
    // };
    // getData();
  }, []);

  return (
    <div className="container" style={{ height: height }}>
      <SearchBar onSearch={handleSearch} query={query} setQuery={setQuery} />
      <div className="container-two" style={{ height: height }}>
        {emailTemplate.subject ? (
          <div className="email-template" style={{ height: height * 0.7 }}>
            <h2>Generated Email</h2>
            <div className="email-subject">
              <p>
                <strong>Subject:</strong> {currentTemplate.subject}
              </p>
              <button
                className="copy-button"
                onClick={() =>
                  navigator.clipboard.writeText(currentTemplate.subject)
                }
              >
                Copy Subject
              </button>
            </div>
            <div className="email-body">
              <p>
                <strong>Body:</strong>
                <pre>{currentTemplate.body.replace(/\\n/g, "\n")}</pre>
              </p>
              <button
                className="copy-button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    currentTemplate.body.replace(/\\n/g, "\n")
                  )
                }
              >
                Copy Body
              </button>
            </div>
          </div>
        ) : (
          <div className="email-template">
            <button
              className="generate-email-button"
              onClick={handleGenerateEmails}
            >
              Generate Email Template
            </button>
          </div>
        )}
        <div className="results-table-container">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
              {results.map((result, index) => (
                <div
                  className="result-card"
                  key={index}
                  onClick={() => handleUpdateTemplate(result.title)}
                >
                  <div className="card-header">
                    <h3>{result.title}</h3>
                    <div className="card-tags">
                      <span className="tag">Full-time</span>
                      <span className="tag">Monday to Friday</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Address:</strong> {result.address}
                    </p>
                    <p>
                      <strong>Operating Hours:</strong> {result.hours}
                    </p>
                    <p>
                      <strong>Phone:</strong> {result.phone}
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={result.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.website}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalResults;
