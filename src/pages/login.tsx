import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const StyledInput = styled(Input)`
  border: 1px solid #e7e7e7 !important;
  box-shadow: none;
  padding: 8px 12px;
  border-radius: 10px;

  &::placeholder {
    color: #464b59;
  }
  &:active {
    border: 1px solid #e7e7e7;
  }

  &:focus {
    border-color: black !important;
    box-shadow: none !important;
  }

  @media (min-width: 768px) {
    padding: 13px 15px;
  }
`;
const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    width: 22px;
    height: 22px;
    background-color: #f4f4f4;
    border-radius: 4px;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #3857af !important;
    border-color: #3857af !important;
  }
`;
const StyledButton = styled(Button)`
  color: white;
  font-weight: medium;
  text-transform: uppercase;
  background-color: #13265c;
  border-radius: 50px;
  border: 1px solid #13265c;

  &:hover {
    border-color: #13265c !important;
    color: white !important;
    background-color: #13265c !important;
  }

  @media (min-width: 768px) {
  }
`;

const Login = () => {
  const [state, setState] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      if (state === "login") {
        const res = await axios.post(
          "https://new-project-backend-production.up.railway.app/api/auth/login",
          {
            login_name: values.username,
            password: values.password,
          }
        );

        const { token, user } = res.data;
        const role = user.role;

        // ✅ Agar "Eslab qolish" tanlangan bo‘lsa — localStoragega yozamiz
        if (values.remember) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({
              username: values.username,
              password: values.password,
            })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        if (role === "admin" || role === "teacher") {
          localStorage.setItem("adminToken", token);
          message.success("Admin panelga muvaffaqiyatli kirdingiz!");
          navigate("/admin");
        } else {
          localStorage.setItem("token", token);
          message.success("Foydalanuvchi paneliga muvaffaqiyatli kirdingiz!");
          navigate("/dashboard");
        }
      } else {
        // Register
        const res = await axios.post(
          "https://new-project-backend-production.up.railway.app/api/auth/register",
          {
            name: values.name,
            surname: values.surname,
            login_name: values.username,
            email: values.email,
            password: values.password,
          }
        );

        message.success("Ro’yxatdan muvaffaqiyatli o‘tdingiz!");
        setState("login");
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Xatolik yuz berdi!";
      setErrorMessage(errMsg);
      message.error(errMsg);
    }
  };

  const [form] = Form.useForm(); // Formni control qilish uchun

  useEffect(() => {
    const savedUser = localStorage.getItem("rememberedUser");
    if (savedUser) {
      const { username, password } = JSON.parse(savedUser);
      form.setFieldsValue({ username, password, remember: true });
    }
  }, [form]);

  return (
    <>
      {state === "login" ? (
        // Login UI
        <div className="flex">
          <div className="h-screen w-1/2 hidden lg:block loginimg"></div>
          <div className="flex flex-col bg-[#F4F7FF] h-screen justify-center p-4 w-full items-center lg:w-1/2">
            <div className="w-full max-w-[524px]">
              <div className="flex gap-[10px] items-center mb-5">
                <button
                  onClick={() => navigate("/")}
                  className="flex cursor-pointer h-6 justify-center w-6 items-center"
                >
                  <i className="text-[#13265C] text-xl fa-arrow-left fa-solid"></i>
                </button>
                <p>Ortga qaytish</p>
              </div>
              <div className="bg-white p-5 rounded-[10px]">
                <p className="text-[32px] font-medium pb-10">Kirish</p>

                {errorMessage && (
                  <div className="text-red-500 text-sm pb-3">
                    {errorMessage}
                  </div>
                )}
                <Form
                  form={form} // <== bu qo‘shiladi
                  name="login"
                  onFinish={onFinish}
                  autoComplete="off"
                  onChange={() => setErrorMessage("")}
                  className="flex flex-col gap-5"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Iltimos foydalanuvchi nomini kiriting!",
                      },
                    ]}
                  >
                    <StyledInput
                      size="large"
                      placeholder="Foydalanuvchi nomi"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Iltimos parolni kiriting!" },
                    ]}
                  >
                    <StyledInput
                      size="large"
                      placeholder="Parolingizni kiriting"
                    />
                  </Form.Item>
                  <div className="flex justify-between items-center">
                    <Form.Item name="remember" valuePropName="checked">
                      <StyledCheckbox>Eslab qolish</StyledCheckbox>
                    </Form.Item>
                    <button className="text-[#13265C] cursor-pointer hover:underline">
                      Parolni unutdingizmi?
                    </button>
                  </div>
                  <Form.Item>
                    <StyledButton
                      className="w-full mt-5 uppercase"
                      size="large"
                      htmlType="submit"
                    >
                      KIRISH
                    </StyledButton>
                  </Form.Item>
                  <div className="text-[#13265C] text-center">
                    <span>Hisobingiz yo’qmi?</span>{" "}
                    <button
                      onClick={() => setState("register")}
                      className="cursor-pointer hover:underline"
                    >
                      Unda ro’yxatdan o’ting
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Register UI
        <div className="flex">
          <div className="h-screen w-1/2 hidden lg:block loginimg"></div>
          <div className="flex flex-col bg-[#F4F7FF] h-screen justify-center p-2 w-full items-center lg:w-1/2">
            <div className="w-full max-w-[524px] max-h-[90vh] overflow-y-auto">
              <div className="flex gap-[10px] items-center mb-5">
                <button
                  onClick={() => navigate("/")}
                  className="flex cursor-pointer h-6 justify-center w-6 items-center"
                >
                  <i className="text-[#13265C] text-xl fa-arrow-left fa-solid"></i>
                </button>
                <p>Ortga qaytish</p>
              </div>
              <div className="bg-white p-5 rounded-[10px]">
                <p className="text-[32px] font-medium pb-10">
                  Ro’yxatdan o’tish
                </p>
                {errorMessage && (
                  <div className="text-red-500 text-sm pb-3">
                    {errorMessage}
                  </div>
                )}
                <Form
                  name={state === "login" ? "login" : "register"}
                  onFinish={onFinish}
                  onChange={() => setErrorMessage("")} // <== bu qo‘shiladi
                  autoComplete="off"
                  className="flex flex-col gap-5"
                >
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Ismingizni kiriting!" },
                    ]}
                  >
                    <StyledInput size="large" placeholder="Ismingiz" />
                  </Form.Item>
                  <Form.Item
                    name="surname"
                    rules={[
                      { required: true, message: "Familiyangizni kiriting!" },
                    ]}
                  >
                    <StyledInput size="large" placeholder="Familiyangiz" />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Foydalanuvchi nomini kiriting!",
                      },
                    ]}
                  >
                    <StyledInput
                      size="large"
                      placeholder="Foydalanuvchi nomi"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Email kiriting!" },
                      { type: "email", message: "Email noto‘g‘ri formatda!" },
                    ]}
                  >
                    <StyledInput size="large" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Parolni kiriting!" }]}
                  >
                    <StyledInput size="large" placeholder="Parol" />
                  </Form.Item>
                  <Form.Item
                    name="password2"
                    rules={[
                      { required: true, message: "Parolni takroran kiriting!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Parollar mos emas!")
                          );
                        },
                      }),
                    ]}
                  >
                    <StyledInput size="large" placeholder="Parol (takroriy)" />
                  </Form.Item>
                  <Form.Item>
                    <StyledButton
                      className="w-full mt-5 uppercase"
                      size="large"
                      htmlType="submit"
                    >
                      RO‘YXATDAN O‘TISH
                    </StyledButton>
                  </Form.Item>
                  <div className="text-[#13265C] text-center">
                    <span>Hisobingiz bormi?</span>{" "}
                    <button
                      onClick={() => setState("login")}
                      className="cursor-pointer hover:underline"
                    >
                      Unda kiring
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
