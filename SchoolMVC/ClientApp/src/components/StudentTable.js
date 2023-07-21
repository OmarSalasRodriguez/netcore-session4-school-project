import { Button, Table } from "reactstrap";


const StudentTable = ({ students, deleteStudent, setEdit, showModal, setShowModal}) => {
    const sendData = (contacto) => {
        setEdit(contacto);
        setShowModal(!showModal);
    };

    const notData = (
        <tr>
            <td colSpan="5" className="text-center p-3">No hay estudiantes registrados</td>
        </tr>
    );

    const data = (
        students.map((item) => (
            <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.grade}</td>
                <td>
                    <div className='d-flex justify-content-between'>
                        <Button color="primary" size="sm" className="me-2" onClick={() => sendData(item)}>Editar</Button>
                        <Button color="danger" size="sm" className="me-2" onClick={() => deleteStudent(item.id)}>Eliminar</Button>
                    </div>
                </td>
            </tr>
        ))
    );

   
    return (
        <>
            <Table striped responsive id="table-to-xls">
                <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Calificación</th>
                        <th style={{ 'width': '160px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {(students.length === 0) ? notData : data}
                </tbody>
            </Table>
        </>
    );
}

export default StudentTable;

