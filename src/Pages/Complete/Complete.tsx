import styles from './Complete.module.scss';
import 'antd/es/spin/style/css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { QrcodeAtom } from '../../Atoms/QrcodeAtom';
import QRCode from 'react-qr-code';

export default function Complete() {
    const qrcode = useRecoilValue(QrcodeAtom);
    
    return (
        <div className={styles.body}>
            <div className={styles.center}>
                {
                    qrcode.IsExistingMember ? <h1 className={styles.signInTxt}>Velkommen tilbage {qrcode.Fullname}.</h1> : <h1 className={styles.signInTxt}>Velkommen til Georg Jensen {qrcode.Fullname}.</h1>
                }
                
                 <QRCode value={qrcode.Email} />
                <div>({qrcode.Email})</div>
                <p>
                    Vi har også sendt dig en e-mail med mere information.
                </p>
            </div>
        </div> 
    )
};
