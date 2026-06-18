type Props = {
  params: {
    id: string;
  };
};

const Component = ({ params }: Props) => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Component params={{ id: 1 }} />
    </div>
  );
}
