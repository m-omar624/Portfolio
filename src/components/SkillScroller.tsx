import { Card, Typography } from "antd"

type Skill = [string, string]

type Props = {
  skills: Skill[]
}

export default function SkillScroller({ skills }: Props) {
  const items = [...skills, ...skills] // duplicate for seamless loop

  return (
    <Card size="small" style={{ height: 60, overflow: "hidden", padding: 0 }}>
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          height: "100%",
          animation: "scrollSkills 18s linear infinite",
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
                height: 28,
                width: 28,
                objectFit: "contain"
              }}
            />
            <Typography.Title level={4} style={{color:"grey"}}>{name}</Typography.Title>
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
    </Card>
  )
}