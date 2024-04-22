import Signup from "../Signup";

const { Modal } = require("antd")

const AddUserModal = ({open, setOpen}) => {
    return (
        <Modal 
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        width={1000}>
        <Signup setOpen={setOpen}/>
        </Modal>
    )
}

export default AddUserModal;