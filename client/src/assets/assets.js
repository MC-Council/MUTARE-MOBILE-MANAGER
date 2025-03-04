import logo from "./logo.png";
import search_icon from "./search_icon.svg";
import company_icon from "./company_icon.svg";
import microsoft_logo from "./microsoft_logo.svg";
import samsung_logo from "./Samsung-Logo.svg";
import huawei_logo from "./Huawei-Logo.svg";
import profile_img from "./profile_img.png";
import app_main_img from "./app_main_img.png";
import cross_icon from './cross_icon.svg';
import location_icon from './location_icon.svg';
import money_icon from './money_icon.svg';
import suitcase_icon from './suitcase_icon.svg';
import person_icon from './person_icon.svg';
import upload_area from './upload_area.svg';
import resume_selected from './resume_selected.svg';
import resume_not_selected from './resume_not_selected.svg';
import play_store from './play_store.svg';
import app_store from './app_store.svg';
import back_arrow_icon from './back_arrow_icon.svg';
import left_arrow_icon from './left_arrow_icon.svg';
import right_arrow_icon from './right_arrow_icon.svg';
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import profile_upload_icon from './profile_upload_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import resume_download_icon from './resume_download_icon.svg'
import delete_icon from './delete_icon.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import vivo_logo from './Vivo_Logo.svg'
import oneplus_logo from './OnePlus-Logo.svg'
import apple_logo from './Apple_Logo.svg'
import dell_logo from './Dell_Technologies-Logo.svg'
import asus_logo from './Asus-Logo.svg'
import lenovo_logo from './Lenovo_Logo.svg'
import sony_logo from './Sony-Logo.svg'
import lg_logo from './LG_Electronics-Logo.svg'
import toshiba_logo from './Toshiba-Logo.svg'

export const assets = {
    logo,
    search_icon,
    cross_icon,
    upload_area,
    company_icon,
    resume_not_selected,
    resume_selected,
    microsoft_logo,
    samsung_logo,
    huawei_logo,
    app_main_img,
    play_store,
    app_store,
    back_arrow_icon,
    left_arrow_icon,
    right_arrow_icon,
    location_icon,
    money_icon,
    suitcase_icon,
    person_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    home_icon,
    add_icon,
    person_tick_icon,
    resume_download_icon,
    profile_img,
    delete_icon,
    profile_upload_icon,
    email_icon,
    lock_icon,
    vivo_logo,
    oneplus_logo,
    apple_logo,
    dell_logo,
    asus_logo,
    lenovo_logo,
    sony_logo,
    lg_logo,
    toshiba_logo

}

export const JobDepartments = [
    " Office of the Town Clerk",
    " Chamber Secretary",
    " Finance Department",
    " Eng. & Technical Services",
    " Health Department",
    " Housing & Community Services"
]

export const JobLocations = [
    " Civic Center",
    " Sakubva",
    " Dangamvura",
    " Chikanga",
    " Fern Valley",
    " QueensHall ",
    " HobHouse"
]
export const DeviceStorages = [
    " 16GB",
    " 32GB",
    " 64GB",
    " 128GB",
    " 240GB",
    " 320GB ",
    " 512 GB",
    " 1TB",
    " 2TB"

]
export const DeviceMemorys = [
    " 4GB",
    " 8GB",
    " 12GB",
    " 16GB",
    " 32GB",
    " 64GB ",
    " 128GB "
]

export const DeviceTypes =[
    "Cellphone",
    "Laptop",
    "Desktop",
    "Tablet",
    "Printer",
    "Projector",
    "Scanner",
    "Router",
    "Switch",
     "UPS",
    "Storage",
    "Other"
]

// Sample data for Manage Jobs Page
export const manageDevicesData = [
    {  _id: 1, name: "Prince Mlambo", mm_no: '1235', title: 'iPhone 14 Pro Max',   type: 'Cellphone', SN: "670e4d25ca9fda8f1bf359b9", jobDepartment: "Chamber Secretary", location: "Civic Center", imgSrc: profile_img, returnApplicants:2 },
    { _id: 2, name: "Misheck Mlambo", mm_no: '1234', title: 'SAMSUNG NOTE 20', type: 'Cellphone', SN: "670e4d25ca9fda8f1bf3g6h7y", jobDepartment: "Office of the Town Clerk", location: "Sakubva", imgSrc: profile_img, returnApplicants:3 },
];

