# CAPB - Captcha Integration (v3)

Welcome to the **CAPB** Captcha implementation! This project is designed to provide a clean, community-driven template for integrating **Google reCAPTCHA v3** and **Cloudflare Turnstile**. 

This repository is fully open-source—anyone is encouraged to fork it, improve it, and deploy it for their own use.

---

## 🚀 Features

* **Dual Integration:** Supports both Google reCAPTCHA v3 and Cloudflare Turnstile.
* **Lightweight:** Minimalistic code for fast loading and easy debugging.
* **Community Ready:** Easy to fork and modify for your specific needs.

---

## 🛠️ Setup Instructions

To get this project running on your own site, you must replace the placeholder keys with your actual API credentials.

### 1. Fork this Repository
Click the **Fork** button at the top right to create your own copy of this project.

### 2. Get Your API Keys
You will need to register your domain with the following services:
* **Google reCAPTCHA v3:** [Get Keys Here](https://www.google.com/recaptcha/admin)
* **Cloudflare Turnstile:** [Get Keys Here](https://dash.cloudflare.com/)

### 3. Replace Placeholders
Open the files within the `captcha-both` directory and search for the placeholder strings. Replace them as follows:

| Service | Placeholder to Replace | Where to find it |
| :--- | :--- | :--- |
| **reCAPTCHA v3** | `YOUR_RECAPTCHA_SITE_KEY` | Admin Console (v3 Site Key) |
| **Cloudflare** | `YOUR_TURNSTILE_SITE_KEY` | Cloudflare Dashboard |

> **Note:** Ensure you are using **v3** keys for reCAPTCHA, as this project is optimized for the invisible verification flow.

---

## 📂 Directory Structure

* `captcha-both/`: Contains the main logic for the dual-captcha setup.
* `index.html`: The front-end implementation and placeholder location.
* `README.md`: Project documentation.

---

## 🤝 Contributing

This project thrives on community support! 
1. **Fork** the repo.
2. **Create** a new branch for your feature.
3. **Commit** your changes.
4. **Push** and open a **Pull Request**.

Feel free to add new captcha providers or improve the security of the existing implementation.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
**Disclaimer:** *This repository is for educational and development purposes. Please use responsibly and adhere to the Terms of Service of the respective captcha providers.*
