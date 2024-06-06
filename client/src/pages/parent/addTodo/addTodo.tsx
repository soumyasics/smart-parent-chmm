import { CommonFooter } from "../../../components/common/footer/footer";
import { ParentNavbar } from "../../../components/parent/parentNavbar/parentNavbar";
import { AddTodoForm } from "./addTodoForm";

export const AddTodo = () => {
  return (
    <div>
      <ParentNavbar />
      <div style={{ minHeight: "500px" }}>
        <AddTodoForm />
      </div>
      <CommonFooter />
    </div>
  );
};
