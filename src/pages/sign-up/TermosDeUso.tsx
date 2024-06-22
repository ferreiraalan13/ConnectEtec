import React from "react";

interface TermosProps {
  titulo: string;
  texto: string[];
}

const TermosDeUso: React.FC<TermosProps> = ({ titulo, texto }) => {
  return (
    <div>
      <h2>{titulo}</h2>
      {texto.map((paragrafo, index) => (
        <p key={index}>{paragrafo}</p>
      ))}
    </div>
  );
};

const Termos: React.FC = () => {
  const termos: TermosProps[] = [
    {
      titulo: "",
      texto: [
        "Bem-vindo aos Termos de Uso da ConnectEtec.",
        'Estes Termos de Uso ("Termos") regem o uso da plataforma de rede social desenvolvida para a Etec (doravante referida como "Plataforma"). Ao acessar ou utilizar a Plataforma, você concorda em ficar vinculado a estes Termos. Se você não concordar com qualquer parte destes Termos, não utilize a Plataforma.',
      ],
    },
    {
      titulo: "1. Uso da Plataforma",
      texto: [
        "1.1. Você concorda em utilizar a Plataforma apenas para fins permitidos por estes Termos e pela legislação aplicável.",
        "1.2. Você concorda em não acessar (ou tentar acessar) a Plataforma por qualquer meio que não seja a interface fornecida por nós.",
      ],
    },
    {
      titulo: "2. Conteúdo do Usuário",
      texto: [
        "2.1. Você é o único responsável por todo o conteúdo que publicar ou transmitir através da Plataforma.",
        "2.2. Você concorda em não publicar, transmitir ou de outra forma disponibilizar através da Plataforma qualquer conteúdo que seja ilegal, prejudicial, ameaçador, abusivo, difamatório, vulgar, obsceno, ou que viole direitos de terceiros.",
      ],
    },
    {
      titulo: "3. Propriedade Intelectual",
      texto: [
        "3.1. Todo o conteúdo presente na Plataforma, incluindo textos, gráficos, logotipos, ícones, imagens, áudios, vídeos, compilações de dados e software, é de propriedade exclusiva da Etec ou de seus licenciadores e está protegido por leis de propriedade intelectual.",
      ],
    },
    {
      titulo: "4. Privacidade",
      texto: [
        "4.1. Ao utilizar a Plataforma, você concorda com a coleta, uso e divulgação de suas informações pessoais conforme descrito em nossa Política de Privacidade.",
      ],
    },
    {
      titulo: "5. Modificações nos Termos",
      texto: [
        "5.1. Reservamo-nos o direito de modificar estes Termos a qualquer momento. Todas as modificações entrarão em vigor imediatamente após a publicação dos Termos atualizados na Plataforma.",
      ],
    },
    {
      titulo: "6. Rescisão",
      texto: [
        "6.1. Podemos rescindir ou suspender sua conta e acesso à Plataforma imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes Termos.",
      ],
    },
    {
      titulo: "7. Disposições Gerais",
      texto: [
        "7.1. Estes Termos constituem o acordo completo e exclusivo entre você e a Etec em relação à Plataforma e substituem todos os acordos anteriores e contemporâneos, entendimentos, garantias e comunicações em relação à Plataforma.",
        "7.2. Se qualquer disposição destes Termos for considerada inválida ou inexequível, tal disposição será limitada ou eliminada na medida mínima necessária, e as disposições restantes destes Termos permanecerão em pleno vigor e efeito.",
        "Ao continuar a utilizar a Plataforma, você concorda em estar vinculado por estes Termos. Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através dos canais disponíveis na Plataforma.",
      ],
    },
  ];

  return (
    <div>
      {termos.map((termo, index) => (
        <TermosDeUso key={index} titulo={termo.titulo} texto={termo.texto} />
      ))}
    </div>
  );
};

export default Termos;
