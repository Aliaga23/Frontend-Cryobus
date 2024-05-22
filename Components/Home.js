import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import imagen1 from '../Assets/imagen1.jpeg';
import imagen2 from '../Assets/imagen2.jpeg';
import imagen3 from '../Assets/imagen3.jpg';
import imagen4 from '../Assets/imagen4.png';
import imagen6 from '../Assets/imagen6.png';
import imagen7 from '../Assets/imagen7.png';

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } }
};

const testimonialVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, duration: 1.5 } }
};

const serviceVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
};

const Home = () => {
  return (
    <div>

      <main className="container mt-4">
        <div className="row">
          <div className="col-lg-5">
            <div className="about-usintro">
              <h2>CRYOBUS</h2>
              <h3>Historia y Enfoque</h3>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="row">
              <div className="col">
                <div className="about-us">
                  <p><strong>En CryoBus S.R.L., nos enorgullecemos de ser una empresa consolidada en el transporte de encomiendas refrigeradas y no refrigeradas, especialmente en las regiones amazónicas de Bolivia.</strong></p>
                  <p><strong>Nuestro enfoque en la innovación y la sostenibilidad nos ha permitido ofrecer soluciones de transporte eficientes y respetuosas con el medio ambiente.</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section id="gallery">
          <div className="container">
            <h2 className="text-center mb-3">Nuestros Destinos</h2>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="destination-container text-center bg-light p-3">
                  <motion.div className="destination" variants={imageVariants} initial="hidden" animate="visible">
                    <motion.img src={imagen1} alt="Destino 1" className="img-fluid rounded" />
                    <div className="destination-info">
                      <h3>Santa Cruz</h3>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="destination-container text-center bg-light p-3">
                  <motion.div className="destination" variants={imageVariants} initial="hidden" animate="visible">
                    <motion.img src={imagen2} alt="Destino 2" className="img-fluid rounded" />
                    <div className="destination-info">
                      <h3>Cochabamba</h3>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="destination-container text-center bg-light p-3">
                  <motion.div className="destination" variants={imageVariants} initial="hidden" animate="visible">
                    <motion.img src={imagen3} alt="Destino 3" className="img-fluid rounded" />
                    <div className="destination-info">
                      <h3>La paz</h3>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="row mt-4">
          <div className="col-lg-12">
            <h2 className="text-center">Testimonios</h2>
            <div id="testimonials" className="row justify-content-center">
              <div className="col-lg-4">
                <motion.div className="testimonial" variants={testimonialVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <p>"Los servicios de CryoBus son excelentes. Siempre entregan a tiempo y el personal es muy amable."</p>
                  <p className="author">- Cliente Satisfecho</p>
                </motion.div>
              </div>
              <div className="col-lg-4">
                <motion.div className="testimonial" variants={testimonialVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <p>"Me impresiona la eficiencia y el profesionalismo de CryoBus. Recomiendo sus servicios a todos."</p>
                  <p className="author">- Cliente Feliz</p>
                </motion.div>
              </div>
              <div className="col-lg-4">
                <motion.div className="testimonial" variants={testimonialVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <p>"¡CryoBus hace que el transporte sea fácil! Confío en ellos para todas mis necesidades de envío."</p>
                  <p className="author">- Cliente Leal</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="services">
          <h2 className="text-center">Servicios</h2>
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <motion.div className="service-container text-center" variants={serviceVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="service">
                  <img src={imagen4} alt="Servicio 1" className="img-fluid" />
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4">
              <div className="service-container text-center">
                <div className="service">
                  <img src={imagen7} alt="Servicio 2" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-container text-center">
                <div className="service">
                  <img src={imagen6} alt="Servicio 3" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
