import i18n from "i18next";
import { optionLanguages } from "../utils/global";

import { Button, Dropdown } from "antd";

const items = [
	{
		label: "Tiếng việt",
		key: "vi",
	},
	{
		label: "English",
		key: "en",
	},
];

const useLanguage = () => {
	const handleChangeLanguages = (lng) => {
		i18n.changeLanguage(lng.key);
	};

	const menuProps = {
		items,
		onClick: handleChangeLanguages,
	};

	return (
		<div className="absolute top-3 right-3 z-50">
			<Dropdown menu={menuProps}>
				<Button className="flex items-center gap-x-1 dark:text-white">
					<img
						className="h-8 w-8 object-contain"
						src={
							i18n.language === "vi"
								? "/image/vn.png"
								: "/image/en.png"
						}
						alt=""
					/>
					{optionLanguages[i18n.language]}
				</Button>
			</Dropdown>
		</div>
	);
};

export default useLanguage;
