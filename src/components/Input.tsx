interface Props {
  labelTitle: string;
  type: string;
  htmlFor?: string;
  name?: string;
  id?: string;
  
}


export default function Input({ labelTitle, type, htmlFor, name, id }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">

      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">{labelTitle}</label>
      <input name={name} id={id}

        type={type}
        className="w-full px-2 rounded-xl border-2 border-gray-300 shadow-sm bg-gray-100 focus:border-red-500 focus:outline-none"
      />
    </div>
  );
}
