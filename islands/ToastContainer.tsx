import {
  ToastContainer,
} from "https://esm.sh/react-toastify@9.1.1?&external=react,react-dom&alias=react/jsx-runtime:preact/jsx-runtime&deps=preact@10.19.2&target=es2022";

export default function ToastContainerComponent() {
  // deno-lint-ignore no-explicit-any
  const ToastContainerEl = ToastContainer as any;

  return <ToastContainerEl />;
}
