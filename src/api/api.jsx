import axios from 'axios';
import Cookies from 'js-cookie'

const apiUrl = "https://www.docinjob.com/api"
// const apiUrl = "http://localhost:3001/api"
const getOtpUrl = `${apiUrl}/sendOtp`
const verifyOtpUrl = `${apiUrl}/verifyOtp`
const getUserUrl = `${apiUrl}/getUser`
const updateUserUrl = `${apiUrl}/updateUser`
const adminLoginUrl = `${apiUrl}/adminLogin`
const getAdminUserUrl = `${apiUrl}/getAdmin`
const getDoctorUrl = `${apiUrl}/getDoctor`
const createDoctorUrl = `${apiUrl}/createDoctor`
const updateDoctorUrl = `${apiUrl}/updateDoctor`
const getClinicUrl = `${apiUrl}/getClinic`
const getClinicByIdUrl = `${apiUrl}/getClinicById`
const createClinicUrl = `${apiUrl}/createClinic`
const updateClinicUrl = `${apiUrl}/updateClinic`
const searchUrl = `${apiUrl}/getDoctorFromClinc`
const getAppointmentUrl = `${apiUrl}/getAppointment`
const bookAppointmentUrl = `${apiUrl}/bookAppointment`
const getCitiesUrl = `${apiUrl}/getUniqueCity`
const getSpecialityUrl = `${apiUrl}/getUniqueSpeciality`
const appointmentPaymentUrl = `${apiUrl}/appointmentPayment`
const deleteDoctorUrl = `${apiUrl}/deleteDoctor`
const deleteClinicUrl = `${apiUrl}/deleteClinic`
const deleteTimingUrl = `${apiUrl}/deleteTiming`
const addTimingUrl = `${apiUrl}/addTiming`
const updateTimingUrl = `${apiUrl}/updateTiming`
const verifyClinicOtpUrl = `${apiUrl}/verifyClinicOtp`
const getClinicOtpUrl = `${apiUrl}/resendClinicOtp`


export const VerifyClinicOtp = async ({ data }) => {
    try {
        const response = await axios.post(verifyClinicOtpUrl, data);
        return response.data;
    } catch (error) {
        console.error('Error in VerifyClinicOtp:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const GetClinicOtp = async ({ data }) => {
    try {
        const response = await axios.post(getClinicOtpUrl, data);
        return response.data;
    } catch (error) {
        console.error('Error in GetClinicOtp:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const DeleteDoctor = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(deleteDoctorUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in DeleteDoctor:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const DeleteClinic = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(deleteClinicUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in DeleteClinic:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const AddTiming = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.put(addTimingUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in AddTiming:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}

export const UpdateTiming = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.put(updateTimingUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in UpdateTiming:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const DeleteTiming = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(deleteTimingUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in DeleteTiming:', error.response ? error.response.data : error.message);
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


// Function to request OTP
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


// Function to verify OTP and login
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


export const AdminLogin = async ({ id, password }) => {
    try {
        const response = await axios.post(adminLoginUrl, {
            adminId: `${id}`,
            password: `${password}`,
        });

        const { token } = response.data;

        Cookies.set('token', token, { expires: 3 });

        return response.data;
    } catch (error) {
        console.error('Error in AdminLogin:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
        throw error;
    }
};


export const Logout = async () => {
    Cookies.remove('token');
}


// Function to get user data
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


export const GetAdminUser = async () => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.get(getAdminUserUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data; // Return the user data
    } catch (error) {
        console.error('Error in GetAdminUser:', error.response ? error.response.data : error.message);
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


export const GetDoctors = async ({ data = {} }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(getDoctorUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data; // Return the user data
    } catch (error) {
        console.error('Error in GetDoctor:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const CreateDoctor = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(createDoctorUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in CreateDoctor:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const UpdateDoctor = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(updateDoctorUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in UpdateDoctor:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const GetClinic = async ({ id }) => {
    try {
        const response = await axios.post(getClinicByIdUrl, { _id: id });
        return response.data; // Return the user data
    } catch (error) {
        console.error('Error in GetClinic:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const GetClinics = async () => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.get(getClinicUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data; // Return the user data
    } catch (error) {
        console.error('Error in GetClinics:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const CreateClinic = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(createClinicUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in CreateClinic:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}


export const UpdateClinic = async ({ data }) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.put(updateClinicUrl, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error in UpdateClinic:', error.response ? error.response.data : error.message);
        if (error.response)
            return error.response.data;
    }
}