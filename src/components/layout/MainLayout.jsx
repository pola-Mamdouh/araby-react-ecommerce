
import Navbar from './Navbar'
import Footer from './Footer'
import BrandShowcase from '../home/BrandShowcase'

const MainLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
      <BrandShowcase />
      <Footer />
    </div>
  )
}

export default MainLayout