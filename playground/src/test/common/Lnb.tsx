import { Link, useLocation } from 'react-router-dom';
import { TEST_COMPONENTS } from '../..';
import { useMemo } from 'react';

export default function Lnb() {
  const location = useLocation();

  const TEST_COMPONENT_PATHS = useMemo(
    () => TEST_COMPONENTS.filter((component) => component.path),
    [],
  );

  return (
    <ul className="flex flex-col gap-2">
      {TEST_COMPONENT_PATHS.map((component) => {
        return (
          <li key={component.path}>
            <Link
              to={component.path}
              className={`block rounded-md ${
                location.pathname === component.path ? 'bg-gray-500' : ''
              } px-4 py-2`}
            >
              @lani.ground{component.path}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
