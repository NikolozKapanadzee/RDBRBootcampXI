import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link to="/" className="text-gray-500 hover:text-gray-700">
        Home
      </Link>
      {segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        return (
          <span key={path} className="flex items-center gap-2">
            <span className="text-gray-400">›</span>
            {isLast ? (
              <span className="text-indigo-600 capitalize">{segment}</span>
            ) : (
              <Link
                to={path}
                className="text-gray-500 capitalize hover:text-gray-700"
              >
                {segment}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
export default Breadcrumb;
