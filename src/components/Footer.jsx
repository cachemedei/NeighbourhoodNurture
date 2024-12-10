import './styles/Footer.css'
import footerImg from '/images/footer2.jpg'

const Footer = () => {
  return (
    <footer>
        <img src={footerImg} alt="" />
        <ul className='links'>
            <li>about</li>
            <li>home</li>
            <li>contact</li>
            <li>log in</li>
        </ul>
    </footer>
  )
}
export default Footer