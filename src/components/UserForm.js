import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [user, setUser] = useState({
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
    intent: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSkillsChange = (index, value) => {
    const updatedSkills = user.skills.map((skill, i) =>
      i === index ? value : skill
    );
    setUser({
      ...user,
      skills: updatedSkills,
    });
  };

  const handleLinksChange = (index, value) => {
    const updatedLinks = user.links.map((link, i) =>
      i === index ? value : link
    );
    setUser({
      ...user,
      links: updatedLinks,
    });
  };

  const addSkill = () => {
    setUser({
      ...user,
      skills: [...user.skills, ""],
    });
  };

  const addLink = () => {
    setUser({
      ...user,
      links: [...user.links, ""],
    });
  };

  return (
    <div className="form-container">
      <h1>Customizable Form</h1>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Skills:</label>
          {user.skills.map((skill, index) => (
            <div key={index} className="form-inline-group">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillsChange(index, e.target.value)}
                className="form-control"
              />
            </div>
          ))}
          <button type="button" onClick={addSkill} className="btn btn-add">
            Add Skill
          </button>
        </div>
        <div className="form-group">
          <label>Hourly Wage:</label>
          <input
            type="text"
            name="hourlyWage"
            value={user.hourlyWage}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Links:</label>
          {user.links.map((link, index) => (
            <div key={index} className="form-inline-group">
              <input
                type="text"
                value={link}
                onChange={(e) => handleLinksChange(index, e.target.value)}
                className="form-control"
              />
            </div>
          ))}
          <button type="button" onClick={addLink} className="btn btn-add">
            Add Link
          </button>
        </div>
        <div className="form-group">
          <label>Intent:</label>
          <textarea
            name="intent"
            value={user.intent}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
