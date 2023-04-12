import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Signup_EN from "./en/signup.en.json";
import Signup_VI from "./vi/signup.vi.json";
import Signin_EN from "./en/signin.en.json";
import Signin_VI from "./vi/signin.vi.json";

const resources = {
	en: {
		signup: Signup_EN,
		signin: Signin_EN,
	},
	vi: {
		signup: Signup_VI,
		signin: Signin_VI,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "vi",
	fallbackLng: "vi",
	ns: ["signup", "signin"],
	interpolation: {
		escapeValue: false,
	},
});
