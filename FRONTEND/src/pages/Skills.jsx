import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";

const availableSkills = [
  { skill_id: 1, skill_name: "C++" },
  { skill_id: 2, skill_name: "Java" },
  { skill_id: 3, skill_name: "Python" },
  { skill_id: 4, skill_name: "JavaScript" },
  { skill_id: 5, skill_name: "React" },
  { skill_id: 6, skill_name: "Node.js" },
  { skill_id: 7, skill_name: "SQL" },
  { skill_id: 8, skill_name: "PostgreSQL" },
  { skill_id: 9, skill_name: "MongoDB" },
  { skill_id: 10, skill_name: "Data Structures" },
  { skill_id: 11, skill_name: "Algorithms" },
  { skill_id: 12, skill_name: "Machine Learning" },
  { skill_id: 13, skill_name: "Git" },
  { skill_id: 14, skill_name: "AWS" },
  { skill_id: 15, skill_name: "Docker" },
];

function Skills() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchSkills = async () => {
    try {
      const response = await api.get("/students/skills");
      setSkills(response.data.skills);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setError("Unable to load skills.");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async () => {
    if (!selectedSkill) {
      setMessage("Please select a skill.");
      return;
    }

    try {
      const response = await api.post("/students/skills", {
        skill_id: Number(selectedSkill),
      });

      setMessage(response.data.message);
      setSelectedSkill("");

      fetchSkills();
    } catch (error) {
      console.error("Failed to add skill:", error);
      setMessage("Failed to add skill.");
    }
  };

  const handleRemoveSkill = async (skillId) => {
    try {
      const response = await api.delete(`/students/skills/${skillId}`);

      setMessage(response.data.message);

      fetchSkills();
    } catch (error) {
      console.error("Failed to remove skill:", error);
      setMessage("Failed to remove skill.");
    }
  };

  if (error) {
    return <p className="alert error" role="alert">{error}</p>;
  }

  return (
    <div><div className="page-header"><div><h1>My skills</h1><p>Maintain the skills shown with your student profile.</p></div></div><section className="panel"><h2>Add a skill</h2><div className="form-grid"><div className="form-field"><label htmlFor="skill">Skill</label><select id="skill"
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
      >
        <option value="">Select a skill</option>

        {availableSkills.map((skill) => (
          <option key={skill.skill_id} value={skill.skill_id}>
            {skill.skill_name}
          </option>
        ))}
      </select></div></div><div className="form-actions"><button onClick={handleAddSkill}>Add skill</button></div>{message && <p className="alert success">{message}</p>}</section><section className="panel"><h2>Current skills</h2>

      {skills.length === 0 ? (
        <EmptyState title="No skills added" description="Add skills to keep your profile up to date." />
      ) : (
        <ul className="skill-list">
          {skills.map((skill) => (
            <li key={skill.skill_id}>
              {skill.skill_name}{" "}
              <button onClick={() => handleRemoveSkill(skill.skill_id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section></div>
  );
}

export default Skills;
