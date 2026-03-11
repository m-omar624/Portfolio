EmailJS Template setup for Portfolio

Files in this repo:
- `emailjs-template.html` — HTML body to paste into EmailJS template editor
- `emailjs-template.txt` — Plain-text fallback body

Recommended EmailJS template settings:
- Subject: Portfolio Contact from {{from_name}}
- Reply-To: {{from_email}}
- Use the HTML body above as the template content (EmailJS allows HTML)

Template variables used (must match `templateParams` in your client):
- `from_name` — sender's name
- `from_email` — sender's email (use as Reply-To)
- `message` — message body
- `to_email` — optional fixed recipient (you can set recipient server-side or in the template)

Client (Vite) env variables required in `.env`:
- VITE_EMAILJS_SERVICE_ID=service_xxx
- VITE_EMAILJS_TEMPLATE_ID=template_xxx
- VITE_EMAILJS_PUBLIC_KEY=public_xxx

Notes:
- After creating the template in EmailJS, copy the Service ID, Template ID and Public Key into `.env`.
- Restart dev server after adding `.env` because Vite loads env vars at startup.
- Test sending from your local app; EmailJS dashboard -> Email Logs shows status.

Security:
- Do NOT commit `.env` to version control. Keep keys secret.

If you want, I can also patch `Contact.tsx` to include additional fields (phone, project link) and update the template accordingly.
