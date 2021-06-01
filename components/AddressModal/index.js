import Modal from 'react-bootstrap/Modal';
import FormAddress from './FormAddress';

export default function AddressModal(props) {
    return (
        <Modal
            show={props.show}
            size='sm'
            arial-labelledby='contained-model-title-vcenter'
            centered
            backdrop='static'
            keybord={false}
        >
            <Modal.Header>
                <h5 className="fw-bold mt-2">Endereço de Entrega</h5>
            </Modal.Header>
            <Modal.Body>
                <FormAddress
                    onHide={() => props.onHide()}
                    onShow={() => props.onShow()}
                />
            </Modal.Body>
        </Modal>
    )
}