import { useString } from '@lani.ground/react-hooks';

export default function String() {
  const { ellipsis } = useString();
  return <p>변형 : {ellipsis({ value: 'String', length: 3, dir: 'left' })}</p>;
}
