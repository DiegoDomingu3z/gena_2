const { Modal } = require("antd")
const GenaModal = ({open, setOpen, title, children}) => {
    // ! RETURNING JSX */
    return (
        <Modal 
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        width={1000}>
        {title ? 
        <div>
            <h1 className="text-2xl font-medium">{title}</h1>
            <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
        </div> : null}
        {children}
        </Modal>
    )
}

export default GenaModal;