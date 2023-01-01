import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../../config/firebase_config";
import { LOG_OUT, UPDATE_PROFILE, userReducer } from "./userReducer";

const UserContext = createContext();
function UserProvider(props) {
  const [userState, dispatch] = useReducer(userReducer, { user: null });
  //
  const collectionRef_user = collection(db, "user");
  // get user from database
  useEffect(() => {
    // Lấy người dùng hiện tại đang đăng nhập ra
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(17, user);
    // lấy được id của người dùng -> truyền nó vào db để lấy ra những nội dung cần thiết ....
    if (user) {
      onSnapshot(collectionRef_user, (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .find((item) => item.userId === user?.uid);
        console.log(23, data);
        // if (data) updateProfile({ ...data });
      });
    }
  }, []);

  const updateProfile = ({ userId, username }) => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        userId,
        username,
      },
    });
  };

  const logOut = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  return (
    <UserContext.Provider
      value={{ user: userState.user, updateProfile, logOut }}
      {...props}
    ></UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (typeof context === "undefined")
    throw new Error("useUser must be used within a UserProvider");
  return context;
}

export { UserProvider, useUser };
