import { useState } from "react";
import { Button, Input, Typography } from "antd";
import "./Contact.scss";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">
        <Typography.Title level={3} className="contact-card__heading">
          Get In Touch
        </Typography.Title>

        <label className="contact-label">
          Name
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="contact-input"
          />
        </label>

        <label className="contact-label">
          Email
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="contact-input"
          />
        </label>

        <label className="contact-label">
          Subject
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="contact-input"
          />
        </label>

        <label className="contact-label">
          Message
          <Input.TextArea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            className="contact-input"
          />
        </label>

        <Button type="primary" block size="large" className="contact-submit">
          Send Message
        </Button>
      </div>
    </section>
  );
}
