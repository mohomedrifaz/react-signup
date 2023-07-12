import axios from "axios";

export default function useAPI() {
    const resendOTP = async (email, firstname) => {
        return axios.post(
            '/wp-json/v2cloud/v1/otp',
            {
                email: email,
                firstname: firstname,
            }
        )
        .catch(err => err)
    }

    return {
        resendOTP,
    }
}