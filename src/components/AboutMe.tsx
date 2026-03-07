import { Card, Flex, Typography, theme } from "antd";

const { useToken } = theme;

export default function AboutMe() {
  const { token } = useToken();

  return (
    <section id="about">
      <Card size="small" style={{ borderRadius: 6, paddingInline:365 }}>
        <Flex
          gap={32}
          wrap="wrap"
          style={{ padding: "12px 8px" }}
        >
          {/* Photo */}
          <div
            style={{
              flex: "0 0 455px",
              height: 620,
              borderRadius: 6,
              overflow: "hidden",
              backgroundImage: "url(/freelance.avif)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />

          {/* Text content */}
          <Flex
            vertical
            gap={16}
            style={{ flex: "1 1 320px" }}
          >
            <Typography.Title
              level={2}
              style={{ color: token.colorText, marginBottom: 0 }}
            >
              About Me
            </Typography.Title>

            <Typography.Paragraph
              style={{ color: token.colorTextSecondary, fontSize: 16, lineHeight: 1.75, marginBottom: 0 }}
            >
              I'm currently a student at York University studying Computer Science. I strive to create scalable
              applications that solve real world problems. With 2.5 years of experience in software development, 
              I have a proven track record of delivering high-quality web applications and enterprise solutions. 
              I am passionate about leveraging technology to drive innovation and efficiency across various industries.
            </Typography.Paragraph>

            <Typography.Paragraph
              style={{ color: token.colorTextSecondary, fontSize: 16, lineHeight: 1.75, marginBottom: 0 }}
            >
              My current placement at Magna International as a Software Engineer has proven to be my most rewarding experience to date. 
              I have had the opportunity to work on a variety of projects, including developing a full stack web application for 
              managing supplier relationships and creating an internal tool for visualizing real simulation data. 
              I have also gained experience with cloud technologies such as Azure and have been able to apply my skills 
              in a real-world setting.
            </Typography.Paragraph>

                        <Typography.Paragraph
              style={{ color: token.colorTextSecondary, fontSize: 16, lineHeight: 1.75, marginBottom: 0 }}
            >
              I strive to continuously learn and grow as a developer. My goal is to apply my skills and experience to develop 
              large scale enterprise solutions in the automotive or aerospace industry. I am excited to explore new technologies and contribute 
              to innovative projects that have a positive impact on the world.
            </Typography.Paragraph>
          </Flex>
        </Flex>
      </Card>
    </section>
  );
}
