import { useEffect, useState } from "react";
import { FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form } from "reactstrap";

const studentModel = {
    id: 0,
    email: "",
    name: "",
    lastName: "",
    grade: 0,
};

const StudentModal = ({ showModal, setShowModal, saveStudent, edit, setEdit, updateStudent }) => {
    const [student, setStudent] = useState(studentModel);

    const updateForm = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (edit != null) {
            setStudent(edit);
        } else {
            setStudent(studentModel);
        }

    }, [edit]);

    const closeModal = () => {
        setShowModal(!showModal);
        setEdit(null);
    };

    return (
        <Modal isOpen={showModal}>
            <ModalHeader>
                {student.id === 0 ? "Nuevo estudiante" : "Editar estudiante"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Correo"
                            onChange={(e) => updateForm(e)}
                            value={student.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Nombre"
                            onChange={(e) => updateForm(e)}
                            value={student.name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellidos</Label>
                        <Input
                            name="lastName"
                            type="text"
                            placeholder="Apellidos"
                            onChange={(e) => updateForm(e)}
                            value={student.lastName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Calificación</Label>
                        <Input
                            name="grade"
                            type="number"
                            placeholder="Calificación"
                            onChange={(e) => updateForm(e)}
                            value={student.grade}
                            min="0"
                            max="100"
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={student.id === 0 ? (e) => saveStudent(student) : (e) => updateStudent(student)}>{student.id === 0 ? 'Guardar' : 'Actualizar'}</Button>
                <Button color="danger" size="sm" className="me-2" onClick={closeModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default StudentModal;
