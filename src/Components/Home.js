import React from 'react';
import { motion } from 'framer-motion';
import servicio1 from '../Assets/servicio1.png';
import servicio2 from '../Assets/servicio2.png';
import servicio3 from '../Assets/servicio3.png';
import camion from '../Assets/camion.png';
import cliente1 from '../Assets/cliente1.png';
import cliente2 from '../Assets/cliente2.png';
import cliente3 from '../Assets/cliente3.png';
import cliente4 from '../Assets/cliente4.png';

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } }
};

const Home = () => {
  return (
    <div className="bg-gray-100" style={{ fontFamily: 'Fira Sans Condensed, san-serif' }}>
      {/* Hero Section */}
      <section className="bg-blue-50 py-10 sm:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:justify-between">
    <div className="lg:w-1/2 text-left">
      <p className="text-left mt-2 text-2xl sm:text-4xl leading-8 font-extrabold tracking-tight text-gray-900">Innovación y Sostenibilidad en el Transporte de Encomiendas</p>
      <p className="text-left mt-4 text-base sm:text-2xl text-gray-500">En CryoBus S.R.L., nos enorgullecemos de ser una empresa consolidada en el transporte de encomiendas, tanto refrigeradas como no refrigeradas. Nuestro compromiso con la innovación y la sostenibilidad nos permite ofrecer soluciones de transporte eficientes y respetuosas con el medio ambiente.</p>
    </div>
    <motion.div 
      className="lg:w-1/2 mt-10 lg:mt-0"
      variants={imageVariants}
      initial="hidden"
      animate="visible"
    >
      <img 
        className="w-full h-auto max-w-sm mx-auto lg:max-w-lg rounded-lg shadow-md"
        src={camion}
        alt="CRYOBUS truck"
      />
    </motion.div>
  </div>
</section>

      {/* Services Section */}
      <section className="bg-gray-100 py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase sm:text-2xl">Servicios</h2>
            <p className="mt-2 text-2xl sm:text-3xl leading-8 font-extrabold tracking-tight text-gray-900">QUE OFRECEMOS</p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img className="w-full h-auto rounded-lg shadow-md" src={servicio1} alt="Refrigerated Transport" />
                <h3 className="mt-4 text-lg sm:text-xl text-left leading-6 font-medium text-blue-600">Trasporte Refrigerado</h3>
                <p className="mt-2 text-sm sm:text-base text-left leading-6 text-gray-500">Nuestro servicio de transporte refrigerado ofrece soluciones rentables y confiables para garantizar que sus productos perecederos lleguen a su destino en perfectas condiciones.</p>
              </div>
              <div className="text-center">
                <img className="w-full h-auto rounded-lg shadow-md" src={servicio2} alt="Amazonian Delivery" />
                <h3 className="mt-4 text-lg sm:text-xl text-left leading-6 font-medium text-blue-600">Servicio Puerta a Puerta</h3>
                <p className="mt-2 text-sm sm:text-base text-left leading-6 text-gray-500">Nuestros servicios de entrega amazónica proporcionan transporte confiable y eficiente de bienes incluso a las regiones más remotas de la Amazonía boliviana.</p>
              </div>
              <div className="text-center">
                <img className="w-full h-auto rounded-lg shadow-md" src={servicio3} alt="Sustainable Shipping" />
                <h3 className="mt-4 text-lg sm:text-xl text-left leading-6 font-medium text-blue-600">Envios Eco-Friendly</h3>
                <p className="mt-2 text-sm sm:text-base text-left leading-6 text-gray-500">Nuestras soluciones de envío sostenible están diseñadas para minimizar las emisiones de carbono, reducir residuos y conservar los recursos naturales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-200 py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">BENEFICIOS</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="list-disc list-inside text-gray-600">
                <li className="mb-2"><span className="font-bold">Refrigerated Transport Services</span></li>
                <li className="mb-2"><span className="font-bold">Sustainable Shipping Practices</span></li>
                <li className="mb-2"><span className="font-bold">Efficient Amazonian Delivery</span></li>
                <li className="mb-2"><span className="font-bold">Reliable Service</span></li>
                <li className="mb-2"><span className="font-bold">Eco-Friendly Solutions</span></li>
              </ul>
            </div>
            <div>
              <ul className="list-disc list-inside text-gray-600">
                <li className="mb-2"><span className="font-bold">Efficient Transport of Perishable Goods</span></li>
                <li className="mb-2"><span className="font-bold">Eco-Friendly Shipping Practices</span></li>
                <li className="mb-2"><span className="font-bold">Expanded Business Reach</span></li>
                <li className="mb-2"><span className="font-bold">Reliable and Consistent Service</span></li>
                <li className="mb-2"><span className="font-bold">Sustainable Solutions for Amazonian Transport</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonios</h2>
            <p className="mt-2 text-2xl sm:text-3xl leading-8 font-extrabold tracking-tight text-gray-900">QUE DICEN NUESTROS CLIENTES</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {Array(5).fill().map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964 4.151-.018c.962-.004 1.358 1.24.588 1.81l-3.34 2.385 1.275 3.924c.3.921-.755 1.688-1.54 1.165L10 13.763l-3.27 2.394c-.784.523-1.839-.244-1.54-1.165l1.275-3.924-3.34-2.385c-.77-.57-.374-1.814.588-1.81l4.151.018 1.286-3.964z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">CRYOBUS ha sido fundamental en la expansión de nuestro negocio en Bolivia. Sus servicios de entrega amazónica son confiables y eficientes, y su compromiso con la sostenibilidad es evidente en todo lo que hacen.</p>
              <div className="mt-4 flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={cliente1} alt="Sarah Thompson" />
                <p className="font-bold text-gray-900">Sarah Thompson</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {Array(5).fill().map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964 4.151-.018c.962-.004 1.358 1.24.588 1.81l-3.34 2.385 1.275 3.924c.3.921-.755 1.688-1.54 1.165L10 13.763l-3.27 2.394c-.784.523-1.839-.244-1.54-1.165l1.275-3.924-3.34-2.385c-.77-.57-.374-1.814.588-1.81l4.151.018 1.286-3.964z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">Hemos estado utilizando CRYOBUS para nuestras necesidades de transporte durante años y siempre nos ha impresionado su compromiso con la sostenibilidad. Sus servicios de transporte refrigerado son excepcionales y su atención al cliente es insuperable.</p>
              <div className="mt-4 flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={cliente2} alt="John Carter" />
                <p className="font-bold text-gray-900">John Carter</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {Array(5).fill().map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964 4.151-.018c.962-.004 1.358 1.24.588 1.81l-3.34 2.385 1.275 3.924c.3.921-.755 1.688-1.54 1.165L10 13.763l-3.27 2.394c-.784.523-1.839-.244-1.54-1.165l1.275-3.924-3.34-2.385c-.77-.57-.374-1.814.588-1.81l4.151.018 1.286-3.964z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">CRYOBUS ha sido un excelente socio en el crecimiento de nuestro negocio. Sus prácticas de envío sostenible y servicios de entrega amazónica nos han permitido llegar a nuevos clientes y mercados, y no podríamos estar más felices con sus servicios.</p>
              <div className="mt-4 flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={cliente3} alt="Emma Rodriguez" />
                <p className="font-bold text-gray-900">Emma Rodriguez</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {Array(5).fill().map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964 4.151-.018c.962-.004 1.358 1.24.588 1.81l-3.34 2.385 1.275 3.924c.3.921-.755 1.688-1.54 1.165L10 13.763l-3.27 2.394c-.784.523-1.839-.244-1.54-1.165l1.275-3.924-3.34-2.385c-.77-.57-.374-1.814.588-1.81l4.151.018 1.286-3.964z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">Hemos estado utilizando CRYOBUS para nuestras necesidades de transporte durante años y nunca nos han defraudado. Su compromiso con la sostenibilidad y la entrega eficiente nos ha ayudado a crecer nuestro negocio y llegar a nuevos mercados.</p>
              <div className="mt-4 flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={cliente4} alt="David Wilson" />
                <p className="font-bold text-gray-900">David Wilson</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
