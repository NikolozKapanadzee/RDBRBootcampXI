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
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  const handleStepOneNext = (data: any) => {
    setApiErrors({});
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStepTwoNext = (data: any) => {
    setApiErrors({});
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleStepThreeSubmit = async (data: any) => {
    try {
      const finalData = { ...formData, ...data };
      const response = await registerUser(finalData);

      if (response.errors) {
        const mapped: Record<string, string> = {};
        Object.entries(response.errors).forEach(([key, messages]: any) => {
          mapped[key] = messages[0];
        });
        setApiErrors(mapped);
        if (mapped.email) setStep(1);
        else if (mapped.password || mapped.password_confirmation) setStep(2);
        else if (mapped.username || mapped.avatar) setStep(3);
        return;
      }
      setToken(response.data.token);
      const me = await getMe(response.data.token);
      setUser(me.data);
      closeAll();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeAll}>
      {step === 1 && (
        <StepOne onNext={handleStepOneNext} apiErrors={apiErrors} />
      )}
      {step === 2 && (
        <StepTwo
          onBack={() => setStep(1)}
          onNext={handleStepTwoNext}
          apiErrors={apiErrors}
        />
      )}
      {step === 3 && (
        <StepThree
          onBack={() => setStep(2)}
          onSubmit={handleStepThreeSubmit}
          apiErrors={apiErrors}
        />
      )}
    </Modal>
  );
};
export default RegisterModal;
