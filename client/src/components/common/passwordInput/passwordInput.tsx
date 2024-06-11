import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle.ts";
import React from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  isLabelReq?: boolean; // optional field
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  handleChanges,
  name,
  isLabelReq = false,
}) => {
  const { passwordType, toggleType } = usePasswordToggle();

  return (
    <Form>
      {isLabelReq && <Form.Label>{label}</Form.Label>}

      <InputGroup>
        <Form.Control
          placeholder={label}
          type={passwordType}
          value={value}
          onChange={handleChanges}
          minLength={8}
          name={name}
        />
        <InputGroup.Text style={{ cursor: "pointer" }} onClick={toggleType}>
          {passwordType === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
        </InputGroup.Text>

        <Form.Control.Feedback type="invalid">
          <p className="text-danger">Please Enter atleast 8 characters.</p>
        </Form.Control.Feedback>
      </InputGroup>
    </Form>
  );
};
