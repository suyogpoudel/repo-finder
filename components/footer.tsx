import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-card p-6 border-t shadow-sm flex justify-between items-center text-muted-foreground">
      <span>&copy; 2026 | Suyog Poudel</span>

      <span className="flex gap-1">
        Developed by:
        <Link
          href="https://suyogpoudel.com.np"
          className="text-primary hover:underline underline-offset-4"
        >
          Suyog Poudel
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
