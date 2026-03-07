import { useState } from "react";
import { Button, Card, Flex, Input, theme, Typography } from "antd";
import "./Contact.scss";
const { useToken } = theme;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useToken()

  return (
    <section id="contact">
      <Card size="small" style={{ width: "100%"}}>
        <Flex style={{justifyContent:"center"}}>
        <div style={{
          width: "100%",
          maxWidth: 480,
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorder}`,
          borderRadius: 12,
          padding: "32px 28px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBlock:50
        }}>
          <Typography.Title level={3}>
            Get In Touch
          </Typography.Title>

          <label className="contact-label">
            Name
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"

            />
          </label>

          <label className="contact-label">
            Email
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="contact-label">
            Subject
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </label>

          <label className="contact-label">
            Message
            <Input.TextArea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
            />
          </label>

          <Button type="primary" block size="large">
            Send Message
          </Button>
        </div>
        </Flex>



      </Card>


    </section>
  );
}
