import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";


export default function HomePage({ data }) {
  console.log(data);
  const router = useRouter();

  if (data == 0)
    return (
      <Grid
        centered 
        verticalAlign="middle" 
        columns="1" 
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>No hay tareas</h1>
            <img
              src="https://media.giphy.com/media/3o7TKsQ8gqVrXQrjWM/giphy.gif"
              alt="no hay tareas"
            />
            <div>
              <Button color="green">Agregar tarea</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Container style={{padding: '20px'}} >
      <Card.Group itemsPerRow={4}>
        {data.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <Card.Meta>{task.description}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button.Group>
                <Button color="green" onClick={()=> router.push(`/tasks/${task._id}`) }>View</Button>
                <Button.Or />
                <Button color="red" onClick={()=> router.push(`/tasks/${task._id}/edit`)} >Edit</Button>
              </Button.Group>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch("http://localhost:3000/api/tasks");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
