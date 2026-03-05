import { Button, Flex, Typography, Image, theme, Card } from "antd"
const { useToken } = theme
export default function Landing() {
    const { token } = useToken()
    return (
        <>
                <Card style={{
                    zIndex: 100, 
                    width: "98vw", 
                    height: "90.2vh", 
                    position: "absolute",
                     top: 0,
                     left:0,
                     justifyContent: "center",
                     alignItems: "center",
                     padding: 10,
                     opacity:1,
                     background:"none"}}>
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
                            paddingTop: 80,   // 👈 pushes text downward
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
                            <Button size="large" type="primary"
                            color="purple"
                            style={{ boxShadow:"0px 0px 10px 0px rgba(0, 0, 0, 0.5)"}}>Download Resume</Button>
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

            <div className="gradient-bg" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                result="goo"
                            />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                <div className="gradients-container">
                    <div className="g1" />
                    <div className="g2" />
                    <div className="g3" />
                    <div className="g4" />
                    <div className="g5" />
                    <div className="interactive" />
                </div>

            </div>


        </>
    );
}