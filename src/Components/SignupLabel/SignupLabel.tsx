import { Input } from "antd";
import styles from "./SignupLabel.module.scss";

interface ISignupLabel {
    label: string;
}



export default function SignupLabel(handleChange: any, {label} : ISignupLabel) {
        return (
            <div className={styles.signupLabel}>
                <label className={styles.label} >{label}</label>
                <br/>
                <Input size="large" placeholder={label} onChange={handleChange} />
            </div>
        )
}