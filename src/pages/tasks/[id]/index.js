import {
  Container,
  Card,
  Button,
  Grid,
  Confirm,
  Loader,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState } from "react";
import Error from "next/error";

export default function TaskDetail({ task, error }) {
  const router = useRouter();
  const { id } = router.query;
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(id);
    close();
    console.log("deleting task", id);
    router.push("/");
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Container style={{ padding: "20px" }}>
        <Card.Group itemsPerRow={1}
        
        >
          <Card
          style={{width: '50%'}}
          verticalAlign="middle"
          centered
          padding="20px" 
          

                  
          >
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <Card.Meta>{task.description}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button.Group>
                <Button color="red" onClick={open} loading={loading}>
                  Delete
                </Button>
              </Button.Group>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>

      <Confirm
        open={confirm}
        onCancel={close}
        onConfirm={handleDelete}
        header="Eliminar tarea"
        content="¿Estas seguro de eliminar esta tarea?"
        cancelButton="Cancelar"
        confirmButton="Eliminar"
      ></Confirm>
    </Grid>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status == 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "invalid id",
      },
    },
  };
}
