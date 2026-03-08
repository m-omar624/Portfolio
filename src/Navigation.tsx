import { Flex, Button, Typography, theme } from "antd";
import {
    LoadingOutlined,
    LinkedinFilled,
    GithubFilled,
    MailFilled,
    SettingFilled,
} from "@ant-design/icons";
import NavButton from "./components/NavButton";
import { useEffect, useState } from "react";

function scrollTo(id: string) {
    if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const SECTIONS: { id: string; label: string }[] = [
    { id: 'experience',  label: 'Experience' },
    { id: 'projects',    label: 'Personal Projects' },
    { id: 'resume',      label: 'Resume' },
    { id: 'about',       label: 'About Me' },
    { id: 'contact',     label: 'Contact' },
];

export default function Navbar({ onItemClick }: { onItemClick?: () => void }) {
    const { token } = theme.useToken();
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        // Watch the very top of the page to revert to name
        const landingObserver = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setActiveSection(null); },
            { threshold: 0.1 }
        );
        const landing = document.getElementById('landing-hero');
        if (landing) landingObserver.observe(landing);
        return () => { observer.disconnect(); landingObserver.disconnect(); };
    }, []);

    const centerLabel = activeSection
        ? (SECTIONS.find((s) => s.id === activeSection)?.label ?? 'Muhammad Omar')
        : 'Muhammad Omar';

    return (
        <div
            style={{
                backgroundColor: token.colorBgContainer,
                borderRadius: "0px 0px 10px 10px",
                padding: "0 24px",
                position: "sticky",
                top: 0,
                zIndex: 2000,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 1)",
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
                    <NavButton content="Home" onClick={() => { scrollTo('home'); onItemClick?.(); }} />
                    <NavButton content="Experience" onClick={() => { scrollTo('experience'); onItemClick?.(); }} />
                    <NavButton content="Personal Projects" onClick={() => { scrollTo('projects'); onItemClick?.(); }} />
                    <NavButton content="Resume" onClick={() => { scrollTo('resume'); onItemClick?.(); }} />
                    <NavButton content="About Me" onClick={() => { scrollTo('about'); onItemClick?.(); }} />
                    <NavButton content="Contact" onClick={() => { scrollTo('contact'); onItemClick?.(); }} />
                </Flex>

                {/* CENTER */}
                <Typography.Title
                    level={5}
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        margin: 0,
                        transition: "opacity 0.3s",
                        whiteSpace: "nowrap",
                    }}
                >
                    {centerLabel}
                </Typography.Title>

                {/* RIGHT */}
                <Flex gap={1}>
                    <Button type="text" icon={<LinkedinFilled />} />
                    <Button type="text" icon={<GithubFilled />} />
                    <Button type="text" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}icon={<MailFilled />} />
                    <Button type="text" icon={<SettingFilled />} />
                </Flex>
            </Flex>
        </div>
    );
}