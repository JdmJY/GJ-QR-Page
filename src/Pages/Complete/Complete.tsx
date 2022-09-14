import styles from './Complete.module.scss';
import 'antd/es/spin/style/css';
import { useRecoilState } from 'recoil';
import { QrcodeAtom } from '../../Atoms/QrcodeAtom';
import QRCode from 'react-qr-code';

export default function Complete() {
    const [qrcode] = useRecoilState(QrcodeAtom)  
    return (
        <div className={styles.body}>
            <div className={styles.center}>
                <h1 className={styles.signInTxt}>Thanks for signing up, {qrcode.fullname}.</h1>
                 <QRCode value={qrcode.email} />
                <div>({qrcode.email})</div>
            </div>
        </div> 
    )
};
