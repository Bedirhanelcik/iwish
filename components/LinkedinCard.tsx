"use client";

import "./linkedin-card.css";

export default function LinkedinCard() {
  return (
    <div className="tooltip-container flex items-center justify-center">
      <div className="tooltip">
        <div className="profile">
          <div className="user">
            <div className="img">
  <img
    src="/bedirhan.jpeg"
    alt="Bedirhan"
    className="h-full w-full rounded-[12px] object-cover"
  />
</div>

            <div className="details">
              <div className="name">
                Bedirhan Elçik
              </div>

              <div className="username">
                LinkedIn Profile
              </div>
            </div>
          </div>

          <div className="about">
            Developer
          </div>
        </div>
      </div>

      <div className="text">
        <a
          className="icon"
          href="https://www.linkedin.com/in/bedirhanelcik/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="layer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <span className="fab fa-linkedin">
              <svg
                viewBox="0 0 448 512"
                height="1em"
              >
                <path
                  d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                />
              </svg>
            </span>
          </div>

          <div className="text-linkedin">
            LinkedIn
          </div>
        </a>
      </div>
    </div>
  );
}