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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

export default function Landing() {
    const [form] = Form.useForm();
    const [signUpForm, setSignUpForm] = useRecoilState(SignUpForm)
    const [showForm, setShowForm] = useRecoilState(ShowForm)
    const [qrcode, setQrcode] = useRecoilState(QrcodeAtom)

    var medlemsLink = <a href="google.com">medlemsbetingelserne</a>;
    var personDataLink = <a href="google.com">persondatapolitikken</a>;

    const postMemberToCrm = (params: ISignup) => {
        axios.get<IComplete>('http://localhost:7140/api/QrCreateMember', {
            params: {
                email: params.email,
                firstname: params.firstName,
                lastname: params.lastName,
            }
        })
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
            <p style={{ fontSize: "36px" }}>Georg Jensen Collectors</p>

            {
                showForm ?

                    <Form
                        // {...layout}
                        className={styles.form}
                        // name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onSubmit}
                        autoComplete="off"
                        form={form}
                    >
                        <div className={styles.AntForm}>
                            <Form.Item className={styles.jonas}  name="email">
                                <Input placeholder="Email Address" />
                            </Form.Item>
                            <Form.Item className={styles.jonas} name="firstName" >
                                <Input placeholder="First Name"/>
                            </Form.Item>
                            <Form.Item className={styles.jonas} name="lastName" >
                                <Input placeholder="Last Name"/>
                            </Form.Item>
                            <Form.Item className={styles.jonas} name="birthdate" >
                                <Input type="date" />
                            </Form.Item>
                            <Form.Item className={styles.consent}  name="marketing" valuePropName="unchecked">
                                <Checkbox>Ja, jeg vil gerne modtage tilpasset markedsføring fra Georg Jensen vedrørende produkter, tilbud, events, konkurrencer, invitationer, nyheder mv. pr. e-mail eller sms, afhængigt af de kontaktoplysninger jeg har givet til Georg Jensen. Jeg kan altid tilbagekalde mit samtykke via et afmeldingslink i henvendelsen eller på min profil. Læs mere (klappet sammen)</Checkbox>
                            </Form.Item>
                            <p className={styles.consent} >
                                -Georg Jensen vil indsamle og behandle mine kontaktoplysninger sammen med min købsinformation og adfærdsinformation indsamlet via brug af cookies og lignende teknologier, såsom pixels, tags og andre identifikatorer. Ved at trykke på 'Opret konto' accepterer jeg samtidig {medlemsLink} og {personDataLink}.*
                            </p>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.submitButton}>
                                    Submit
                                </Button>
                            </Form.Item>
                            
                        </div>
                    </Form>
                    :
                    <Complete />
            }
        </div>
    )
};
