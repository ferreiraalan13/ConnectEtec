import { useState } from "react";
import { Input } from "@chakra-ui/react";
import background from "../../assets/Background.svg";
import { auth } from "../../firebase/firebase"; // Importe a instância de autenticação do Firebase
import { sendPasswordResetEmail } from "firebase/auth"; // Importe a função sendPasswordResetEmail do módulo auth do Firebase

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email); // Use a função sendPasswordResetEmail do módulo auth do Firebase
      setSuccess(true);
    } catch (error) {
      console.log("Deu ruim")
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <p className="text-green-500">
                Um e-mail de redefinição de senha foi enviado para {email}.
              </p>
            )}
            <button
              type="submit"
              className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
