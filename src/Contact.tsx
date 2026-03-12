import { Flex, Input, Typography } from "antd";
import { GithubFilled, LinkedinFilled, MailFilled } from "@ant-design/icons";
import AppButton from "./components/AppButton";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState, type CSSProperties } from "react";

function useScrollVisible<T extends HTMLElement>(threshold = 0.1) {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, visible };
}

export default function Contact() {
    const section = useScrollVisible<HTMLDivElement>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const cardStyle = (delay: number): CSSProperties => ({
        opacity: section.visible ? 1 : 0,
        transform: section.visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 480ms ease ${delay}ms, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1) ${delay}ms`,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
    });

    const inputStyle: CSSProperties = {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.9)",
        borderRadius: 6,
    };

    const handleSend = async () => {
        if (!name || !email || !message) return;

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "muhammad.omar1141@gmail.com",
        };

        if (serviceId && templateId && publicKey) {
            try {
                await emailjs.send(serviceId as string, templateId as string, templateParams, publicKey as string);
                alert("Message sent — thank you!");
                setName(""); setEmail(""); setMessage("");
            } catch (err) {
                console.error(err);
                alert("Send failed — opening your mail client instead.");
                const to = "muhammad.omar1141@gmail.com";
                const subject = `Portfolio Contact from ${name}`;
                const body = `From: ${name}\nEmail: ${email}\n\n${message}`;
                window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                setTimeout(() => { setName(""); setEmail(""); setMessage(""); }, 500);
            }
        } else {
            const to = "muhammad.omar1141@gmail.com";
            const subject = `Portfolio Contact from ${name}`;
            const body = `From: ${name}\nEmail: ${email}\n\n${message}`;
            window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setTimeout(() => { setName(""); setEmail(""); setMessage(""); }, 500);
        }
    };

    return (
        <div id="contact" style={{ position: "relative", padding: "40px 0 80px", paddingInline: "20vw" }}>
            <style>{`
                @keyframes sectionFlicker {
                    0%, 19% { opacity: 0; }
                    20% { opacity: 1; }
                    21% { opacity: 0.25; }
                    24% { opacity: 1; }
                    27% { opacity: 0; }
                    29% { opacity: 1; }
                    80% { opacity: 1; }
                    85% { opacity: 0.85; }
                    90%, 100% { opacity: 1; }
                }
                #contact input::placeholder,
                #contact input::-webkit-input-placeholder,
                #contact textarea::placeholder,
                #contact textarea::-webkit-input-placeholder {
                    color: rgba(255, 255, 255, 0.55) !important;
                    opacity: 1 !important;
                }
            `}</style>
            <div ref={section.ref} style={{ height: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }}>

                {/* Header */}
                <Flex gap={10} align="center" style={{
                    opacity: 0,
                    animationName: section.visible ? "sectionFlicker" : undefined,
                    animationDuration: "1400ms",
                    animationTimingFunction: "ease-out",
                    animationFillMode: "forwards",
                    animationDelay: "100ms",
                }}>
                    <Typography.Title level={2} style={{ marginTop: 24, lineHeight: 1, color: "white" }}>
                        Get In Touch
                    </Typography.Title>
                </Flex>

                <Flex gap={16} style={{ marginTop: 24 }}>
                    {/* LEFT — message form */}
                    <Flex vertical gap={12} style={{ width: "60%" }}>
                        <div style={{ ...cardStyle(120), padding: 24 }}>
                            <Typography.Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
                                Send a Message
                            </Typography.Text>
                            <Flex vertical gap={12} style={{ marginTop: 16 }}>
                                <Flex gap={12}>
                                    <Input
                                        className="app-input"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        style={inputStyle}
                                    />
                                    <Input
                                        className="app-input"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        style={inputStyle}
                                    />
                                </Flex>
                                <Input.TextArea
                                    className="app-input"
                                    placeholder="Your message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    rows={5}
                                    style={{ ...inputStyle, resize: "none" }}
                                />
                                <Flex justify="flex-end">
                                    <AppButton onClick={handleSend} variant="default">
                                        <Typography.Text style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Send Message</Typography.Text>
                                    </AppButton>
                                </Flex>
                            </Flex>
                        </div>
                    </Flex>

                    {/* RIGHT — links & info */}
                    <Flex vertical gap={12} style={{ width: "40%" }}>
                        <div style={{ ...cardStyle(240), padding: 24 }}>
                            <Typography.Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
                                Connect With Me
                            </Typography.Text>
                            <Flex vertical gap={14} style={{ marginTop: 20 }}>
                                <Flex align="center" gap={12}>
                                    <MailFilled style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }} />
                                    <Typography.Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
                                        muhammad.omar1141@gmail.com
                                    </Typography.Text>
                                </Flex>
                                <Flex align="center" gap={12}>
                                    <LinkedinFilled style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }} />
                                    <Typography.Link
                                        href="https://www.linkedin.com/in/m-o-927824397/"
                                        target="_blank"
                                        style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}
                                    >
                                        https://www.linkedin.com/in/m-o-927824397/
                                    </Typography.Link>
                                </Flex>
                                <Flex align="center" gap={12}>
                                    <GithubFilled style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }} />
                                    <Typography.Link
                                        href="https://github.com/m-omar624"
                                        target="_blank"
                                        style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}
                                    >
                                        https://github.com/m-omar624
                                    </Typography.Link>
                                </Flex>
                            </Flex>
                        </div>

                        <div style={{ ...cardStyle(360), padding: 24 }}>
                            <Typography.Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
                                Based In
                            </Typography.Text>
                            <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginTop: 12, marginBottom: 4 }}>
                                Toronto, Ontario
                            </Typography.Title>
                            <Typography.Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                                Open to remote and on-site opportunities
                            </Typography.Text>
                        </div>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}
