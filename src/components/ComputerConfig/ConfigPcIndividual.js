import React, { useEffect } from "react";
import ClipboardJS from 'clipboard';
import { useForm } from 'react-hook-form';

import ConfigCards from './configCards';
import './ConfigPc.css';
import MobileHeader from "../mobileHeader";

// helper to check if software is team software
const isTeamSoftware = ({type_display, is_3rd_party}) => String(type_display).toUpperCase() === 'DESKTOP MULTI USER' && is_3rd_party === false;

// logos array
const logos = {
    windows11: `<svg width="53" height="54" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 0.75H25.5781V25.9453H0.5V0.75ZM27.8047 0.75H53V25.9453H27.8047V0.75ZM0.5 28.1719H25.5781V53.25H0.5V28.1719ZM27.8047 28.1719H53V53.25H27.8047V28.1719Z" fill="#343A40"/>
                </svg>`,
    windows11Selected: `<svg width="53" height="54" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 0.75H25.5781V25.9453H0.5V0.75ZM27.8047 0.75H53V25.9453H27.8047V0.75ZM0.5 28.1719H25.5781V53.25H0.5V28.1719ZM27.8047 28.1719H53V53.25H27.8047V28.1719Z" fill="url(#paint0_linear_2801_2279)"/>
                            <defs>
                            <linearGradient id="paint0_linear_2801_2279" x1="53.5055" y1="-9.51661" x2="-18.6642" y2="19.7071" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#116FE6"/>
                                <stop offset="1" stop-color="#003373"/>
                            </linearGradient>
                            </defs>
                        </svg>`,
    windows10: `<svg width="53" height="54" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 8.01562V25.8281H21.9453V5.08594L0.5 8.01562ZM0.5 46.1016V28.5234H21.9453V49.0312L0.5 46.1016ZM24.2891 49.3828V28.5234H53V53.25L24.2891 49.3828ZM24.2891 4.73438L53 0.75V25.8281H24.2891V4.73438Z" fill="#343A40"/>
                </svg>`,
    windows10Selected: `<svg width="53" height="54" viewBox="0 0 53 54" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#116FE6" />
                                <stop offset="100%" stop-color="#003373" />
                            </linearGradient>
                            </defs>
                            <path d="M0.5 8.01562V25.8281H21.9453V5.08594L0.5 8.01562ZM0.5 46.1016V28.5234H21.9453V49.0312L0.5 46.1016ZM24.2891 49.3828V28.5234H53V53.25L24.2891 49.3828ZM24.2891 4.73438L53 0.75V25.8281H24.2891V4.73438Z" fill="url(#gradient)" />
                        </svg>`,
    backup: `<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M64.2143 9.57891V21.6955C62.4989 22.9584 59.7306 24.1498 56.0632 25.0672C51.9699 26.0799 46.942 26.6875 41.5 26.6875C36.058 26.6875 31.0301 26.0799 26.9368 25.0672C23.2694 24.1617 20.5011 22.9584 18.7857 21.6955V9.57891C18.8212 9.48359 18.975 9.19766 19.5192 8.73301C20.3828 7.99434 21.8734 7.16035 24.0266 6.38594C28.321 4.83711 34.4964 3.8125 41.5 3.8125C48.5036 3.8125 54.679 4.83711 58.9616 6.38594C61.1266 7.16035 62.6054 7.99434 63.469 8.73301C64.025 9.20957 64.1788 9.49551 64.2025 9.57891H64.2143ZM64.2143 26.1514V36.9455C62.4989 38.2084 59.7306 39.3998 56.0632 40.3172C51.9699 41.3299 46.942 41.9375 41.5 41.9375C36.058 41.9375 31.0301 41.3299 26.9368 40.3172C23.2694 39.4117 20.5011 38.2084 18.7857 36.9455V26.1514C20.8205 27.2117 23.2931 28.0934 26.0259 28.7605C30.4623 29.8686 35.7978 30.5 41.5 30.5C47.2022 30.5 52.5377 29.8686 56.9741 28.7725C59.7069 28.0934 62.1795 27.2236 64.2143 26.1633V26.1514ZM18.7857 51.4211V41.4133C20.8205 42.4736 23.2931 43.3553 26.0259 44.0225C30.4623 45.1186 35.7978 45.75 41.5 45.75C47.2022 45.75 52.5377 45.1186 56.9741 44.0225C59.7069 43.3434 62.1795 42.4736 64.2143 41.4133V51.4211C64.1788 51.5164 64.025 51.8023 63.4808 52.267C62.6172 53.0057 61.1266 53.8396 58.9734 54.6141C54.679 56.1629 48.5036 57.1875 41.5 57.1875C34.4964 57.1875 28.321 56.1629 24.0384 54.6141C21.8734 53.8396 20.3946 53.0057 19.531 52.267C18.975 51.7904 18.8212 51.5045 18.7975 51.4211H18.7857ZM64.2261 51.3853C64.2261 51.3822 64.2249 51.3792 64.2227 51.3769C64.2204 51.3747 64.2174 51.3734 64.2143 51.3734C64.2112 51.3734 64.2081 51.3747 64.2059 51.3769C64.2037 51.3792 64.2025 51.3822 64.2025 51.3853C64.2025 51.3885 64.2037 51.3915 64.2059 51.3938C64.2081 51.396 64.2112 51.3973 64.2143 51.3973C64.2174 51.3973 64.2204 51.396 64.2227 51.3938C64.2249 51.3915 64.2261 51.3885 64.2261 51.3853ZM18.7739 51.3853C18.7716 51.3867 18.7699 51.3887 18.7689 51.3911C18.7679 51.3935 18.7677 51.3962 18.7684 51.3988C18.769 51.4013 18.7705 51.4035 18.7726 51.4051C18.7747 51.4067 18.7772 51.4076 18.7798 51.4076C18.7824 51.4076 18.7849 51.4067 18.787 51.4051C18.7891 51.4035 18.7906 51.4013 18.7912 51.3988C18.7919 51.3962 18.7917 51.3935 18.7907 51.3911C18.7897 51.3887 18.788 51.3867 18.7857 51.3853C18.788 51.384 18.7897 51.382 18.7907 51.3796C18.7917 51.3772 18.7919 51.3745 18.7912 51.372C18.7906 51.3694 18.7891 51.3672 18.787 51.3656C18.7849 51.364 18.7824 51.3631 18.7798 51.3631C18.7772 51.3631 18.7747 51.364 18.7726 51.3656C18.7705 51.3672 18.769 51.3694 18.7684 51.372C18.7677 51.3745 18.7679 51.3772 18.7689 51.3796C18.7699 51.382 18.7716 51.384 18.7739 51.3853ZM18.7739 9.61465C18.7739 9.617 18.7746 9.61931 18.7759 9.62127C18.7772 9.62323 18.779 9.62475 18.7812 9.62566C18.7833 9.62656 18.7857 9.62679 18.788 9.62633C18.7903 9.62587 18.7924 9.62474 18.7941 9.62307C18.7957 9.62141 18.7969 9.61928 18.7973 9.61697C18.7978 9.61466 18.7975 9.61227 18.7966 9.61009C18.7957 9.60791 18.7942 9.60605 18.7923 9.60474C18.7903 9.60343 18.7881 9.60273 18.7857 9.60273C18.7857 9.60038 18.785 9.59807 18.7837 9.59612C18.7824 9.59416 18.7806 9.59263 18.7784 9.59173C18.7762 9.59083 18.7739 9.59059 18.7716 9.59105C18.7693 9.59151 18.7672 9.59264 18.7655 9.59431C18.7639 9.59598 18.7627 9.5981 18.7623 9.60041C18.7618 9.60272 18.7621 9.60512 18.763 9.60729C18.7638 9.60947 18.7654 9.61133 18.7673 9.61264C18.7693 9.61395 18.7715 9.61465 18.7739 9.61465ZM64.2143 9.60273C64.212 9.60195 64.2095 9.60164 64.207 9.60182C64.2046 9.60199 64.2022 9.60265 64.2 9.60376C64.1978 9.60486 64.1959 9.60639 64.1942 9.60826C64.1926 9.61013 64.1914 9.6123 64.1906 9.61465C64.1898 9.61699 64.1895 9.61947 64.1897 9.62194C64.1899 9.62441 64.1905 9.62682 64.1916 9.62903C64.1927 9.63124 64.1943 9.63322 64.1961 9.63484C64.198 9.63646 64.2001 9.63769 64.2025 9.63848C64.2072 9.64006 64.2123 9.63969 64.2167 9.63745C64.2212 9.63522 64.2245 9.6313 64.2261 9.62656C64.2277 9.62182 64.2273 9.61665 64.2251 9.61218C64.2229 9.60771 64.219 9.60431 64.2143 9.60273ZM68 51.4688V9.53125C68 4.26523 56.1342 0 41.5 0C26.8658 0 15 4.26523 15 9.53125V51.4688C15 56.7348 26.8658 61 41.5 61C56.1342 61 68 56.7348 68 51.4688Z" fill="#343A40"/>
                <path d="M34 51C34 60.3888 26.3888 68 17 68C7.61116 68 0 60.3888 0 51C0 41.6112 7.61116 34 17 34C26.3888 34 34 41.6112 34 51Z" fill="#343A40"/>
                <path d="M31 51C31 58.732 24.732 65 17 65C9.26801 65 3 58.732 3 51C3 43.268 9.26801 37 17 37C24.732 37 31 43.268 31 51Z" fill="white"/>
                <path d="M12.2852 47.001H14.25C14.9414 47.001 15.5 47.5596 15.5 48.251C15.5 48.9424 14.9414 49.501 14.25 49.501H9.25C8.55859 49.501 8 48.9424 8 48.251V43.251C8 42.5596 8.55859 42.001 9.25 42.001C9.94141 42.001 10.5 42.5596 10.5 43.251V45.251L11.1875 44.5635C14.6055 41.1455 20.1445 41.1455 23.5625 44.5635C26.9805 47.9814 26.9805 53.5205 23.5625 56.9385C20.1445 60.3564 14.6055 60.3564 11.1875 56.9385C10.6992 56.4502 10.6992 55.6572 11.1875 55.1689C11.6758 54.6807 12.4688 54.6807 12.957 55.1689C15.3984 57.6104 19.3555 57.6104 21.7969 55.1689C24.2383 52.7275 24.2383 48.7705 21.7969 46.3291C19.3555 43.8877 15.3984 43.8877 12.957 46.3291L12.2852 47.001Z" fill="#343A40"/>
            </svg>`,
    backupSelected: `<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.2143 9.57891V21.6955C62.4989 22.9584 59.7306 24.1498 56.0632 25.0672C51.9699 26.0799 46.942 26.6875 41.5 26.6875C36.058 26.6875 31.0301 26.0799 26.9368 25.0672C23.2694 24.1617 20.5011 22.9584 18.7857 21.6955V9.57891C18.8212 9.48359 18.975 9.19766 19.5192 8.73301C20.3828 7.99434 21.8734 7.16035 24.0266 6.38594C28.321 4.83711 34.4964 3.8125 41.5 3.8125C48.5036 3.8125 54.679 4.83711 58.9616 6.38594C61.1266 7.16035 62.6054 7.99434 63.469 8.73301C64.025 9.20957 64.1788 9.49551 64.2025 9.57891H64.2143ZM64.2143 26.1514V36.9455C62.4989 38.2084 59.7306 39.3998 56.0632 40.3172C51.9699 41.3299 46.942 41.9375 41.5 41.9375C36.058 41.9375 31.0301 41.3299 26.9368 40.3172C23.2694 39.4117 20.5011 38.2084 18.7857 36.9455V26.1514C20.8205 27.2117 23.2931 28.0934 26.0259 28.7605C30.4623 29.8686 35.7978 30.5 41.5 30.5C47.2022 30.5 52.5377 29.8686 56.9741 28.7725C59.7069 28.0934 62.1795 27.2236 64.2143 26.1633V26.1514ZM18.7857 51.4211V41.4133C20.8205 42.4736 23.2931 43.3553 26.0259 44.0225C30.4623 45.1186 35.7978 45.75 41.5 45.75C47.2022 45.75 52.5377 45.1186 56.9741 44.0225C59.7069 43.3434 62.1795 42.4736 64.2143 41.4133V51.4211C64.1788 51.5164 64.025 51.8023 63.4808 52.267C62.6172 53.0057 61.1266 53.8396 58.9734 54.6141C54.679 56.1629 48.5036 57.1875 41.5 57.1875C34.4964 57.1875 28.321 56.1629 24.0384 54.6141C21.8734 53.8396 20.3946 53.0057 19.531 52.267C18.975 51.7904 18.8212 51.5045 18.7975 51.4211H18.7857ZM64.2261 51.3853C64.2261 51.3822 64.2249 51.3792 64.2227 51.3769C64.2204 51.3747 64.2174 51.3734 64.2143 51.3734C64.2112 51.3734 64.2081 51.3747 64.2059 51.3769C64.2037 51.3792 64.2025 51.3822 64.2025 51.3853C64.2025 51.3885 64.2037 51.3915 64.2059 51.3938C64.2081 51.396 64.2112 51.3973 64.2143 51.3973C64.2174 51.3973 64.2204 51.396 64.2227 51.3938C64.2249 51.3915 64.2261 51.3885 64.2261 51.3853ZM18.7739 51.3853C18.7716 51.3867 18.7699 51.3887 18.7689 51.3911C18.7679 51.3935 18.7677 51.3962 18.7684 51.3988C18.769 51.4013 18.7705 51.4035 18.7726 51.4051C18.7747 51.4067 18.7772 51.4076 18.7798 51.4076C18.7824 51.4076 18.7849 51.4067 18.787 51.4051C18.7891 51.4035 18.7906 51.4013 18.7912 51.3988C18.7919 51.3962 18.7917 51.3935 18.7907 51.3911C18.7897 51.3887 18.788 51.3867 18.7857 51.3853C18.788 51.384 18.7897 51.382 18.7907 51.3796C18.7917 51.3772 18.7919 51.3745 18.7912 51.372C18.7906 51.3694 18.7891 51.3672 18.787 51.3656C18.7849 51.364 18.7824 51.3631 18.7798 51.3631C18.7772 51.3631 18.7747 51.364 18.7726 51.3656C18.7705 51.3672 18.769 51.3694 18.7684 51.372C18.7677 51.3745 18.7679 51.3772 18.7689 51.3796C18.7699 51.382 18.7716 51.384 18.7739 51.3853ZM18.7739 9.61465C18.7739 9.617 18.7746 9.61931 18.7759 9.62127C18.7772 9.62323 18.779 9.62475 18.7812 9.62566C18.7833 9.62656 18.7857 9.62679 18.788 9.62633C18.7903 9.62587 18.7924 9.62474 18.7941 9.62307C18.7957 9.62141 18.7969 9.61928 18.7973 9.61697C18.7978 9.61466 18.7975 9.61227 18.7966 9.61009C18.7957 9.60791 18.7942 9.60605 18.7923 9.60474C18.7903 9.60343 18.7881 9.60273 18.7857 9.60273C18.7857 9.60038 18.785 9.59807 18.7837 9.59612C18.7824 9.59416 18.7806 9.59263 18.7784 9.59173C18.7762 9.59083 18.7739 9.59059 18.7716 9.59105C18.7693 9.59151 18.7672 9.59264 18.7655 9.59431C18.7639 9.59598 18.7627 9.5981 18.7623 9.60041C18.7618 9.60272 18.7621 9.60512 18.763 9.60729C18.7638 9.60947 18.7654 9.61133 18.7673 9.61264C18.7693 9.61395 18.7715 9.61465 18.7739 9.61465ZM64.2143 9.60273C64.212 9.60195 64.2095 9.60164 64.207 9.60182C64.2046 9.60199 64.2022 9.60265 64.2 9.60376C64.1978 9.60486 64.1959 9.60639 64.1942 9.60826C64.1926 9.61013 64.1914 9.6123 64.1906 9.61465C64.1898 9.61699 64.1895 9.61947 64.1897 9.62194C64.1899 9.62441 64.1905 9.62682 64.1916 9.62903C64.1927 9.63124 64.1943 9.63322 64.1961 9.63484C64.198 9.63646 64.2001 9.63769 64.2025 9.63848C64.2072 9.64006 64.2123 9.63969 64.2167 9.63745C64.2212 9.63522 64.2245 9.6313 64.2261 9.62656C64.2277 9.62182 64.2273 9.61665 64.2251 9.61218C64.2229 9.60771 64.219 9.60431 64.2143 9.60273ZM68 51.4688V9.53125C68 4.26523 56.1342 0 41.5 0C26.8658 0 15 4.26523 15 9.53125V51.4688C15 56.7348 26.8658 61 41.5 61C56.1342 61 68 56.7348 68 51.4688Z" fill="url(#paint0_linear_2813_4552)"/>
                        <path d="M34 51C34 60.3888 26.3888 68 17 68C7.61116 68 0 60.3888 0 51C0 41.6112 7.61116 34 17 34C26.3888 34 34 41.6112 34 51Z" fill="url(#paint1_linear_2813_4552)"/>
                        <path d="M31 51C31 58.732 24.732 65 17 65C9.26801 65 3 58.732 3 51C3 43.268 9.26801 37 17 37C24.732 37 31 43.268 31 51Z" fill="white"/>
                        <path d="M12.2852 47.001H14.25C14.9414 47.001 15.5 47.5596 15.5 48.251C15.5 48.9424 14.9414 49.501 14.25 49.501H9.25C8.55859 49.501 8 48.9424 8 48.251V43.251C8 42.5596 8.55859 42.001 9.25 42.001C9.94141 42.001 10.5 42.5596 10.5 43.251V45.251L11.1875 44.5635C14.6055 41.1455 20.1445 41.1455 23.5625 44.5635C26.9805 47.9814 26.9805 53.5205 23.5625 56.9385C20.1445 60.3564 14.6055 60.3564 11.1875 56.9385C10.6992 56.4502 10.6992 55.6572 11.1875 55.1689C11.6758 54.6807 12.4688 54.6807 12.957 55.1689C15.3984 57.6104 19.3555 57.6104 21.7969 55.1689C24.2383 52.7275 24.2383 48.7705 21.7969 46.3291C19.3555 43.8877 15.3984 43.8877 12.957 46.3291L12.2852 47.001Z" fill="url(#paint2_linear_2813_4552)"/>
                        <defs>
                        <linearGradient id="paint0_linear_2813_4552" x1="68.0055" y1="-0.0140685" x2="-0.376776" y2="32.6693" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#116FE6"/>
                        <stop offset="1" stop-color="#003373"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_2813_4552" x1="34.0035" y1="33.9922" x2="-7.36663" y2="56.7496" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#116FE6"/>
                        <stop offset="1" stop-color="#003373"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_2813_4552" x1="34.0035" y1="33.9922" x2="-7.36663" y2="56.7496" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#116FE6"/>
                        <stop offset="1" stop-color="#003373"/>
                        </linearGradient>
                        </defs>
                    </svg>`
};

