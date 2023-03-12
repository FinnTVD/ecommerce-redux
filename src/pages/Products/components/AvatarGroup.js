import React from "react";

import { Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";

const AvatarGroup = () => {
	return (
		<Avatar.Group
			maxCount={2}
			maxStyle={{
				color: "#f56a00",
				backgroundColor: "#fde3cf",
			}}
		>
			<Avatar src="https://joesch.moe/api/v1/random?key=2" />
			<Avatar
				style={{
					backgroundColor: "#f56a00",
				}}
			>
				K
			</Avatar>
			<Tooltip title="Ant User" placement="top">
				<Avatar
					style={{
						backgroundColor: "#87d068",
					}}
					icon={<UserOutlined />}
				/>
			</Tooltip>
			<Avatar
				style={{
					backgroundColor: "#1890ff",
				}}
				icon={<AntDesignOutlined />}
			/>
		</Avatar.Group>
	);
};

export default AvatarGroup;