// Sample data for Profile Page
export const devicesReturned = [
    {
        name: 'Prince Mlambo',
        title: 'iPhone 14 Pro Max',
        type: 'Cellphone',
        mm_no: "1235",
        location: 'Civic Center',
        department: " Chamber Secretary",
        date: '02/02/2025',
        status: 'Pending',
        logo: company_icon,

        deviceId: {
            "SN": "670e4d25ca9fda8f1bf359b9",
            "model": "A2643",}
    },
    {
        name: 'Misheck Mlambo',
        title: 'SAMSUNG NOTE 20',
        type: 'Cellphone',
        location: 'Sakubva',
        department: " Office of the Town Clerk",
        mm_no: "1234",
        date: '02/02/2025',
        status: 'Returned',
        logo: company_icon,

        deviceId: {
            "SN": "670e4d25ca9fda8f1bf3g6h7y",
            "model": "SM-N980F/DS",}
    },
];

export const viewReturnsData = [
    { _id: 1, name: "Prince Mlambo", mm_no: '1235', title: 'iPhone 14 Pro Max',   type: 'Cellphone', SN: "670e4d25ca9fda8f1bf359b9", jobDepartment: "Chamber Secretary", location: "Civic Center", status: 'Pending', imgSrc: profile_img },
    { _id: 2, name: "Misheck Mlambo", mm_no: '1234', title: 'SAMSUNG NOTE 20', type: 'Cellphone', SN: "670e4d25ca9fda8f1bf3g6h7y", jobDepartment: "Office of the Town Clerk", location: "Sakubva", status: 'Returned',imgSrc: profile_img },

];

export const devicesData = [
    {
        _id: '1',
        name: "Misheck Mlambo",
        type: "Cellphone",
        location: " Sakubva",
        mm_no: "1234",
        title: "SAMSUNG NOTE 20",
        department: " Office of the Town Clerk",
    
        deviceId: {
            "SN": "670e4d25ca9fda8f1bf3g6h7y",
            "model": "SM-N980F/DS",
            "ram": "8GB",
            "storage": "256GB",
            "image": company_icon,
        },
        description: `
        <p>the laptop experiences significant hardware issues.</p>
        <h2><strong>Failing to start</strong></h2>`,
        condition: 'new',
        date: '23/01/25',
        company: "Samsung",
    },
    {
        _id: '2',
        name: "Prince Mlambo",
        type: "Cellphone",
        location: " Civic Center",
        mm_no: "1235",
        department: " Chamber Secretary",
        title: "iPhone 14 Pro Max ",

        deviceId: {
            "SN": "670e4d25ca9fda8f1bf359b9",
            "model": "A2643",
            "ram": "8GB",
            "storage": "256GB",
            "image": company_icon,
        },

        description: `
        <p>Received: iPhone 14 Pro Max with charger and case.</p>
        <h2><strong>"w/acc." is a common abbreviation for "with accessories,"</strong></h2>`,
        condition: 'new',
        date: '23/01/25',
        company: "Apple",
    },

    {
        _id: '3',
        name: "Prince Mlambo",
        type: "Laptop",
        location: " Civic Center",
        mm_no: "1235",
        department: " Chamber Secretary",
        title: "Dell Latitude",

        deviceId: {
            "SN": "6898cdg28738hsm92893j83839",
            "model": "Latitude 9510",
            "ram": "8GB",
            "storage": "256GB",
            "image": company_icon,
        },

        description: `
        <p>Received: Dell Latitude 9510 with charger and case.</p>
        <h2><strong>"A coi7 Dell Laptop 8th gen"</strong></h2>`,
        condition: 'new',
        date: '23/01/25',
        company: "Apple",
    },
];
