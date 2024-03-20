import image from '../../assets/signup-image.svg';
import background from '../../assets/Background.svg';
import line from '../../assets/Line.svg';
import Input from '../../components/Input';

export default function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <img src={background} alt="" className='absolute w-full h-full object-cover' />
      <div className="w-4/5 h-4/5 flex bg-gray-100 rounded-md shadow-lg z-10 overflow-auto md:max-w-4xl md:h-auto">
        <div className="hidden md:block md:w-2/5 lg:w-1/3">
          <img src={image} alt="" className="w-full h-full object-cover rounded-l-md" />
        </div>
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-16 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-medium text-gray-800">Cadastro</h1>
            <img src={line} alt="decorative"/>
          </div>

          <form action="" className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input labelTitle="Primeiro nome" type="text" />
              <Input labelTitle="Sobrenome" type="text" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input labelTitle="Email institucional" type="email" />
              <Input labelTitle="RM" type="text" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input labelTitle="Senha" type="password" />
              <Input labelTitle="Confirme a senha" type="password" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className='w-3 h-3 rounded-full flex relative'>
                <input type="checkbox" className="" />
                </div>
                
                Aceito os termos de uso
              </label>
              <a href="/terms" className="text-blue-500 hover:underline">Ler termos de uso</a>
            </div>

            <button type="submit" className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md">
              Cadastre-se
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
