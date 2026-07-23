import { AlertTriangle } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
  const error = useRouteError();
  return (
    <main className="page-shell grid min-h-screen place-items-center py-12 text-center">
      <section className="surface max-w-lg p-10">
        <AlertTriangle className="mx-auto h-14 w-14 text-amber-500" />
        <h1 className="mt-5 text-3xl font-bold">That page hit a snag</h1>
        <p className="mt-3 text-slate-600">{error?.status === 404 ? "The page you requested does not exist." : "An unexpected error occurred. Your data is safe."}</p>
        <Link to="/" className="btn-primary mt-7">Back to marketplace</Link>
      </section>
    </main>
  );
};

export default ErrorPage;
