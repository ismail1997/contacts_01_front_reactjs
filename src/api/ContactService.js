import axios from "axios";

const API_URL = 'http://localhost:8282/contacts';
//save contact
export async function saveContact(contact)
{
    return await axios.post(API_URL,contact);
}
//get all contacts
export async function getContacts(page = 0 , size=10)
{
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}
//get contact by id
export async function getContact(id)
{
    return await axios.get(`${API_URL}/${id}`);
}
//update contact 
export async function updateContact(contact)
{
    return await axios.post(API_URL,contact);
}
//update photo 
export async function updatePhoto(formData)
{
    return await axios.put(`${API_URL}/photo`,formData);
}
//delete contact
export async function deleteContact(id)
{
    return await axios.delete(`${API_URL}/${id}`);
}


