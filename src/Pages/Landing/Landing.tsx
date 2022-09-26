import styles from "./Landing.module.scss";
import logo from '../../assets/tmp/GJ_logo_light.png';
import { Button, Checkbox, Form, Input, Space, Spin } from 'antd';
import { useRecoilState } from 'recoil';
import { SignUpForm } from '../../Atoms/SignUpForm';
import { ISignup } from '../../Models/ISignup';
import Complete from '../Complete/Complete';
import axios from 'axios';
import { IComplete } from '../../Models/IComplete';
import { QrcodeAtom } from '../../Atoms/QrcodeAtom';
import { ShowForm } from '../../Atoms/ShowForm';
import { Loading } from "../../Atoms/Loading";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

export default function Landing() {
    const [form] = Form.useForm();
    const [signUpForm, setSignUpForm] = useRecoilState(SignUpForm)
    const [showForm, setShowForm] = useRecoilState(ShowForm)
    const [qrcode, setQrcode] = useRecoilState(QrcodeAtom)
    const [loading, setLoading] = useRecoilState(Loading)

    const  endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;


    var medlemsLink = <a href="https://www.georgjensen.com/da-dk/medlemsbetingelser
    ">medlemsbetingelserne</a>;
    var personDataLink = <a href="https://www.georgjensen.com/da-dk/persondatapolitik 
    ">persondatapolitikken</a>;

    const postMemberToCrm = (params: ISignup) => {
        if (endpoint == null) {
            console.log("Endpoint is not set");
            setLoading(false);
            return;
        }
        axios.get<IComplete>(endpoint, { //'http://localhost:7140/api/QrCreateMember' //https://azurewebsitebackend-dev.azurewebsites.net/api/QrCreateMember?code=VEzRcYmVmBMDFkKNuG5Do7tmWUY4qp2ug2BwPFH5R6MCAzFu4Zm_TA==
            params: {
                email: params.email,
                firstname: params.firstName,
                lastname: params.lastName,
                birthdate : params.birthdate
            }
        })
        .then((response) => {
                const { data } = response 
                setQrcode(data as IComplete) 
                setShowForm(false);
                setLoading(false);
            }
        )
    };

    function onSubmit(values: ISignup) {
        setLoading(true);
        setSignUpForm(values);
        postMemberToCrm(values);
    }

    return (
        <div className={styles.center}>

            <img loading="lazy" src={logo} alt="My Happy SVG " width="250px" />
            <p style={{ fontSize: "36px" }}>Georg Jensen Collectors</p>

            {
                showForm ?

                    <Form
                        className={styles.form}
                        initialValues={{ remember: true }}
                        onFinish={onSubmit}
                        autoComplete="off"
                        form={form}
                    >
                        <div className={styles.AntForm}>
                            <Form.Item className={styles.jonas}  name="email" rules={[{ required: true, message: 'Indtast email adresse' }]}>
                                <Input placeholder="Email adresse" />
                            </Form.Item>
                            <Form.Item className={styles.jonas} name="firstName" rules={[{ required: true, message: 'Indtast fornavn' }]} >
                                <Input placeholder="Fornavn"/>
                            </Form.Item>
                            <Form.Item className={styles.jonas} name="lastName"  rules={[{ required: true, message: 'Indtast efternavn' }]}>
                                <Input placeholder="Efternavn"/>
                            </Form.Item>
                            <Form.Item className={styles.jonas} name="birthdate" >
                                <Input autoFocus={true} type="date"  placeholder="Fødselsdag"/>
                            </Form.Item>
                            <Form.Item   name="marketing" valuePropName="checked"  rules={[
                                {
                                    validator: async (_, checked) => {
                                        if (!checked) {
                                            return Promise.reject(
                                                new Error("you must accept to deposit 10% of the sale price"),
                                            );
                                        }
                                    },
                                },
                            
                            ]}>
                                <Checkbox className={styles.consent}>Ja, jeg vil gerne modtage tilpasset markedsføring fra Georg Jensen vedrørende produkter, tilbud, events, konkurrencer, invitationer, nyheder mv. pr. e-mail eller sms, afhængigt af de kontaktoplysninger jeg har givet til Georg Jensen. Jeg kan altid tilbagekalde mit samtykke via et afmeldingslink i henvendelsen eller på min profil. Læs mere (klappet sammen)</Checkbox>
                            </Form.Item>
                            <p className={styles.consent} >
                                -Georg Jensen vil indsamle og behandle mine kontaktoplysninger sammen med min købsinformation og adfærdsinformation indsamlet via brug af cookies og lignende teknologier, såsom pixels, tags og andre identifikatorer. Ved at trykke på 'Opret konto' accepterer jeg samtidig {medlemsLink} og {personDataLink}.*
                            </p>

                            <Form.Item>
                                <Button disabled={loading} type="primary" htmlType="submit" className={styles.submitButton}>
                                    {
                                        loading ? 

                                        <Spin /> : <p style={{backgroundColor: "#ACE3FF"}} className={styles.ButtonText}>Submit</p>
                                    }
                                    
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
