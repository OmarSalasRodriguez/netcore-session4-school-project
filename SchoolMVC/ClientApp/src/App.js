import { Container, Row, Col, Card, CardHeader, CardBody, Button, Input } from "reactstrap";
import { useEffect, useState } from 'react';
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";
import ExportToExcel from "./components/ExportExcel";

const App = () => {
    const [students, setStudents] = useState([]);
    const [countStudents, setCountStudents] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(null);
    const [search, setSearch] = useState("");
    const [interval, setInterval] = useState(null);
    
    // GET
    const getStudents = async () => {
        const response = await fetch("/api/student?" + new URLSearchParams({ search }));

        if (!response.ok) {
            setStudents([]);
            return;
        }

        const data = await response.json();
        setStudents(data);
    }

    // GET
    const getCountStudents = async () => {
        const response = await fetch("/api/student/count?" + new URLSearchParams({ search }));

        if (!response.ok) {
            setCountStudents(0);
            return;
        }

        const data = await response.json();
        setCountStudents(data);
    }

    // DELETE
    const deleteStudent = async (id) => {
        var confirm = window.confirm("¿Deseas eliminar al estudiante?");
        if (!confirm) return;

        const response = await fetch("/api/student/" + id, {
            method: "DELETE",
        });

        if (!response.ok) return window.alert("No se ha podido eliminar al estudiante");

        window.alert("Estudiante eliminado");
        getStudents();
    };

    // POST
    const saveStudent = async (student) => {
        const response = await fetch("/api/student", {
            method: "POST",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            window.alert("No se ha podido registrar el estudiante");
            return;
        }

        setShowModal(!showModal);
        getStudents();
    };

    // PATCH
    const updateStudent = async (student) => {
        const response = await fetch("/api/student", {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            window.alert("No se ha podido actualizar el estudiante");
            return;
        }


        setShowModal(!showModal);
        getStudents();
    };

    // HANDLE INPUT SEARCH
    const handleChange = () => {
        if (interval) {
            clearInterval(interval);
        }

        const timeout = setTimeout(() => {
            getStudents();
            getCountStudents();
        }, 500);

        setInterval(timeout);
    };


    useEffect(() => {
        handleChange();
    }, [search]);


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <h5>Estudiantes</h5>
                                <div className="d-flex gap-3">
                                    {/* headers, data, fileName */}
                                    <ExportToExcel
                                        headers={['Id', 'Correo', 'Nombre', 'Apellidos', 'Calificación']}
                                        data={students.map(({ id, email, name, lastName, grade }) => ([id, email, name, lastName, grade]))}
                                        fileName="estudiantes"
                                    />
                                    <Input name="email" type="text" placeholder="Buscar" onChange={(e) => setSearch(e.target.value)} value={search} /> {/* onChange={handleChange} */}
                                    <Button size="sm" color="success" onClick={() => setShowModal(!showModal)}>Agregar</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>

                            <StudentTable
                                students={students}
                                deleteStudent={deleteStudent}
                                setEdit={setEdit}
                                setShowModal={setShowModal}
                                showModal={showModal}
                                countStudents={countStudents}
                            />

                        </CardBody>
                    </Card>

                </Col>
            </Row>

            <StudentModal
                showModal={showModal}
                setShowModal={setShowModal}
                saveStudent={saveStudent}
                edit={edit}
                setEdit={setEdit}
                updateStudent={updateStudent}
            />
        </Container>
    );
}

export default App;