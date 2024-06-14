import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { generarExcel } from '../servicios/FuncionesInstrumento';
import "./../componentes/css/GrillaInstrumentos.css";
import './css/ModalExcel.css';
import { FaFileExcel } from 'react-icons/fa';

const GenerarExcelButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);

  const handleGenerarExcel = async () => {
    try {
      if (!fechaDesde || !fechaHasta) {
        alert('Por favor selecciona ambas fechas');
        return;
      }
  
      const filtro = {
        fechaDesde: moment(fechaDesde).format('YYYY-MM-DD'),
        fechaHasta: moment(fechaHasta).format('YYYY-MM-DD')
      };
  
      const arrayBuffer = await generarExcel(filtro);
  
      const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;

      // Convertir las fechas a String
      const fechaDesdeStr = moment(fechaDesde).format('YYYY-MM-DD');
      const fechaHastaStr = moment(fechaHasta).format('YYYY-MM-DD');

      // Incluir el rango de fechas en el nombre del archivo
      a.download = 'pedidos_' + fechaDesdeStr + '_to_' + fechaHastaStr + '.xlsx';

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error('Error generando el reporte Excel:', error);
      alert('Error generando el reporte Excel. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <Button className="btn-excel no-outline" variant="primary" onClick={() => setShowModal(true)}>
        <FaFileExcel />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generar Reporte Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formFechaDesde">
              <Form.Label column sm="4">Fecha Desde:</Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={fechaDesde}
                  onChange={date => setFechaDesde(date as Date)}
                  dateFormat="dd/MM/yyyy"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFechaHasta">
              <Form.Label column sm="4">Fecha Hasta:</Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={fechaHasta}
                  onChange={date => setFechaHasta(date as Date)}
                  dateFormat="dd/MM/yyyy"
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className = "btn-danger" variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button className = "btn-excel-2" variant="primary" onClick={handleGenerarExcel}>
            Generar Excel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GenerarExcelButton;