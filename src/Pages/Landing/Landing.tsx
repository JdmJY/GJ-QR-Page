import styles from "./Landing.module.scss";
import logo from '../../assets/tmp/GJ_MASTERBRAND_LOGO_WHITE_large.png';
import { Button, Form, Input, Space, Spin } from 'antd';
import { useRecoilState } from 'recoil';
import { SignUpForm } from '../../Atoms/SignUpForm';
import { ISignup } from '../../Models/ISignup';
import Complete from '../Complete/Complete';
import axios from 'axios';
import { IComplete } from '../../Models/IComplete';
import { QrcodeAtom } from '../../Atoms/QrcodeAtom';
import { ShowForm } from '../../Atoms/ShowForm';

export default function Landing() {
    const [signUpForm, setSignUpForm] = useRecoilState(SignUpForm)
    const [showForm, setShowForm] = useRecoilState(ShowForm)
    const [qrcode, setQrcode] = useRecoilState(QrcodeAtom)
     
    const postMemberToCrm = (params: ISignup) => {
        axios.get<IComplete>('http://localhost:7140/api/QrCreateMember', {
            params: {
              email: params.email,
              firstname: params.firstName,
              lastname: params.lastName,
            }})
        .then((res) => {
            res.data.IsLoading = false;
            setQrcode(res.data);
            setShowForm(false);
        })

    };

    function onSubmit(values: ISignup) {
        setSignUpForm(values);
        postMemberToCrm(values);
    }

    
    return (
        <div className={styles.center}>

                    <img src={logo} alt="My Happy SVG " width="250px" />
                    <p style={{fontSize: "36px"}}>Georg Jensen Collectors</p>

                {
                    showForm ? 

                        <Form
                            className={styles.form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onSubmit}
                            autoComplete="off"
                        >
                            <Form.Item name="email" label="Email address">
                                <Input />
                            </Form.Item>
                            <Form.Item name="firstName" label="First Name">
                                <Input />
                            </Form.Item>
                            <Form.Item name="lastName" label="Last Name">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit" className={styles.submitButton}>
                                        Submit
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    :
                    <Complete />
                }
        </div>
    )
};
