// src/pages/Home.jsx
import BestSeller from '../components/home/BestSeller'
import GlobalCategories from '../components/home/GlobalCategories'
import Slider from '../components/home/Slider'

const Home = ({ homeProducts, bestSeller, allProducts, addToCart, cartItems }) => { 
  return (
    <main className='Home container mx-auto'>
      <div className="content">
        <Slider homeProducts={homeProducts}/>
        <BestSeller addToCart={addToCart} bestSeller={bestSeller}  cartItems={cartItems}/>
       
        <GlobalCategories allProducts={allProducts}/>
      </div>
    </main>
  )
}

export default Home