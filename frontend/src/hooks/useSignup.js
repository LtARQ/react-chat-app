import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullname,
    username,
    password,
    confirmpassword,
    gender,
  }) => {
    const success = handleInputDataError({
      fullname,
      username,
      password,
      confirmpassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmpassword,
          gender,
        }),
      });
      const data = await res.json();
      toast.success("success");
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      //localstorage setting data
      localStorage.setItem("ChatAppUser", JSON.stringify(data));

      //Context or Authenitication
      setAuthUser(data);
    } catch (error) {
      toast.error("Error signing up");
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

function handleInputDataError({
  fullname,
  username,
  password,
  confirmpassword,
  gender,
}) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}

export default useSignup;
