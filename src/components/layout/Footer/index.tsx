import React from "react";

import { siteName } from "@/constants";

import Styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <img src="/img/logo.png" alt="Logo" />
      <p>{siteName}</p>
      <p>&copy; 1986 - {new Date().getFullYear()}</p>

      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://forms.gle/otS87vqD8eFADqzU8"
        title="Report bugs"
      >
        <span role="img" aria-label="Bug">
          Submit Feedback
        </span>
      </a>
    </footer>
  );
};

export default Footer;
