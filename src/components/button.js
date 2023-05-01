import { ReactSVG } from 'react-svg';
import btnBg from '../assets/images/btn-bg.svg';

const Button = ({children, ...props}) => {
    return(
        <>
            <button {...props}>
                {/* <ReactSVG src={btnBg} className='btn_bg'/> */}
                <div className="btn_bg"></div>
                <span>{children}</span>
            </button>
        </>
    )
}
export default Button;