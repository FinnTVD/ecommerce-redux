import MainLayout from "../../components/MainLayout";
import "../../index.css";
import { Outlet } from "react-router-dom";

const Admin = () => {
	return (
		<div>
			<MainLayout>
				<Outlet />
			</MainLayout>
		</div>
	);
};
export default Admin;
