import { Table, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../apis/axiosInstance';
export const DisplayTodoTable = () => {
  const userType = useSelector((state: RootState) => state.user.userType);
  const {userId} = useSelector((state: RootState) => state.user);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    if (userId) {
        getTodoItems(userId)        
    }else {
        console.log("Please loggin again")
    }
  },[userId])

  const getTodoItems = async (parentId: string) => {
    try {

        let res = await axiosInstance.get(`/getTodoItemsByParentId/${parentId}`);
        console.log("ress", res);
        if (res.status === 200) {
            let data = res.data?.data || [];
            setTodos(data);
            console.log("data", data)
        }
        
    } catch (error) {
        console.log("Error on getting parent todo items", error)
    }
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center">Todo List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>Activity Date</th>
            <th>Activity Time (Hrs)</th>
            <th>Activity Time (Mins)</th>
            {userType === 'parent' && <th>Parent ID</th>}
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 && todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo?.activityName}</td>
              <td>{todo?.activityDate}</td>
              <td>{todo?.activityTimeHrs}</td>
              <td>{todo?.activityTimeMins}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

