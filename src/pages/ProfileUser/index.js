import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes } from "firebase/storage";

import { storage } from "../../firebase/firebase-config";
import { getAvatarUser } from "../../utils/avatarUser";

import { Button } from "antd";

const ProfileUser = () => {
	const uploadRef = useRef();
	const [preview, setPreview] = useState("");
	const [img, setImg] = useState("");
	const [isUpload, setIsUpload] = useState(false);
	const {
		user: { email },
		avatarUser,
	} = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handlePreview = (e) => {
		if (!e.target.files[0]) return;
		const file = e.target.files[0];
		const url = URL.createObjectURL(file);
		setImg(file);
		setPreview(url);
		setIsUpload(true);
	};

	const handleUpload = () => {
		if (img == null) return;
		const imgRef = ref(storage, `avatarUser/avatar${email}`);
		uploadBytes(imgRef, img)
			.then(() => {
				getAvatarUser(email, dispatch);
			})
			.catch(() => {});
		setIsUpload(false);
		uploadRef.current.value = "";
	};

	return (
		<div>
			<label htmlFor="avatar" className="flex justify-center my-10">
				<img
					className="block w-[400px] h-[400px] rounded-full border object-cover select-none"
					src={preview ? preview : avatarUser}
					alt="avatar"
				/>
			</label>
			<div className="flex flex-col items-center gap-y-3">
				<input
					ref={uploadRef}
					className="cursor-pointer"
					placeholder="Chọn ảnh muốn thay thế"
					type="file"
					onChange={handlePreview}
				/>
				<Button
					className="block bg-blue-500 py-1 px-4 rounded-md"
					variant="contained"
					disabled={isUpload ? false : true}
					onClick={handleUpload}
				>
					Up load
				</Button>
			</div>
		</div>
	);
};

export default ProfileUser;
