import { Table, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { ActivityData } from "../../../types/types";
import { ItemsNotFound } from "../itemsNotFound/itemsNotFound";

export const DisplayTodoTable = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const [todos, setTodos] = useState<ActivityData[]>([]);
  useEffect(() => {
    if (userId) {
      getTodoItems(userId);
    } else {
      console.log("Please loggin again");
    }
  }, [userId]);

  const getTodoItems = async (parentId: string) => {
    try {
      let res = await axiosInstance.get(`/getTodoItemsByParentId/${parentId}`);
      if (res.status === 200) {
        let data = res.data?.data || [];
        setTodos(data);
        console.log("data", data);
      }
    } catch (error) {
      console.log("Error on getting parent todo items", error);
    }
  };

  return (
    <Container className="my-5" style={{ minHeight: "300px" }}>
      <h2 className="text-center">Todo List</h2>
      {todos.length === 0 ? (
        <ItemsNotFound title="No Todo Items Found" description="You have no pending tasks. Enjoy your free time!"/>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Activity Date</th>
              <th>Activity Time (Hrs)</th>
              <th>Activity Time (Mins)</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 &&
              todos.map((todo, index) => (
                <tr key={index}>
                  <td>{todo?.activityName}</td>
                  <td>{todo?.activityDate.substring(0, 10)}</td>
                  <td>{todo?.activityTimeHrs}</td>
                  <td>{todo?.activityTimeMins}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
