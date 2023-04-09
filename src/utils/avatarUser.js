import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase/firebase-config";
import { setAvatarUser } from "../store/AuthSlice";

const listRef = ref(storage, "avatarUser");
export const getAvatarUser = (email = "", dispatch = () => {}) => {
	listAll(listRef).then((res) => {
		//res return object {prefixes,items}
		//items is array
		res.items.forEach((item) => {
			//custom name img
			if (item._location.path_ === `avatarUser/avatar${email}`) {
				getDownloadURL(item).then((url) => {
					dispatch(setAvatarUser(url));
				});
			}
		});
	});
};
