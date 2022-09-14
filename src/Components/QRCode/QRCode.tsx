interface IQRCode {
    QRString: string;
}

export default function QRCode({QRString} : IQRCode) {

        return (
            <p>{QRString}</p>
        );
}