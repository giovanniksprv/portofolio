/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./!(build|dist|.*)/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "color-russet": "#7b4f1a",
        "color-white": "#fff",
        "opacity-white-20": "rgba(255, 255, 255, 0.2)",
        "color-russet-darkest": "#241707",
        "opacity-white-10": "rgba(255, 255, 255, 0.1)",
      },
      spacing: {
        "page-padding-padding-global": "64px",
        "section-padding-padding-section-large": "112px",
        "container-container-large": "1280px",
        "max-width-max-width-medium": "560px",
        "max-width-max-width-large": "768px",
        "max-width-max-width-xsmall": "400px",
        "section-padding-padding-section-medium": "80px",
        "max-width-max-width-small": "480px",
      },
      borderRadius: {
        "radius-medium": "0px",
        "radius-large": "0px",
      },
    },
    fontSize: {
      "text-sizes-text-regular": "16px",
      "text-sizes-heading-1": "56px",
      "text-sizes-text-medium": "18px",
      "text-sizes-heading-2": "48px",
      "text-sizes-heading-5": "24px",
      "text-sizes-text-small": "14px",
      "text-sizes-heading-6": "20px",
    },
    screens: {},
  },
  corePlugins: {
    preflight: false,
  },
};
