import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService';
import { toastError } from '../api/ToastService';
import { toastInfo, toastSuccess } from '../api/ToastService';

const ContactDetail = ({ updateContact, updateImage }) => {
    const inputRef = useRef();
    const [contact, setContact] = useState({
        id:'',
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: '',
    });

    const { id } = useParams();


    const getContactById = async (id) => {

        try {
            const { data } = await getContact(id)
            setContact(data);
            toastSuccess("Contact retrieved successfully")
        } catch (error) {
            toastError(error.message);
        }
    }

    const selectImage = () => {
        inputRef.current.click();
    }

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setContact((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
            toastSuccess("Image updated ");
        } catch (error) { 
            toastError(error.message);
        }
    }

    const onChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    const onUpdateContact= async (event)=>{
        event.preventDefault();
        await updateContact(contact);
        getContactById(id)
        toastSuccess("Contact updated ");
    }

    useEffect(() => {
        getContactById(id);
    }, []);
    return (
        <>
            <Link to={'/'} className='link'><i className='bi bi-arrow-left'></i>Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
                    <div className='profile__metadata'>
                        <p className='profile__name'>{contact.name}</p>
                        <p className='profile__muted'>JPG, GIF, or PNG. Max size 10MG </p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form className='form' onSubmit={onUpdateContact}>
                            <div className='user-details'>
                                <input type='hidden' defaultValue={contact.id} name='id' required/>
                                <div className='input-box'>
                                    <span className='details'>Name</span>
                                    <input type='text' name='name' value={contact.name} onChange={onChange} required></input>
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Email</span>
                                    <input type='text' name='email' value={contact.email} onChange={onChange} required></input>
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Phone</span>
                                    <input type='text' name='phone' value={contact.phone} onChange={onChange} required></input>
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Address</span>
                                    <input type='text' name='address' value={contact.address} onChange={onChange} required></input>
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Title</span>
                                    <input type='text' name='title' value={contact.title} onChange={onChange} required></input>
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Status</span>
                                    <input type='text' name='status' value={contact.status} onChange={onChange} required></input>
                                </div>
                            </div>
                            <div className='form_footer'>
                                <button type='submit' className='btn'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default ContactDetail