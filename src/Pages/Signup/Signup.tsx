import qr from '../../assets/tmp/qr.png';
import styles from "./Signup.module.scss";
export default function Signup() {
    
    return (
        <div>
            <p> signup page </p>
            <img src={qr} className={styles.imgtest} alt="logo" />

        </div>
    )
};
