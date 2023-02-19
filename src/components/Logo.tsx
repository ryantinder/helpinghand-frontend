import Image from 'next/image';

const image: React.FC<{w: number, h: number}> = ({w, h}) => {
  return (
    <div>
      <Image
        src="/src/public/logo.png"
        alt=""
        width={w}
        height={h}
      />
    </div>
  );
}
export default image;