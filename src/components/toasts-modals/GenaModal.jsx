const { Modal } = require("antd")
const GenaModal = ({open, setOpen, component}) => {
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

export default GenaModal;