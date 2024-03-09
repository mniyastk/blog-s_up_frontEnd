const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Georgia: ['source-serif-pro', 'Georgia, Cambria', "Times New Roman", 'Times', 'serif'],
        Sohnia:['sohne', "Helvetica Neue", 'Helvetica', 'Arial', 'sans-serif']
      },
    },
  },
  plugins: [],
});