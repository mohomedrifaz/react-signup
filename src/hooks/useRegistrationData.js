import { useState } from "react";

export default function useRegistrationData( propery = '', value = '' ) {
    const [userRegistrationData, setUserRegistrationData] = useState({
        email: '',
        stripeToken: '',
        user_password: '',
        first_name: '',
        last_name: '',
        phone: '',
        company: '',
        region: '',
        software: '',
        hardware: '',
        plan: '',
        ip: '',
        description: '',
        password: '',
        ssd: 1,
        cycle: "month",
        contract_type: ''
    });

    if ( !! propery ) {
        return useRegistrationData[propery] ?? value;
    }

    return [ userRegistrationData, setUserRegistrationData ];
}