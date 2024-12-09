"use client";

import { useState, useTransition } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import confetti from "canvas-confetti";
import { loginAction, registerAction } from "@/actions/auth-action";
import { SuccessMessage } from "@/components/SuccessMessage";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useRouter } from "next/navigation.js";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

export default function AuthComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (isLogin) {
      startTransition(async () => {
        const response = await loginAction({
          email: formData.email,
          password: formData.password,
        });

        if (!response.success) {
          setError("Invalid credentials.");
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }
        onOpenChange();
        setSuccess(true);
        router.push("/home");
      });
    } else {
      const user = await registerAction({
        email: formData.email,
        password: formData.password,
        name: formData.username,
      });

      if (!user.success) {
        setError("User already exists.");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }
      setSuccess(true);
      confetti();
      setFormData({
        username: "",
        email: formData.email,
        password: formData.password,
        confirmPassword: "",
      });
      setIsLogin(true);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Sign in
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isLogin ? "Log in" : "Register"}
              </ModalHeader>
              <ModalBody>
                {error && <ErrorMessage message={error} />}
                {success && <SuccessMessage message="Logged in successfully!" />}

                {!isLogin && (
                  <Input
                    autoFocus
                    label="Username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                )}
                <Input
                  autoFocus={isLogin}
                  endContent={<MailIcon className="text-2xl text-default-400" />}
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="bordered"
                />
                <Input
                  endContent={<LockIcon className="text-2xl text-default-400" />}
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  variant="bordered"
                />
                {!isLogin && (
                  <Input
                    endContent={<LockIcon className="text-2xl text-default-400" />}
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    variant="bordered"
                  />
                )}

                {isLogin && (
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox>Remember me</Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </ModalBody>

              <ModalFooter className="flex flex-col gap-4">
                <Button
                  color="primary"
                  fullWidth
                  onPress={handleSubmit}
                  disabled={isPending}
                >
                  {isLogin ? "Sign in" : "Register"}
                </Button>

                {/* Botón de Google centrado */}
                <div className="flex justify-center w-full">
                  <GoogleButton
                    onClick={() => {
                     
                      const response = signIn("google");
                     
                      console.log(response);
                    }}
                    style={{ width: "100%" }}
                  />
                </div>

                {/* Link para alternar entre Login/Register */}
                <div className="text-center w-full">
                  <Link
                    color="primary"
                    href="#"
                    size="sm"
                    onPress={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? "Don't have an account? Register"
                      : "Already have an account? Log in"}
                  </Link>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
