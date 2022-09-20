import styles from "./Landing.module.scss";
import logo from '../../assets/tmp/GJ_MASTERBRAND_LOGO_WHITE_large.png';
import { Button, Checkbox, Form, Input, Space, Spin } from 'antd';
import { useRecoilState } from 'recoil';
import { SignUpForm } from '../../Atoms/SignUpForm';
import { ISignup } from '../../Models/ISignup';
import Complete from '../Complete/Complete';
import axios from 'axios';
import { IComplete } from '../../Models/IComplete';
import { QrcodeAtom } from '../../Atoms/QrcodeAtom';
import { ShowForm } from '../../Atoms/ShowForm';


export default function InStore() {
    const [signUpForm, setSignUpForm] = useRecoilState(SignUpForm)
    const [showForm, setShowForm] = useRecoilState(ShowForm)
    const [qrcode, setQrcode] = useRecoilState(QrcodeAtom)
    const [form] = Form.useForm();
    
    return (
        <body className={styles.center}>

                    <img src={logo} alt="My Happy SVG " width="250px" />
                    <p style={{fontSize: "36px"}}>Georg Jensen Collectors</p>

            <div className={styles.body}>
                <p>
                    Bliv en del af Georg Jensen Collectors og få 10% på din første ordre.
                </p>
                <p>
                    Scan QR-Koden her og bliv medlem.
                </p>
            </div>
            <div>
                
            </div> 
        </body>
    )
};