// helper function to map software data
const mapSoftwareData = (software) => {
    const isWindows11 = software.name_display.includes('Windows 11');
    return {
        ...software,
        logo: isWindows11 ? logos.windows11 : logos.windows10,
        logoSelected: isWindows11 ? logos.windows11Selected : logos.windows10Selected,
        mainTitle: software.name_display.trim().slice(0, 10),
        subTitle: software.type_display.replace('Desktop', '').trim().toLowerCase(),
        content: software.name_display.trim().match("\\((.*)\\)")[1] // Get text between parenthesis
    }
}

// helper function to generate random password
const generateRandomPassword = () => {
    const length = 12;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"$';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}

const ConfigPcIndividual = ({ formData, setFormData, stepData: { nextStep }, appData }) => {

    const networkcards = [
        {
            id: 1,
            logo: `<svg width="76" height="54" viewBox="0 0 76 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.5 4.5H8C5.89062 4.5 4.25 6.25781 4.25 8.25V34.5C4.25 36.6094 5.89062 38.25 8 38.25H20.6562H22.0625H31.4375H32.7266H45.5C47.4922 38.25 49.25 36.6094 49.25 34.5V8.25C49.25 6.25781 47.4922 4.5 45.5 4.5ZM8 42C3.78125 42 0.5 38.7188 0.5 34.5V8.25C0.5 4.14844 3.78125 0.75 8 0.75H45.5C49.6016 0.75 53 4.14844 53 8.25V34.5C53 38.7188 49.6016 42 45.5 42H34.0156L36.4766 49.5H43.625C44.5625 49.5 45.5 50.4375 45.5 51.375C45.5 52.4297 44.5625 53.25 43.625 53.25H37.7656H35.1875H18.3125H15.6172H9.875C8.82031 53.25 8 52.4297 8 51.375C8 50.4375 8.82031 49.5 9.875 49.5H16.9062L19.3672 42H8ZM20.8906 49.5H32.4922L30.0312 42H23.3516L20.8906 49.5ZM62.375 4.5C61.3203 4.5 60.5 5.4375 60.5 6.375V12H71.75V6.375C71.75 5.4375 70.8125 4.5 69.875 4.5H62.375ZM60.5 15.75V19.5H71.75V15.75H60.5ZM60.5 47.625C60.5 48.6797 61.3203 49.5 62.375 49.5H69.875C70.8125 49.5 71.75 48.6797 71.75 47.625V23.25H60.5V47.625ZM56.75 6.375C56.75 3.32812 59.2109 0.75 62.375 0.75H69.875C72.9219 0.75 75.5 3.32812 75.5 6.375V47.625C75.5 50.7891 72.9219 53.25 69.875 53.25H62.375C59.2109 53.25 56.75 50.7891 56.75 47.625V6.375ZM66.125 39.1875C64.4844 39.1875 63.3125 38.0156 63.3125 36.375C63.3125 34.8516 64.4844 33.5625 66.125 33.5625C67.6484 33.5625 68.9375 34.8516 68.9375 36.375C68.9375 38.0156 67.6484 39.1875 66.125 39.1875Z" fill="#343A40"/>
            </svg>`,
            logoSelected: `<svg width="76" height="54" viewBox="0 0 76 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.5 4.5H8C5.89062 4.5 4.25 6.25781 4.25 8.25V34.5C4.25 36.6094 5.89062 38.25 8 38.25H20.6562H22.0625H31.4375H32.7266H45.5C47.4922 38.25 49.25 36.6094 49.25 34.5V8.25C49.25 6.25781 47.4922 4.5 45.5 4.5ZM8 42C3.78125 42 0.5 38.7188 0.5 34.5V8.25C0.5 4.14844 3.78125 0.75 8 0.75H45.5C49.6016 0.75 53 4.14844 53 8.25V34.5C53 38.7188 49.6016 42 45.5 42H34.0156L36.4766 49.5H43.625C44.5625 49.5 45.5 50.4375 45.5 51.375C45.5 52.4297 44.5625 53.25 43.625 53.25H37.7656H35.1875H18.3125H15.6172H9.875C8.82031 53.25 8 52.4297 8 51.375C8 50.4375 8.82031 49.5 9.875 49.5H16.9062L19.3672 42H8ZM20.8906 49.5H32.4922L30.0312 42H23.3516L20.8906 49.5ZM62.375 4.5C61.3203 4.5 60.5 5.4375 60.5 6.375V12H71.75V6.375C71.75 5.4375 70.8125 4.5 69.875 4.5H62.375ZM60.5 15.75V19.5H71.75V15.75H60.5ZM60.5 47.625C60.5 48.6797 61.3203 49.5 62.375 49.5H69.875C70.8125 49.5 71.75 48.6797 71.75 47.625V23.25H60.5V47.625ZM56.75 6.375C56.75 3.32812 59.2109 0.75 62.375 0.75H69.875C72.9219 0.75 75.5 3.32812 75.5 6.375V47.625C75.5 50.7891 72.9219 53.25 69.875 53.25H62.375C59.2109 53.25 56.75 50.7891 56.75 47.625V6.375ZM66.125 39.1875C64.4844 39.1875 63.3125 38.0156 63.3125 36.375C63.3125 34.8516 64.4844 33.5625 66.125 33.5625C67.6484 33.5625 68.9375 34.8516 68.9375 36.375C68.9375 38.0156 67.6484 39.1875 66.125 39.1875Z" fill="url(#paint0_linear_2813_1903)"/>
            <defs>
            <linearGradient id="paint0_linear_2813_1903" x1="75.5077" y1="-9.51661" x2="-13.9814" y2="41.762" gradientUnits="userSpaceOnUse">
            <stop stop-color="#116FE6"/>
            <stop offset="1" stop-color="#003373"/>
            </linearGradient>
            </defs>
            </svg>`,
            mainTitle: 'Private IP Address',
            subTitle: 'INCLUDED',
            content: 'Your instance will be on a private network',
            recommended: true,
        },
        {
            id: 2,
            logo: `<svg width="68" height="61" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.25 4.25C33.8672 4.25 27.0703 6.94531 21.9141 11.3984C21.0938 11.9844 19.9219 11.8672 19.2188 11.1641C18.5156 10.3438 18.6328 9.17188 19.4531 8.46875C25.3125 3.54688 32.9297 0.5 41.25 0.5C49.4531 0.5 57.0703 3.54688 62.9297 8.46875C63.75 9.17188 63.8672 10.3438 63.1641 11.1641C62.4609 11.8672 61.2891 11.9844 60.5859 11.3984C55.3125 6.94531 48.5156 4.25 41.25 4.25ZM43.125 28.625V38H60C64.1016 38 67.5 41.3984 67.5 45.5V53C67.5 57.2188 64.1016 60.5 60 60.5H7.5C3.28125 60.5 0 57.2188 0 53V45.5C0 41.3984 3.28125 38 7.5 38H39.375V28.625C39.375 27.6875 40.1953 26.75 41.25 26.75C42.1875 26.75 43.125 27.6875 43.125 28.625ZM7.5 41.75C5.39062 41.75 3.75 43.5078 3.75 45.5V53C3.75 55.1094 5.39062 56.75 7.5 56.75H60C61.9922 56.75 63.75 55.1094 63.75 53V45.5C63.75 43.5078 61.9922 41.75 60 41.75H7.5ZM12.1875 52.0625C10.5469 52.0625 9.375 50.8906 9.375 49.25C9.375 47.7266 10.5469 46.4375 12.1875 46.4375C13.7109 46.4375 15 47.7266 15 49.25C15 50.8906 13.7109 52.0625 12.1875 52.0625ZM24.375 49.25C24.375 50.8906 23.0859 52.0625 21.5625 52.0625C19.9219 52.0625 18.75 50.8906 18.75 49.25C18.75 47.7266 19.9219 46.4375 21.5625 46.4375C23.0859 46.4375 24.375 47.7266 24.375 49.25ZM29.2969 19.8359C28.4766 20.5391 27.3047 20.4219 26.6016 19.6016C26.0156 18.7812 26.1328 17.6094 26.8359 16.9062C30.8203 13.7422 35.7422 11.75 41.25 11.75C46.6406 11.75 51.6797 13.7422 55.5469 16.9062C56.3672 17.6094 56.3672 18.7812 55.7812 19.6016C55.0781 20.4219 53.9062 20.5391 53.0859 19.8359C49.9219 17.1406 45.7031 15.5 41.25 15.5C36.6797 15.5 32.4609 17.1406 29.2969 19.8359Z" fill="#343A40"/>
            </svg>
            `,
            logoSelected: `<svg width="68" height="61" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#116FE6" />
                <stop offset="102.23%" stop-color="#003373" />
              </linearGradient>
            </defs>
            <path d="M41.25 4.25C33.8672 4.25 27.0703 6.94531 21.9141 11.3984C21.0938 11.9844 19.9219 11.8672 19.2188 11.1641C18.5156 10.3438 18.6328 9.17188 19.4531 8.46875C25.3125 3.54688 32.9297 0.5 41.25 0.5C49.4531 0.5 57.0703 3.54688 62.9297 8.46875C63.75 9.17188 63.8672 10.3438 63.1641 11.1641C62.4609 11.8672 61.2891 11.9844 60.5859 11.3984C55.3125 6.94531 48.5156 4.25 41.25 4.25ZM43.125 28.625V38H60C64.1016 38 67.5 41.3984 67.5 45.5V53C67.5 57.2188 64.1016 60.5 60 60.5H7.5C3.28125 60.5 0 57.2188 0 53V45.5C0 41.3984 3.28125 38 7.5 38H39.375V28.625C39.375 27.6875 40.1953 26.75 41.25 26.75C42.1875 26.75 43.125 27.6875 43.125 28.625ZM7.5 41.75C5.39062 41.75 3.75 43.5078 3.75 45.5V53C3.75 55.1094 5.39062 56.75 7.5 56.75H60C61.9922 56.75 63.75 55.1094 63.75 53V45.5C63.75 43.5078 61.9922 41.75 60 41.75H7.5ZM12.1875 52.0625C10.5469 52.0625 9.375 50.8906 9.375 49.25C9.375 47.7266 10.5469 46.4375 12.1875 46.4375C13.7109 46.4375 15 47.7266 15 49.25C15 50.8906 13.7109 52.0625 12.1875 52.0625ZM24.375 49.25C24.375 50.8906 23.0859 52.0625 21.5625 52.0625C19.9219 52.0625 18.75 50.8906 18.75 49.25C18.75 47.7266 19.9219 46.4375 21.5625 46.4375C23.0859 46.4375 24.375 47.7266 24.375 49.25ZM29.2969 19.8359C28.4766 20.5391 27.3047 20.4219 26.6016 19.6016C26.0156 18.7812 26.1328 17.6094 26.8359 16.9062C30.8203 13.7422 35.7422 11.75 41.25 11.75C46.6406 11.75 51.6797 13.7422 55.5469 16.9062C56.3672 17.6094 56.3672 18.7812 55.7812 19.6016C55.0781 20.4219 53.9062 20.5391 53.0859 19.8359C49.9219 17.1406 45.7031 15.5 41.25 15.5C36.6797 15.5 32.4609 17.1406 29.2969 19.8359Z" fill="url(#gradient)" />
          </svg>          
            `,
            mainTitle: 'Public IP Address',
            subTitle: `$${appData.public_ip[`${formData.contracttype}_contract`]}/month`,
            content: 'Your instance wil be on a public IP address & will be exposed to the internet (Less secure)',
            recommended: false,
        }
    ];

    const backups = Object.entries(appData.backup_retention[`${formData.contracttype}_contract`]).map(([key, value]) => {
        const weeks = value.days / 7;
        return {
            days: value.days,
            mainTitle: weeks === 1 ? `${weeks} week` : `${weeks} weeks`,
            subTitle: weeks === 1 ? 'INCLUDED' : `$${value.price_per_gb}/month`,
            content: weeks === 2 ? '50GB included, $0.15 per additional GB' : ( weeks === 3 ? '50GB included, $0.25 per additional GB' : '' ),
            recommended: false,
            logo: logos.backup,
            logoSelected: logos.backupSelected,
        }
    });

    const configCardsTeam = appData.available_softwares
        .filter(isTeamSoftware)
        .map(mapSoftwareData);

    const configCards = appData.available_softwares
        .filter(software => !isTeamSoftware(software) && software.is_3rd_party === false)
        .map(mapSoftwareData);

    const isBusiness = formData.plan === 2;

    const requiredConfig = {
        required: "Please complete this required field."
    };

    const { register, handleSubmit, formState: { errors }, trigger, setValue, getValues } = useForm({
		mode: "onTouched"
	});

    useEffect(() => {
        const clipboard = new ClipboardJS(
            '.copy-button',
            {
                text: () => formData.password 
            }
        );
        return () => clipboard.destroy();
    }, []);

    const handleConfigurationStep = () => {
        trigger();
        if ( ! Object.keys(errors).length ) {
            setFormData({
                description: getValues("description"),
                password: getValues("password"),
            });
            nextStep();
        }
    }

    return (
        <>
            <MobileHeader stepNo="Step 4" stepName="Computer Configurations" logo="step4" />

            <div className="config-pc-container">

                <div className="main-title">
                    <h3> Your Windows Computer </h3>
                </div>

                <div className="name-password-container">
                    <form onSubmit={handleSubmit()} className="name-password-input-fields">
                        <div>
                            <div className="form-group">
                                <label htmlFor="computerName"> Computer name </label>
                                <input type="text" name="pc_name" placeholder="Eg: Tharaka's PC" className={`form-control ${errors.description ? 'input-error' : ''}`}
                                    {...register("description", requiredConfig)}
                                />
                                {errors.description && <div className="error-message">{errors.description.message}</div>}
                            </div>
                            <div className="form-group form-row-colfull col2">
                                <label className="label">Windows administrator password</label>
                                <div className="password-container">
                                    <input
                                        className={`form-control input ${errors.password ? 'input-error' : ''}`}
                                        type="text"
                                        name="pc_pass"
                                        placeholder=""
                                        {...register("password", requiredConfig)}
                                    />
                                    <button type="button" className="copy-button" data-clipboard-target=".input">
                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.6875 2.21875L14.7812 0.3125C14.5938 0.125 14.3438 0 14.0625 0H8.96875C7.84375 0 6.96875 0.90625 6.96875 2V10C7 11.125 7.875 12 9 12H15C16.0938 12 17 11.125 17 10V2.9375C17 2.65625 16.875 2.40625 16.6875 2.21875ZM15.5 10C15.5 10.2812 15.25 10.5 15 10.5H8.96875C8.6875 10.5 8.46875 10.2812 8.46875 10V2.03125C8.46875 1.75 8.6875 1.53125 8.96875 1.53125H12.9688L13 3C13 3.5625 13.4375 4 14 4H15.4688V10H15.5ZM9.5 14C9.5 14.2812 9.25 14.5 9 14.5H2.96875C2.6875 14.5 2.46875 14.2812 2.46875 14V6.03125C2.46875 5.75 2.71875 5.53125 2.96875 5.53125H6V4H2.96875C1.875 4 0.96875 4.90625 0.96875 6L1 14C1 15.125 1.875 16 3 16H9C10.0938 16 11 15.125 11 14V13H9.5V14Z" fill="#212529" />
                                        </svg>
                                        <span>Copy</span>
                                    </button>
                                    <button type="button" className="regenerate-pass" onClick={() => setValue('password',generateRandomPassword())}>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.0742 9.7207C14.6426 9.58789 14.2109 9.82031 14.0781 10.252C13.3809 12.7422 11.0566 14.4688 8.4668 14.4688C6.24219 14.4688 4.25 13.207 3.25391 11.2812H6.60742C7.03906 11.2812 7.4043 10.9492 7.4043 10.4844C7.4043 10.0527 7.07227 9.6875 6.60742 9.6875H1.29492C0.863281 9.6875 0.498047 10.0527 0.498047 10.4844V15.7969C0.498047 16.2617 0.863281 16.5938 1.29492 16.5938C1.75977 16.5938 2.0918 16.2617 2.0918 15.7969V12.4102C3.41992 14.6348 5.84375 16.0625 8.4668 16.0625C11.7539 16.0625 14.6758 13.8711 15.6055 10.7168C15.7383 10.2852 15.5059 9.85352 15.0742 9.7207ZM15.6719 0.65625C15.207 0.65625 14.875 1.02148 14.875 1.45312V4.87305C13.5469 2.64844 11.123 1.1875 8.5 1.1875C5.21289 1.1875 2.25781 3.41211 1.32812 6.56641C1.22852 6.96484 1.46094 7.42969 1.89258 7.5293C2.32422 7.66211 2.75586 7.42969 2.85547 6.99805C3.58594 4.54102 5.91016 2.78125 8.5 2.78125C10.6914 2.78125 12.6836 4.07617 13.6797 5.96875H10.3594C9.89453 5.96875 9.5625 6.33398 9.5625 6.76562C9.5625 7.23047 9.89453 7.5625 10.3594 7.5625H15.6719C16.1035 7.5625 16.4688 7.23047 16.4688 6.76562V1.45312C16.4688 1.02148 16.1035 0.65625 15.6719 0.65625Z" fill="#003875" />
                                        </svg>
                                        <span>Regenerate</span>
                                    </button>
                                    {errors.password && <div className="error-message">{errors.password.message}</div>}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="notice">
                        <div className="title"> Note </div>
                        <div className="content"> This will be the local administrator password of the virtual machine.
                            You may need this password later so please copy it and store it in a secure location.
                            It is strongly recommended to have a random password different from all the virtual machines.
                            We do NOT recommend putting the same password as your V2 Cloud account.
                        </div>
                    </div>
                </div>

                <div className="main-title">
                    <h2> Select Operating System <span className="sub-topic"> {`${isBusiness ? "For Individual Cloud Desktops" : "For Team Cloud Desktops"}`} </span></h2>
                </div>

                {isBusiness && <div className="line-with-text">
                    <span className="line"></span>
                    <span className="text">Bring Your Own License</span>
                    <span className="line"></span>
                </div>}

                {/* Individual */}
                {isBusiness && <div className="windows-cards-container">
                    {configCards.map((software, index) => (
                        <ConfigCards key={index} logo={software.logo} mainTitle={software.mainTitle}
                            subTitle={software.subTitle}
                            logoSelected={software.logoSelected}
                            isSelected={software.id === formData.software?.value}
                            onClick={() => setFormData({software: {display: `${software.mainTitle}  ${software.subTitle}`, value: software.id}})} />
                    ))}
                </div>}

                {!isBusiness && <div className={`windows-cards-container team`}>
                    {configCardsTeam.map((software, index) => (
                        <ConfigCards key={index} logo={software.logo} mainTitle={software.mainTitle}
                            subTitle={software.subTitle}
                            content={software.content} logoSelected={software.logoSelected}
                            isSelected={software.id === formData.software?.value}
                            onClick={() => setFormData({software: {display: `${software.mainTitle}  ${software.subTitle}`, value: software.id}})} />
                    ))}
                </div>}

                <div className="main-title">
                    <h2> Select Networking </h2>
                </div>

                <div className="networking-container">
                    {networkcards.map((network, index) => (
                        <ConfigCards key={index} logo={network.logo} mainTitle={network.mainTitle}
                            subTitle={network.subTitle}
                            content={network.content} logoSelected={network.logoSelected} recommended={network.recommended}
                            isSelected={formData.ip === (network.id === 2)}
                            onClick={() => setFormData({ip : network.id === 2})} />
                    ))}

                </div>

                <div className={`backups-antivirus-container ${isBusiness ? "enabled" : "disabled"}`}>

                    <div className="main-title">
                        <h2> Backup Retention </h2>
                    </div>

                    <div className="backups-container">
                        {backups.map((backup, index) => (
                            <ConfigCards key={index} logo={backup.logo} mainTitle={backup.mainTitle}
                                subTitle={backup.subTitle}
                                content={backup.content} logoSelected={backup.logoSelected}
                                isSelected={formData.backup?.value === backup.days}
                                onClick={() => {
                                    setFormData({
                                        backup: {
                                            display: `${(backup.days/7) === 1 ? '1 week' : (backup.days/7) + ' weeks' } backup`, 
                                            value: backup.days
                                        }
                                    })
                                }} />
                        ))}
                    </div>

                    <div className="main-title">
                        <h2> Antivirus </h2>
                    </div>

                    <div className={`antivirus-container ${!!formData.malware ? 'selected' : ''}`}>
                        <label className="checkbox-label">
                            <input type="checkbox"
                                className="checkbox-input"
                                checked={!!formData.malware}
                                onChange={(e) => setFormData({ malware: e.target.checked })}
                            />
                        </label>
                        <div className="info-box">
                            Install Antivirus (Malwarebytes)
                        </div>
                        <span className="anitivirus-logo"> <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5625 7.9375C4.1875 8.125 4 8.4375 4 8.75C4 14.5 6.375 24.3125 15.625 28.75C15.8125 28.875 16.125 28.875 16.3125 28.75C25.5625 24.375 27.9375 14.5 28 8.75C28 8.4375 27.75 8.125 27.4375 7.9375L16 3.125L4.5625 7.9375ZM28.5625 5.1875C29.9375 5.8125 31 7.125 31 8.75C30.9375 15 28.375 26.3125 17.625 31.5C16.5625 32 15.375 32 14.3125 31.5C3.5625 26.3125 1 15 1 8.75C0.9375 7.125 2 5.8125 3.375 5.1875L15.125 0.1875C15.375 0.0625 15.6875 0 16 0C16.25 0 16.5625 0.0625 16.8125 0.1875L28.5625 5.1875ZM23.0625 13.0625L15.0625 21.0625C14.4375 21.6875 13.5 21.6875 12.9375 21.0625L8.9375 17.0625C8.3125 16.5 8.3125 15.5625 8.9375 15C9.5 14.375 10.4375 14.375 11.0625 15L14 17.9375L20.9375 11C21.5 10.375 22.4375 10.375 23.0625 11C23.625 11.5625 23.625 12.5 23.0625 13.0625Z" fill="url(#paint0_linear_2820_8940)" />
                            <defs>
                                <linearGradient id="paint0_linear_2820_8940" x1="32.0033" y1="-0.00738019" x2="-6.93329" y2="21.4114" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#116FE6" />
                                    <stop offset="1" stopColor="#003373" />
                                </linearGradient>
                            </defs>
                        </svg>
                        </span>
                    </div>

                </div>

                {!isBusiness && <div className="enable-businessplan-infobox">
                    <div className="content-container">
                        <div className="main-text">
                            Select the Business Plan to enable backup & antivirus
                        </div>
                        <div className="sub-text">
                            Selecting the Business Plan will provide you with the option to enable backup, antivirus, and VPN
                        </div>
                    </div>
                    <button className="button">
                        <span>Go to plans</span>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.76562 0.982422L14.6094 6.56055C14.7754 6.72656 14.875 6.92578 14.875 7.1582C14.875 7.35742 14.7754 7.55664 14.6094 7.72266L8.76562 13.3008C8.4668 13.5996 7.93555 13.5996 7.63672 13.2676C7.33789 12.9688 7.33789 12.4375 7.66992 12.1387L12.0859 7.95508H0.796875C0.332031 7.95508 0 7.58984 0 7.1582C0 6.69336 0.332031 6.36133 0.796875 6.36133H12.0859L7.66992 2.14453C7.33789 1.8457 7.33789 1.31445 7.63672 1.01562C7.93555 0.683594 8.43359 0.683594 8.76562 0.982422Z" fill="white" />
                        </svg>
                    </button>
                </div>}

                <div className="action-btn">
                    <button className="back-btn">
                        Previous Step
                    </button>
                    <button
                        className="verify-btn"
                        onClick={handleConfigurationStep}>
                        Next
                    </button>
                </div>

            </div>
        </>
    )
}

export default ConfigPcIndividual;