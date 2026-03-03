import { Button, Flex, Typography, Image, theme, Card } from "antd"
const { useToken } = theme
export default function Landing() {
    const { token } = useToken()
    return (
        <>
            <Card>
                <Flex style={{ marginBlock: 30 }} gap={60}>

                    {/* Left Section */}

                    <Flex
                        vertical
                        gap={0}
                        align="center"
                        justify="flex-start"
                        style={{
                            flex: 1,
                            marginLeft: 30,
                            height: "78vh",
                            paddingTop: 150,   // 👈 pushes text downward
                        }}
                    >
                        <Typography.Title
                            level={1}
                            style={{
                                fontSize: 70,
                                fontWeight: 700,
                                textAlign: "left",
                            }}
                        >
                            Providing Enterprise Solutions for Industry Problems.
                        </Typography.Title>

                        <Typography.Text
                            style={{
                                fontSize: 22,
                                textAlign: "center",
                                fontFamily: "sans-serif",
                                color: token.colorTextLabel,
                            }}
                        >
                            A dedicated Software Developer, with 2.5 years of experience developing
                            web applications and large scale enterprise solutions. I aim to digitize
                            the industries that our world is built upon. Explore my latest experience
                            and projects showcasing my skills in full stack development.
                        </Typography.Text>

                        <Flex gap={16} style={{ marginTop: 40 }}>
                            <Button size="large" type="primary">Download Resume</Button>
                            <Button size="large" type="default">More About Me</Button>
                        </Flex>
                    </Flex>

                    {/* Right Section */}
                    <Flex
                        align="center"
                        justify="center"
                        style={{ flex: 1 }}
                    >
                        <Image
                            style={{ maxWidth: "80%", height: "auto", marginLeft: 70 }}
                            src="/landing.png"
                            preview={false}
                        />
                    </Flex>

                </Flex>
            </Card>

        </>
    );
}