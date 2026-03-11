import { Typography } from "antd"

type Skill = [string, string]

type Props = {
  skills: Skill[]
}

export default function SkillTags({ skills }: Props) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      padding: "5px 5px",
    }}>
      {skills.map(([img, name]) => (
        <div
          key={name}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <img
            src={img}
            alt={name}
            style={{ height: 14, width: 14, objectFit: "contain" }}
          />
          <Typography.Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, margin: 0 }}>
            {name}
          </Typography.Text>
        </div>
      ))}
    </div>
  )
}