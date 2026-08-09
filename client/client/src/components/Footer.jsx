function Footer() {
  return (
    <footer className="bg-slate-900 p-10 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Logo */}
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              VoteVerse
            </h1>

            <p className="mt-4 leading-7 text-slate-300">
              Secure, transparent and modern online voting platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">
              Quick Links
            </h2>

            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="/" className="transition hover:text-blue-400">
                  Home
                </a>
              </li>

              <li>
                <a href="/results" className="transition hover:text-blue-400">
                  Results
                </a>
              </li>

              <li>
                <a href="/login" className="transition hover:text-blue-400">
                  Login
                </a>
              </li>

              <li>
                <a href="/signup" className="transition hover:text-blue-400">
                  Signup
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">
              Contact
            </h2>

            <p className="text-slate-300">
              Email
            </p>

            <p className="mt-2 text-slate-300">
              support@voteverse.com
            </p>

            <div className="mt-5 flex gap-3">
              <button className="rounded-full bg-slate-800 px-4 py-2 transition hover:bg-blue-600">
                GitHub
              </button>

              <button className="rounded-full bg-slate-800 px-4 py-2 transition hover:bg-blue-600">
                LinkedIn
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-slate-700 pt-6 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} VoteVerse. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;