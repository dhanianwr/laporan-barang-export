import LogoDark from "../../assets/images/logos/logoudang1.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image src={LogoDark} alt="logo" /> 
        <h1 className="text-black text-decoration-none" id="nama-logo">PT. Uhuy</h1>
      </a>
    </Link>
  );
};

export default Logo;
