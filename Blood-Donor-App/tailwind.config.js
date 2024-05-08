/** @type {import('tailwindcss').Config} */
module.exports = {
    content: {
        relative: true,
        files: ["./Views/**/*.cshtml"],
    }
        ,
  theme: {
    extend: {},
  },
    plugins: [require('@tailwindcss/forms')],
    plugins: [require('@tailwindcss/typography')]
}