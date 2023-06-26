interface ICheckboxInputProps {
  type: string;
  id: string;
  register: any;
  error: string | undefined;
}

const CheckboxInput: React.FunctionComponent<ICheckboxInputProps> = ({
  type,
  id,
  register,
  error,
}: ICheckboxInputProps) => {
  return (
    <div className="flex items-center mt-3">
      <input
        type={type}
        id={id}
        className="mr-2 focus:ring-0 rounded"
        {...register("accept")}
      />
      <label htmlFor="accept" className="text-gray-700">
        I accept the&nbsp;{" "}
        <a
          href=""
          className="text-blue-600 hover:text-blue-700 hover:underline"
          type="_blank"
        >
          terms
        </a>
        &nbsp;and&nbsp;
        <a
          href=""
          className="text-blue-600 hover:text-blue-700 hover:underline"
          type="_blank"
        >
          conditions
        </a>
      </label>
    </div>
  );
};

export default CheckboxInput;
