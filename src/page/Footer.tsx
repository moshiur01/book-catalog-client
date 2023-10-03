export default function Footer() {
  return (
    <div className="bg-neutral mt-20">
      <footer>
        <div className="footer container mx-auto p-10 text-neutral-content text-center ml-[300px]">
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </div>

        <div className="text-white pb-2 ml-[800px]">
          <aside>
            <p>Copyright © 2023 - All right reserved by Book catalog</p>
          </aside>
        </div>
      </footer>
    </div>
  );
}
