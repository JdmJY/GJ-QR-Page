import qr from '../../assets/tmp/qr.png';
import logo from '../../assets/tmp/logo.svg';
import styles from "./Complete.module.scss";

export default function Complete() {
    return (
        <section className={styles.body}>
            <header>
                <img src={logo} alt="My Happy SVG" width="250px" />
            </header>
            <h1 className={styles.signInTxt}>Thanks for signing up, Anette.</h1>
            <img src={qr} className={styles.imgtest} alt="logo" />
            <div>(anette.jaeger@georgjensen.com)</div>
        </section>
    )
};
