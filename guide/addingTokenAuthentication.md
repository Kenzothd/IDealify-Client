const token: any = sessionStorage.getItem("token");

const config = {
headers: {
Authorization: `Bearer ${token}`,
},
};
