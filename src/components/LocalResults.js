import React, { useEffect, useState } from "react";
import { fetchLocalResults } from "../services/serpApiService";
import {
  generateEmailTemplate,
  updateEmailTemplate,
  customEmailTemplate,
} from "../services/emailService";
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
  const [savedTemplates, setSavedTemplates] = useState([]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [tempLoading, setTempLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
    // Assuming you want to generate email for the first company in the list
    console.log("GENERATING EMAILS");
    try {
      const template = await generateEmailTemplate(user);
      console.log(JSON.stringify(template));

      console.log(template, "THIS IS THE TEMPLATE BODY");

      setEmailTemplate(template);
      setCurrentTemplate(template);
    } catch (error) {
      console.log("ERROR GENERATING EMAIL: ", error);
    }
  };

  const handleTransformation = async (transformation) => {
    try {
      const updatedTemplate = await updateEmailTemplate(
        emailTemplate,
        transformation
      );
      console.log(updatedTemplate);
      setEmailTemplate(updatedTemplate);
      setCurrentTemplate(updatedTemplate);
    } catch (error) {
      console.error("Error updating email template:", error);
    }
  };

  const handleCustomTemplate = async (prompt, template) => {
    const userString = JSON.stringify(user);
    try {
      const updatedTemplate = await customEmailTemplate(
        prompt,
        template,
        userString
      );
      setEmailTemplate(updatedTemplate);
      setCurrentTemplate(updatedTemplate);
    } catch (error) {
      console.log("ERROR CUSTOM TEMPLATE", error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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

  return (
    <div className="container" style={{ height: height }}>
      <SearchBar onSearch={handleSearch} query={query} setQuery={setQuery} />
      <div className="container-two">
        {emailTemplate.subject ? (
          <div className="email-template">
            <div>
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
            <div className="button-container">
              <button onClick={() => handleTransformation("sales-y")}>
                Make more sales-y
              </button>
              <button onClick={() => handleTransformation("shorter")}>
                Make shorter
              </button>
              <button onClick={() => handleTransformation("layman")}>
                Put in layman's terms
              </button>
            </div>
            <div>
              <button>Save Template</button>
            </div>
            <textarea
              className="text-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message here..."
            />
            <button
              onClick={() => handleCustomTemplate(inputValue, emailTemplate)}
            >
              Create Custom Email Template
            </button>
          </div>
        ) : (
          <div className="email-template">
            <button
              className="generate-email-button"
              onClick={handleGenerateEmails}
            >
              Generate Email Template
            </button>
            <textarea
              className="text-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message here..."
            />
            <button
              onClick={() => handleCustomTemplate(inputValue, emailTemplate)}
            >
              Create Custom Email Template
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
