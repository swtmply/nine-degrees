module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Helvetica', sans-serif",
        mono: "'Roboto Mono', monospace",
      },

      colors: {
        degreen: {
          DEFAULT: "#00d323",
        },
        acidic: {
          DEFAULT: "#CDF483",
        },
        yellowwallow: {
          DEFAULT: "#FAE62F",
        },
        redtagging: {
          DEFAULT: "#FF3707",
        },
        pinkaru: {
          DEFAULT: "#FFCDD4",
        },
        confusedPurple: {
          DEFAULT: "#EE50FF",
        },
        padeepBlue: {
          DEFAULT: "#4100FA",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
