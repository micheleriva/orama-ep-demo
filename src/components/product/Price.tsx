interface IPriceProps {
  price: string;
  size?: string;
}

const Price = ({ price, size }: IPriceProps): JSX.Element => {
  return (
    <span
      className={`mt-4 font-light text-gray-900 ${size ? size : "text-2xl"}`}
    >
      {price}
    </span>
  );
};

export default Price;
