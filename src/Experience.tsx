import { Card, Flex, Typography, Button, theme } from "antd"
import { useState } from "react"
import ExperienceCard from "./components/ExperienceCard"
import SkillScroller from "./components/SkillScroller"
const { useToken } = theme
export default function Experience() {
    const { token } = useToken()
    const [selectedExperience, setSelectedExperience] = useState<string>("Magna")

    return (<>
        <Card size="small">
            <Flex style={{ margin: 0 }} gap={2} >
                <ExperienceCard
                    experienceName="Magna"
                    image="/magna.png"
                    offsetX={10}
                    selectedExperience={selectedExperience}
                    setSelectedExperience={setSelectedExperience}
                >
                    <Flex vertical justify="space-between" style={{ width: "100%", marginTop: "30vh", height: "55%" }} gap={20}>
                        <Flex vertical gap={10}>
                            <Card size="small">
                                <Typography.Title level={4}>Software Engineer, Coop</Typography.Title>
                                <Typography.Text>Magna International | May 2025 – May 2026</Typography.Text>
                            </Card>
                            <Card size="small">
                                <Flex vertical gap={10}>
                                    <Typography.Text >Full stack developer for North America’s MML software team,
                                        working with other global teams to develop and maintain 4 apps.</Typography.Text>
                                    <Typography.Text>Developed a 3D rendering engine in Three.js to visualize
                                        and review multi-body dynamics simulation results and models, enabling
                                        engineers and designers convenient access to 25% of Magna MML’s product simulation data.</Typography.Text>
                                    <Typography.Text>Implemented point reduction solution for material charts, resulting in 80% reduction in data size while ensuring industry standard.</Typography.Text>

                                </Flex>
                            </Card>
                        </Flex>

                        <Flex vertical gap={10}>

                            <SkillScroller
                                skills={[
                                    ["/Magna/react.png", "React"],
                                    ["/Magna/ts.png", "TypeScript"],
                                    ["/Magna/js.svg", "JavaScript"],
                                    ["/Magna/python.png", "Python"],
                                    ["/Magna/flask.png", "Flask"],
                                    ["/Magna/three.png", "Three.js"],
                                    ["/Magna/sql.svg", "SQL"],
                                    ["/Magna/azure.png", "Azure"]
                                ]}></SkillScroller>
                            <Flex justify="center" gap={20}>
                                <Button type="primary" size="middle">Learn More</Button>
                                <Button type="default" size="middle">Interactive Mode</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </ExperienceCard>



                <ExperienceCard
                    experienceName="Bond"
                    image="/bond.avif"
                    selectedExperience={selectedExperience}
                    setSelectedExperience={setSelectedExperience}
                >
                    <Flex vertical justify="space-between" style={{ width: "100%", marginTop: "45%", height: "55%" }} gap={20}>
                        <Flex vertical gap={10}>

                            <Card size="small">
                                <Typography.Title level={4}>Software Developer</Typography.Title>
                                <Typography.Text>Bond Bookkeeping & Accounting | Sep 2024 – Apr 2025</Typography.Text>
                            </Card>
                            <Card size="small">
                                <Flex vertical gap={10}>
                                    <Typography.Text >Worked on developing an enterprise application for report generation
                                        and manipulation of client data.</Typography.Text>
                                    <Typography.Text>Built a database to securely store large scale client data and interact
                                        with the enterprise application, resulting in the addition of secure storage of client
                                        data and client history.</Typography.Text>

                                </Flex>
                            </Card>
                        </Flex>

                        <Flex vertical gap={10}>
                            <SkillScroller
                                skills={[
                                    ["/Bond/java.svg", "Java"],
                                    ["/Bond/springboot.svg", "SpringBoot"],
                                    ["/Bond/sql.svg", "SQL"],
                                    ["/Bond/docker.png", "Docker"],
                                    ["/Bond/html.png", "HTML"],
                                    ["/Bond/css.svg", "CSS"],
                                ]}></SkillScroller>
                        </Flex>
                    </Flex>
                </ExperienceCard>

                <ExperienceCard
                    experienceName="theScore"
                    image="/theScore.jpeg"
                    offsetX={100}
                    selectedExperience={selectedExperience}
                    setSelectedExperience={setSelectedExperience}
                >
                    <Flex vertical justify="space-between" style={{ width: "100%", marginTop: "45%", height: "55%" }} gap={20}>
                        <Flex vertical gap={10}>

                            <Card size="small">
                                <Typography.Title level={4}>QA Analyst / Automation, Coop</Typography.Title>
                                <Typography.Text>theScore | Jan 2024 – Sep 2024</Typography.Text>
                            </Card>
                            <Card size="small">
                                <Flex vertical gap={10}>
                                    <Typography.Text >Conducted tests for theScore and ESPN web and mobile apps, including production testing,
                                        ensuring stable, bug free releases.</Typography.Text>
                                    <Typography.Text>Conducted and verified automated tests, GitHub workflows, and Firebase configurations
                                        ensuring automations are functioning.</Typography.Text>
                                    <Typography.Text>Tested experimental and unstable features, successfully catching several low priority bugs and 3 major bugs.</Typography.Text>

                                </Flex>
                            </Card>
                        </Flex>

                        <Flex vertical gap={10}>
                            <SkillScroller
                                skills={[
                                    ["/theScore/playwright.webp", "Playwright"],
                                    ["/theScore/firebase.webp", "Firebase"],
                                    ["/theScore/js.svg", "JavaScript"],
                                    ["/theScore/Testrail.svg", "TestRail"],
                                    ["/theScore/dd.png", "Datadog"],
                                ]}></SkillScroller>
                        </Flex>
                    </Flex>
                </ExperienceCard>
                <ExperienceCard
                    experienceName="SellStatic"
                    image="/sellstatic.png"
                    logo="/sellstatic-logo.svg"
                    selectedExperience={selectedExperience}
                    setSelectedExperience={setSelectedExperience}
                />

                <ExperienceCard
                    experienceName="Freelance"
                    image="/freelance.avif"
                    logo="/freelance2.svg"
                    selectedExperience={selectedExperience}
                    setSelectedExperience={setSelectedExperience}
                />
            </Flex>
        </Card>

    </>)
}