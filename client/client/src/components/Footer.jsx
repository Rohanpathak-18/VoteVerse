import {
  Github,
  Linkedin,
  Mail,
  Heart,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              VoteVerse
            </h2>

            <p className="mt-4 text-slate-300">
              Secure, transparent and modern online voting platform.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li><a href="/">Home</a></li>
              <li><a href="/results">Results</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Signup</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Contact
            </h3>

            <div className="flex items-center gap-2">
              <Mail size={18} />
              support@voteverse.com
            </div>

            <div className="mt-4 flex gap-3">
              <Github />
              <Linkedin />
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-700 pt-5 text-center">
          <p className="flex items-center justify-center gap-2">
            Made with
            <Heart size={18} className="text-red-500" />
            by VoteVerse Team © {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;