// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  // Next.js varsayılan kuralları
  ...nextVitals,
  ...nextTs,

  // Kendi kurallarımız
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      semi: ["error", "always"],

      // Tek tırnak kullanımı
      quotes: ["error", "single"],

      // Birden fazla boş satır yasak
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],

      // Objelerden önce ve sonra boş satır şart
      // Örneğin:
      // const x = 1;
      //
      // const obj = {};
      //
      // export default ...
      "padding-line-between-statements": [
        "error",
        // Object literal declaration – öncesi boş satır
        { blankLine: "always", prev: "*", next: "const" },
        { blankLine: "always", prev: "const", next: "*" },
      ],

      // Fonksiyonlardan önce ve sonra boş satır zorunlu
      "lines-around-function": [
        "error",
        {
          before: true,
          after: true,
        },
      ],

      // Parantez içinde boşluk zorunlu -> ( param )
      "space-in-parens": ["error", "always"],

      // = etrafında boşluk zorunlu
      "space-infix-ops": "error",
    },
  },

  // Hangi dosyalar ignore edilsin
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
