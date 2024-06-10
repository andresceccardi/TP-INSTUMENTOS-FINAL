import './css/Footer.css';

const Footer = () => {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0">© 2024 SOAT (Sounds Of a Town)</p>

                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src="../img/midi_footer.png" alt="Descripción de la imagen" width="80" height="80" />
                </a>    

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><a href="#" className="nav-link px-2">Inicio</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2">Cotizacion</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2">Sobre Nosotros</a></li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;