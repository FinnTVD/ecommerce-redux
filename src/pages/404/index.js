import React from "react";
import { Link } from "react-router-dom";
import styles from "./404.module.css";

const Page404 = () => {
	return (
		<div className={styles.container_404}>
			<div
				className={`relative h-screen overflow-hidden bg-black select-none ${styles.box_404}`}
			>
				<h1 className={styles.title_404}>404</h1>
				<h2 className={styles.title_404_found}>Page not found</h2>
				<Link to="/" className={styles.btn_404_home}>
					Home page
				</Link>
			</div>
		</div>
	);
};

export default Page404;
