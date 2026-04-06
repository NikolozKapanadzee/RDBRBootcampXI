import { useState } from "react";
import { useModalStore } from "../../../../../store/modalStore";
import Modal from "../../Modal";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const RegisterModal = () => {
  const { isRegisterOpen, closeAll } = useModalStore();
  const [step, setStep] = useState(1);

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeAll}>
      {step === 1 && <StepOne onNext={() => setStep(2)} />}
      {step === 2 && (
        <StepTwo onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}
      {step === 3 && <StepThree onBack={() => setStep(2)} />}
    </Modal>
  );
};
export default RegisterModal;
