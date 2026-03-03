import { Flex, Button, Typography, theme } from "antd";
import {
    LoadingOutlined,
    LinkedinFilled,
    GithubFilled,
    MailFilled,
    SettingFilled,
} from "@ant-design/icons";
import NavButton from "./components/NavButton";

export default function Navbar() {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                backgroundColor: token.colorBgContainer,
                borderRadius: 10,
                padding: "0 24px",
            }}
        >
            <Flex
                align="center"
                justify="space-between"
                style={{ height: 70, position: "relative" }}
            >
                {/* LEFT */}
                <Flex gap={5}>
                    <LoadingOutlined />
                    <NavButton content="Home" onClick={() => { }} />
                    <NavButton content="Experience" onClick={() => { }} />
                    <NavButton content="Personal Projects" onClick={() => { }} />
                    <NavButton content="Resume" onClick={() => { }} />
                    <NavButton content="About Me" onClick={() => { }} />
                    <NavButton content="Contact" onClick={() => { }} />
                </Flex>

                {/* CENTER */}
                <Typography.Title
                    level={5}
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        margin: 0,
                    }}
                >
                    Muhammad Omar
                </Typography.Title>

                {/* RIGHT */}
                <Flex gap={1}>
                    <Button type="text" icon={<LinkedinFilled />} />
                    <Button type="text" icon={<GithubFilled />} />
                    <Button type="text" icon={<MailFilled />} />
                    <Button type="text" icon={<SettingFilled />} />
                </Flex>
            </Flex>
        </div>
    );
}