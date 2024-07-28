import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-white/50 dark:bg-black/50 backdrop-blur w-full border-t border-b-slate-200 dark:border-b-slate-800 shadow-sm py-2 z-50 text-xs relative text-slate-700 dark:text-slate-300">
      <div className="max-w-lg mx-auto px-4 text-center">
        &copy; TodoFlow {new Date().getFullYear()}. All rights reserved. Design
        & Developed by{" "}
        <a
          href="https://sachindesai.in"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          SACHIN DESAI
        </a>
        .
      </div>
    </footer>
  );
};

export default Footer;
