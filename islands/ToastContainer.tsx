import { FunctionalComponent } from "preact";
import { ToastContainer } from "react-toastify";

const Toast: FunctionalComponent = () => {
  {/* @ts-expect-error Server Component */}
  return <ToastContainer />;
};

export default Toast;
