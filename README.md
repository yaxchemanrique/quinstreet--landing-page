# QuinStreet Lead Generation Landing Page

## Overview

This project is a responsive and accessible lead generation landing page. It features real-time form validation, phone number masking, AJAX form submission, and a background color transition animation. This page has been specifically optimized for performance and accessibility.

---

## Features and Implementation Details

### General Features

- **Pixel-Perfect Design:** Developed to match provided mockups exactly, ensuring visual fidelity.
- **Responsive Design:** Adapts to both mobile and desktop views, with 767px defined as the mobile breakpoint.
- **Cross-Browser Compatibility:**
  - Thoroughly tested on:
    - Chrome version X
    - Safari version Y
    - Mozilla Firefox version Z
    - Microsoft Edge version W
    - Brave Browser
- **Background Color Transition:**
  - Utilizes a clever technique involving opacity transitions of pseudo-elements. This achieves the visual effect of transitioning background colors from `#ECF8FB` to `#EFEFEF` over 5 seconds, and vice versa, in a loop.
  - This method leverages a more efficient use of resources compared to direct color transitions, as modifying opacity is less CPU-intensive than changing background color properties.
- **WCAG Compliance:** Focus on accessibility for all users.
- **Text and Layout Flexibility:** The structure is resilient to content changes within the source, maintaining layout integrity and ensuring all content is accessible without breaking the design.

### Form Functionality

- **Input Validation:**
  - Implemented both via HTML constraints and Javascript, ensuring redundancy in client-side validation.
  - Validation feedback is visualized by highlighting erroneous fields with a border in `#D50303`, offering immediate user feedback.
  - **Name:** Requires at least 2 characters.
  - **Phone Number:** Must be in the format `(XXX) XXX-XXXX` and validated both on blur and during form submission..
  - **Email:** Must adhere to valid email format standards.
  - **City/State:** Optional fields.
  - Displays red border for invalid inputs.
- **Phone Number Masking:** Applied during the `blur` event to prevent user experience pitfalls associated with formatting during `input` events (i.e., preventing awkward cursor positioning and motion).
- **AJAX Submission:**
  - Data is posted asynchronously to the provided endpoint `https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar`, ensuring a fluid form submission without page reload.
  - Post-submission, inputs are disabled along with the submit button to ensure data integrity and align with the form’s completed state, even though the latter wasn't an explicit requirement.

### Accessibility

- **Screen Reader Optimization:**
  - Integrated `sr-only` classes for hidden yet accessible labels, ensuring that visual elements maintain information hierarchy and semantic meaning for users using assistive technologies.
- **Keyboard Navigation:**
  - The page has been structured to maintain intuitive tabbing order, allowing seamless keyboard navigation across all interactive elements.

### Custom CSS Properties

In this project, custom CSS properties are used to manage various styles. To provide flexibility while maintaining fallback values, pseudo-private custom properties have been implemented, identified by a leading underscore (e.g., `--_button-background`).

**Rationale:**

1. **Separation of Concerns:** Pseudo-private properties allow the internal component logic to be distinguished from customizable API-like properties that developers can set.
2. **Defaults Management:** Utilizing a fallback mechanism ensures default styling is always applied even if external variables are not set, preventing unstyled components.
3. **Reduced Specificity Issues:** Using internal properties avoids forcing developers to override existing rules with higher specificity, thereby promoting ease of style adjustments.
4. **Component Isolation:** This approach minimizes the chances of external styles inadvertently affecting component-specific styles, aligning with the modular and encapsulated design principle.

### Font Hosting and Formats

Due to the GDPR regulations in Europe, the fonts used are self-hosted. This setup avoids external requests to Google Fonts, which helps in protecting user privacy by not sharing data without user consent.

- Both `.woff` and `.woff2` formats are utilized:
  - **WOFF2** is the modern standard, offering better compression and performance.
  - **WOFF** provides fallback support for browsers lacking WOFF2 compatibility.

---

## Setup Instructions

1. Clone the repository:

```bash
  git clone <repository-url>
```

2. Navigate to Project Directory:

```bash
  cd lead-gen-landing-page
```

3. Open `index.html` in your browser to view the landing page.

---

## File Structure

``` bash
project
│   index.html
│   README.md
│
└─── css
│    │   root.css
│    │   styles.css
│   
└─── js
│    │   index.js
│   
└─── assets
│    │
│    └─── fonts
│    │    │   
│    │    └─── Montserrat
│    │     
│    └─── images
```

- `index.html`: Main HTML structure.
- `root.css`: Defines base styles and variables.
- `styles.css`: Styles for responsive layout, animations, and design.
- `index.js`: JavaScript logic for form handling, AJAX, and DOM interactions.
- `assets`: Contains fonts and image resources.

---

## Development Notes

- **Time Investment:** The completion of this project spanned approximately X hours. The styling and responsive adjustments, specifically tailoring pixel-perfect outcomes across devices and compliance with WCAG, were notably time-intensive.
- **Challenges:**
  - Developing the border for the article section by creatively employing background properties combined with linear gradients to produce a decorative border effect.
  - Creating a visually appealing yet resource-efficient background transition using pseudo-elements.
- **Future Enhancements:**
  - Recommend server-side validation for added security.
  - Consider integrating inline error messages for enhanced user feedback

---

## User Experience Recommendations

- **Visible Labels for Inputs:** To enhance UX, visible input labels could be useful, as current reliance on placeholders may limit contextual guidance upon text input resulting in reduced clarity.
- **Labels for Screen Readers:** Acknowledging users with screen readers, context-providing labels were specifically integrated for intuitive navigation and usage.
- **Post-Submission State:** Post-successful submission, disabling form inputs alongside the button not only meets the requirements but mitigates potential user confusion—ensuring data integrity post-interaction.

---

## Live Site

Visit the hosted site to explore the functionalities and view the project in action: [Hosted Page URL](https://yaxchemanrique.github.io/quinstreet--landing-page/)

---

## Final Comments

This project underscores best practices in front-end development such as responsiveness, accessibility, and efficient coding practices. It offers a solid foundation for further scalability and enhancement to accommodate potential future requirements or features. Future endeavors could enhance error feedback mechanisms, integrating a more dynamic inline validation approach with descriptive error messaging.
