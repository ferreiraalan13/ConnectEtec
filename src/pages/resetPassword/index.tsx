import { useState } from "react";
import { Input, Spinner } from "@chakra-ui/react";
import background from "../../assets/Background.svg";
import { configApi } from "../../services/configApi";
import { useNavigate } from "react-router-dom";

interface FormData {
  login?: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    login: "",
  });

  const handleResetPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    configApi
      .post("usuario/recuperarConta", formData)
      .then((response) => {
        navigate("/resetar-senha-pin", { state: response.data });
      })
      .catch(() => {
        navigate("/resetar-senha-pin", { state: " " });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <img
        src={background}
        alt=""
        className="absolute w-full h-full object-cover"
      />
      <div className="w-4/5 h-4/5 flex bg-gray-100 rounded-md shadow-lg z-10 overflow-auto md:max-w-4xl md:h-auto">
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-16 flex flex-col gap-8">
          <h1 className="text-4xl font-medium text-gray-800">
            Digite seu e-mail para recuperar sua conta
          </h1>
          <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="email"
                placeholder="Digite seu email"
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md"
            >
              {isSubmitting ? <Spinner /> : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
