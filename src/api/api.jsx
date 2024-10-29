import axios from 'axios';
import Cookies from 'js-cookie'

const apiUrl = "https://www.docinjob.com/api"
// const apiUrl = "http://localhost:3001/api"
const getCitiesUrl = `${apiUrl}/getUniqueCity`
const getSpecialityUrl = `${apiUrl}/getUniqueSpeciality`
const getOtpUrl = `${apiUrl}/sendOtp`
const verifyOtpUrl = `${apiUrl}/verifyOtp`
const getUserUrl = `${apiUrl}/getUser`
const updateUserUrl = `${apiUrl}/updateUser`
const searchUrl = `${apiUrl}/getDoctorFromClinc`
const getAppointmentUrl = `${apiUrl}/getAppointment`
const bookAppointmentUrl = `${apiUrl}/bookAppointment`
const appointmentPaymentUrl = `${apiUrl}/appointmentPayment`

export const GetCities = async () => {
    try {
        const response = await axios.post(getCitiesUrl);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.log("Data:", error.response.data);
            console.log("Status:", error.response.status);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            console.log("Request:", error.request);
        } else {
            console.log("Message:", error.message);
        }
    }
}

export const GetSpecialities = async () => {
    try {
        const response = await axios.post(getSpecialityUrl);
        return response.data;
    } catch (error) {
        console.error('Error in GetSpeciality:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}

export const GetOtp = async ({ phone }) => {
    try {
        const response = await axios.post(getOtpUrl, { phone: `${phone}` });
        return response.data;
    } catch (error) {
        console.error('Error in GetOtp:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
};

export const Login = async ({ phone, otp }) => {
    try {
        const response = await axios.post(verifyOtpUrl, {
            phone: `${phone}`,
            otp: `${otp}`,
        });

        const { token } = response.data;

        Cookies.set('token', token, { expires: 3 });

        return response.data;
    } catch (error) {
        console.error('Error in Login:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
        throw error;
    }
};

export const Logout = async () => {
    Cookies.remove('token');
}

export const GetUser = async () => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.get(getUserUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data; // Return the user data
    } catch (error) {
        console.error('Error in GetUser:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
};

export const UpdateUser = async ({ name, age, gender, address }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.put(updateUserUrl, {
            name: name,
            age: age,
            gender: gender,
            address: address,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }
        );

        return response.data; // Return the user data
    } catch (error) {
        console.error('Error in GetUser:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
        throw error;
    }
};

export const BookAppointment = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(bookAppointmentUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in BookAppointment:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}

export const AppointmentPayment = async ({ params }) => {
    try {
        const response = await axios.get(appointmentPaymentUrl, { params: params });
        return response.data;
    } catch (error) {
        console.error('Error in AppointmentPayment:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}

export const GetAppointments = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(getAppointmentUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in GetAppointments:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}

export const GetSearch = async ({ data }) => {
    try {
        const response = await axios.post(searchUrl, data);
        return response.data;
    } catch (error) {
        console.error('Error in CreateDoctor:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
};