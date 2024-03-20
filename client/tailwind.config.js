const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        biru: "rgb(83,169,248)",
        abu: "rgb(185,187,189)",
        ungu: "rgb(223,145,241)",
      },
    },
  },
  plugins: [],
});
