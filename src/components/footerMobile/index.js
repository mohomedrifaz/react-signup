import './style.css';

const FooterButton = () => {
    <div className="Next-Btn-mobile">
        <button
            className="verify-btn"
            style={{ backgroundColor: isButtonDisabled ? '#a3bbd5' : '#00438b' }}
            disabled={isButtonDisabled}
            onClick={handleVerify}
        >
            Verify
        </button>
    </div>
}

export default FooterButton;