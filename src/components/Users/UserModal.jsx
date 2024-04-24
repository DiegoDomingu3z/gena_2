const { Modal } = require("antd")
const UserModal = ({open, setOpen, component}) => {
    // ! RETURNING JSX */
    return (
        <Modal 
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        width={1000}>
        {component}
        </Modal>
    )
}

export default UserModal;