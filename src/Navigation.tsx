import { Flex, Typography } from "antd";
import {
    LoadingOutlined,
    LinkedinFilled,
    GithubFilled,
    MailFilled,
    SettingFilled,
} from "@ant-design/icons";
import NavButton from "./components/NavButton";
import IconBtn from "./components/IconBtn";
import { useEffect, useState } from "react";

function scrollTo(id: string) {
    if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const SECTIONS: { id: string; label: string }[] = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Personal Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'about', label: 'About Me' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onItemClick }: { onItemClick?: () => void }) {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [flickerKey, setFlickerKey] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navIconOpacity = Math.min(1, scrollY / (window.innerHeight * 0.3));

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

    useEffect(() => {
        setFlickerKey(k => k + 1);
    }, [activeSection]);

    const centerLabel = activeSection
        ? (SECTIONS.find((s) => s.id === activeSection)?.label ?? 'Muhammad Omar')
        : 'Muhammad Omar';

    return (
        <div
            style={{
                background: "linear-gradient(to top, transparent, #000000 50%)",
                padding: "0 24px",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 2000,
                height: 120,
            }}
        >
            <style>{`
                @keyframes navFlicker {
                    0%   { opacity: 0; }
                    12%  { opacity: 1; }
                    15%  { opacity: 0.15; }
                    20%  { opacity: 1; }
                    24%  { opacity: 0; }
                    28%  { opacity: 1; }
                    100% { opacity: 1; }
                }
            `}</style>
            <Flex
                align="center"
                justify="space-between"
                style={{ height: 70, position: "relative" }}
            >
                {/* LEFT */}
                <Flex gap={5}>
                    <NavButton content="Home" onClick={() => { scrollTo('home'); onItemClick?.(); }} />
                    <NavButton content="Experience" onClick={() => { scrollTo('experience'); onItemClick?.(); }} />
                    <NavButton content="Personal Projects" onClick={() => { scrollTo('projects'); onItemClick?.(); }} />
                    <NavButton content="Resume" onClick={() => { scrollTo('resume'); onItemClick?.(); }} />
                    <NavButton content="About Me" onClick={() => { scrollTo('about'); onItemClick?.(); }} />
                    <NavButton content="Contact" onClick={() => { scrollTo('contact'); onItemClick?.(); }} />
                </Flex>

                {/* CENTER */}
                <Typography.Title
                    key={flickerKey}
                    level={5}
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        margin: 0,
                        whiteSpace: "nowrap",
                        color: "rgba(255, 255, 255, 0.8)",
                        opacity: 0,
                        animation: "navFlicker 700ms ease-out forwards",
                    }}
                >
                    {centerLabel}
                </Typography.Title>

                {/* RIGHT */}
                <Flex gap={0} style={{ opacity: navIconOpacity, transition: "opacity 150ms ease", pointerEvents: navIconOpacity < 0.05 ? "none" : "auto" }}>
                              <a
                                href="https://www.linkedin.com/in/m-o-927824397/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                    <IconBtn style={{ fontSize: 16 }}><LinkedinFilled /></IconBtn>

                              </a>
                              <a
                                href="https://github.com/m-omar624"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                          <IconBtn style={{ fontSize: 16 }}><GithubFilled /></IconBtn>

                              </a>
                    

                    <IconBtn style={{ fontSize: 16 }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}><MailFilled /></IconBtn>

                    <IconBtn style={{ fontSize: 16 }}><SettingFilled /></IconBtn>
                </Flex>
            </Flex>
        </div>
    );
}