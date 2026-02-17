
// Import images based on your folder structure
import polo from '../../assets/images/polo.png'; 
import puma from '../../assets/images/puma.png';
import lacoste from '../../assets/images/lacoste.png';
import adidas from '../../assets/images/adidas.png';

const BrandShowcase = () => {
  const brands = [
    { name: 'Polo', img: polo },
    { name: 'Puma', img: puma },
    { name: 'Lacoste', img: lacoste },
    { name: 'Adidas', img: adidas },
  ];

  return (
    <section className="bg-[#eef6fa] py-10 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm mb-8 font-medium">
          The store is an authorized agent for major international companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-80">
          {brands.map((brand) => (
            <img 
              key={brand.name}
              src={brand.img} 
              alt={brand.name} 
              className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;