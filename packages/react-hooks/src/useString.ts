type Ellipsis = {
  value: string;
  length: number;
  dir?: 'right' | 'left';
};

export default function useString() {
  const ellipsis = ({ value, length, dir = 'right' }: Ellipsis) => {
    if (value.length > length) {
      if (dir === 'left') return '...' + value.slice(value.length - length);
      return value.slice(0, length) + '...';
    }
    return value;
  };

  return { ellipsis };
}
