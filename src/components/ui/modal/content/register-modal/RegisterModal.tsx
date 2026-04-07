import { useState } from "react";
import { useModalStore } from "../../../../../store/modalStore";
import Modal from "../../Modal";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import { getMe, registerUser } from "../../../../../api/auth";
import { useAuthStore } from "../../../../../store/authStore";

const RegisterModal = () => {
  const { isRegisterOpen, closeAll } = useModalStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const { setUser, setToken } = useAuthStore();

  const handleStepOneNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStepTwoNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleStepThreeSubmit = async (data: any) => {
    const finalData = { ...formData, ...data };
    const response = await registerUser(finalData);
    setToken(response.data.token);
    const me = await getMe(response.data.token);
    setUser(me.data);
    closeAll();
  };

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeAll}>
      {step === 1 && <StepOne onNext={handleStepOneNext} />}
      {step === 2 && (
        <StepTwo onBack={() => setStep(1)} onNext={handleStepTwoNext} />
      )}
      {step === 3 && (
        <StepThree onBack={() => setStep(2)} onSubmit={handleStepThreeSubmit} />
      )}
    </Modal>
  );
};
export default RegisterModal;
