import { SKILL_ICON_URL } from "../../services/osrs/api";
import { RunescapeSkill } from "../../services/osrs/interface";

interface ExperienceTableProps {
  skills: RunescapeSkill[];
}

export default function ExperienceTable({ skills }: ExperienceTableProps) {
  return (
    <table id="skill-table">
      <thead>
        <tr>
          <th className="column-img"></th>
          <th className="column-skill">Skill</th>
          <th className="column">Rank</th>
          <th className="column">Level</th>
          <th className="column">XP</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill.metric}>
            <td className="column-img">
              <img
                src={SKILL_ICON_URL(skill.metric)}
                alt={`${skill.metric} icon`}
              />
            </td>
            <td className="column-skill">{skill.metric.charAt(0).toUpperCase() + skill.metric.slice(1)}</td>
            <td className="column">{skill.rank !== -1 ? skill.rank : "-"}</td>
            <td className="column">{skill.level}</td>
            <td className="column">{skill.experience !== -1 ? skill.experience.toLocaleString() : "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
