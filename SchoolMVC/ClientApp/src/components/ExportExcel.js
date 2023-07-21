import {utils, writeFile} from 'xlsx';
import {Button} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'




/**
 * 
 * @param {string[]} headers [id, name, lastName, ...] 
 * @param {string[]} data [{id: 1, name: "...", lastName: "..", ...}, {...}]
 * * @param {string} fileName name of file
 * @returns 
 */
const ExportToExcel = ({headers, data, fileName}) => {

  const exportToExcel = () => {
    if ((data ?? []).length === 0) {
      return window.alert('No hay estudiantes registrados');
    }
  
    const formatData = [
      (headers ?? []),
      ...(data ?? [])
    ];

    const worksheet = utils.aoa_to_sheet(formatData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
    writeFile(workbook, `${fileName || 'excel'}.xlsx`);
  };

  return (
      <Button color="success" size="sm" onClick={exportToExcel}> 
        <FontAwesomeIcon icon={faFileExcel} size="xl"/> 
      </Button>
  );
};

export default ExportToExcel;