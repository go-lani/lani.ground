import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TEST_COMPONENTS } from '../..';

interface ComponentItem {
  path: string;
  element: React.ReactElement;
  children?: ComponentItem[];
}

export default function Lnb() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(['/react-picker']),
  );

  const organizedComponents = useMemo(() => {
    const components = TEST_COMPONENTS.filter((component) => component.path);
    const organized: ComponentItem[] = [];
    const childrenMap: { [key: string]: ComponentItem[] } = {};

    // 먼저 모든 컴포넌트를 분류
    components.forEach((component) => {
      const pathParts = component.path.split('/');
      if (pathParts.length === 2) {
        // 메인 패키지 (예: /react-picker)
        organized.push({
          path: component.path,
          element: component.element,
          children: [],
        });
      } else if (pathParts.length === 3) {
        // 하위 페이지 (예: /react-picker/date)
        const parentPath = `/${pathParts[1]}`;
        if (!childrenMap[parentPath]) {
          childrenMap[parentPath] = [];
        }
        childrenMap[parentPath].push({
          path: component.path,
          element: component.element,
        });
      }
    });

    // 자식들을 부모에게 연결
    organized.forEach((parent) => {
      if (childrenMap[parent.path]) {
        parent.children = childrenMap[parent.path];
      }
    });

    return organized;
  }, []);

  const toggleExpanded = (path: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (parentPath: string, children: ComponentItem[]) => {
    return children.some((child) => location.pathname === child.path);
  };

  return (
    <ul className="flex flex-col gap-1">
      {organizedComponents.map((component) => {
        const hasChildren = component.children && component.children.length > 0;
        const isExpanded = expandedItems.has(component.path);
        const isParentActiveState =
          hasChildren && isParentActive(component.path, component.children!);

        return (
          <li key={component.path}>
            <div className="flex items-center">
              <Link
                to={component.path}
                className={`block flex-1 rounded-md px-4 py-2 transition-colors ${
                  isActive(component.path)
                    ? 'bg-blue-600 text-white'
                    : isParentActiveState
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'hover:bg-gray-600'
                }`}
              >
                @lani.ground{component.path}
              </Link>
              {/* {hasChildren && (
                <button
                  onClick={() => toggleExpanded(component.path)}
                  className="ml-2 px-2 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              )} */}
            </div>

            {hasChildren && isExpanded && (
              <ul className="ml-4 mt-1 flex flex-col gap-1">
                {component.children!.map((child) => (
                  <li key={child.path}>
                    <Link
                      to={child.path}
                      className={`block rounded-md px-4 py-2 pl-6 text-sm transition-colors ${
                        isActive(child.path)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                      }`}
                    >
                      <span className="mr-2 text-gray-500">└</span>
                      {child.path.split('/').pop()}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
