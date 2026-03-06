# JagTechno - Enterprise Automation Solutions

A modern, responsive, and enterprise-grade web application for JagTechno, showcasing IIoT, PLC Automation, and Custom Software Solutions.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design using Bootstrap 5 and custom CSS variables.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Interactive Elements**: Smooth scrolling, animations (AOS), and dynamic navigation.
- **Form Handling**: Secure PHP-based contact form with validation and user feedback.
- **SEO Optimized**: Meta tags, Open Graph data, and semantic HTML structure.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3
- **Backend**: PHP 7.4+ (for form handling)
- **Libraries**: FontAwesome (Icons), AOS (Animations), Google Fonts (Inter)

## 📂 Project Structure

```
JagTechno/
├── index.html          # Main landing page
├── styles.css          # Custom styles and theme variables
├── script.js           # Frontend logic and interactivity
├── submit_form.php     # PHP script for handling contact form submissions
├── blog/               # Blog section
│   └── esp32-getting-started.html
├── README.md           # Project documentation
└── ...
```

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/aniketsjagtap/JagTechno.git
    ```

2.  **Run locally**:
    -   You need a local server environment (like XAMPP, WAMP, or MAMP) to run the PHP form handler.
    -   Place the project folder in your server's root directory (e.g., `htdocs` for XAMPP).
    -   Access the site via `http://localhost/JagTechno`.

    *Alternatively, for frontend only:*
    -   You can open `index.html` directly in your browser, but the contact form will not send emails.

3.  **Assets**:
    -   Place your logo at `logo.png` in the root directory.
    -   Add a favicon at `favicon.ico`.

## 🎨 Customization

-   **Colors**: Edit the `:root` variables in `styles.css` to change the color scheme.
-   **Content**: Update the text in `index.html` and `blog/*.html`.
-   **Email**: Update the recipient email address in `submit_form.php`.

## 📄 License

This project is licensed under the MIT License.
