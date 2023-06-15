import "../style/AlertMessage.css";
import {Button} from "react-bootstrap";

type Props = {
    onClose: () => void;
    onSubmit: () => void;
    message: string;
    action: string;
}

const AlertMessage = (props: Props) => {
    const { onClose, onSubmit, message, action } = props;
    return(
        <div>
            <div className="modalBackgroundError">
                <div className="modalContainerError">
                    <div className="title">
                        <strong><h5 className="mt-2">Confirmation</h5></strong>
                    </div>
                    <div className="mt-4">
                        <center><strong><h5>{message}</h5></strong></center>
                    </div>
                    <div className="footer">
                        <Button className="mx-auto" onClick={onClose}>Close</Button>
                        <Button className="mx-auto bg-danger"  onClick={onSubmit}>{action}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertMessage;