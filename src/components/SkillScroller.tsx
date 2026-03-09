import { Card, Typography } from "antd"

type Skill = [string, string]

type Props = {
  skills: Skill[]
}

export default function SkillScroller({ skills }: Props) {
  const items = [...skills, ...skills, ...skills, ...skills] // duplicate for seamless loop

  return (
    <div style={{ height: "100%", overflow: "hidden", padding: 0 }}>
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          height: "100%",
          animation: "scrollSkills 30s linear infinite",
          whiteSpace: "nowrap"
        }}
      >
        {items.map(([img, name], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <img
              src={img}
              alt={name}
              style={{
                height: 15,
                width: 15,
                objectFit: "contain"
              }}
            />
            <Typography.Text style={{color:"grey", margin:0}} >{name}</Typography.Text>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes scrollSkills {
            from { transform: translateX(0); }
            to { transform: translateX(-136%); }
          }
        `}
      </style>
    </div>
  )
}