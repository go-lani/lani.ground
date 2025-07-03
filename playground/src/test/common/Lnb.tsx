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
    new Set(['/react-picker', '/kits']),
  );

  // 패키지별 색상과 아이콘 매핑
  const packageStyles = {
    '/react-picker': {
      icon: '📅',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      hoverColor: 'hover:bg-blue-500/20',
      activeColor: 'bg-blue-600',
    },
    '/react-modal': {
      icon: '🪟',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      hoverColor: 'hover:bg-purple-500/20',
      activeColor: 'bg-purple-600',
    },
    '/react-hooks': {
      icon: '🎣',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      hoverColor: 'hover:bg-emerald-500/20',
      activeColor: 'bg-emerald-600',
    },
    '/react-image-viewer': {
      icon: '🖼️',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      hoverColor: 'hover:bg-orange-500/20',
      activeColor: 'bg-orange-600',
    },
    '/react-outside-click-handler': {
      icon: '👆',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-violet-500/10',
      hoverColor: 'hover:bg-violet-500/20',
      activeColor: 'bg-violet-600',
    },
    '/react-device-detector': {
      icon: '📱',
      color: 'from-green-500 to-lime-500',
      bgColor: 'bg-green-500/10',
      hoverColor: 'hover:bg-green-500/20',
      activeColor: 'bg-green-600',
    },
    '/kits': {
      icon: '🧰',
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-500/10',
      hoverColor: 'hover:bg-amber-500/20',
      activeColor: 'bg-amber-600',
    },
  };

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

  const getPackageStyle = (path: string) => {
    return (
      packageStyles[path as keyof typeof packageStyles] ||
      packageStyles['/react-picker']
    );
  };

  return (
    <div className="space-y-2">
      {/* 헤더 */}
      <div className="mb-6 rounded-xl border border-neutral-700/50 bg-gradient-to-br from-neutral-800/30 to-neutral-900/50 p-4 backdrop-blur-sm">
        <h2 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
          패키지 목록
        </h2>
        <p className="text-sm text-gray-400">
          @lani.ground 컴포넌트 라이브러리
        </p>
      </div>

      {/* 네비게이션 목록 */}
      <ul className="space-y-2">
        {organizedComponents.map((component) => {
          const hasChildren =
            component.children && component.children.length > 0;
          const isExpanded = expandedItems.has(component.path);
          const isParentActiveState =
            hasChildren && isParentActive(component.path, component.children!);
          const packageStyle = getPackageStyle(component.path);

          return (
            <li key={component.path}>
              <div className="flex items-center">
                <Link
                  to={component.path}
                  className={`group flex flex-1 items-center gap-3 rounded-xl border border-transparent px-4 py-3 transition-all duration-200 ${
                    isActive(component.path)
                      ? `${packageStyle.activeColor} border-neutral-600 text-white shadow-lg`
                      : isParentActiveState
                      ? `${packageStyle.bgColor} border-neutral-700/50 text-white`
                      : `hover:border-neutral-700/50 ${packageStyle.hoverColor} text-gray-300 hover:text-white`
                  }`}
                >
                  {/* 아이콘 */}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg transition-transform group-hover:scale-110 ${
                      isActive(component.path)
                        ? 'bg-white/20'
                        : 'bg-neutral-800/50'
                    }`}
                  >
                    {packageStyle.icon}
                  </div>

                  {/* 패키지명 */}
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      @lani.ground{component.path}
                    </div>
                  </div>

                  {/* 활성 상태 표시 */}
                  {(isActive(component.path) || isParentActiveState) && (
                    <div
                      className={`h-2 w-2 rounded-full bg-gradient-to-r ${packageStyle.color}`}
                    />
                  )}
                </Link>

                {/* 확장/축소 버튼 */}
                {hasChildren && (
                  <button
                    onClick={() => toggleExpanded(component.path)}
                    className="ml-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-neutral-700/50 hover:text-white"
                  >
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {hasChildren && isExpanded && (
                <ul className="ml-4 mt-2 space-y-1">
                  {component.children!.map((child) => {
                    const childStyle = getPackageStyle(component.path);
                    return (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
                            isActive(child.path)
                              ? `${childStyle.activeColor} text-white`
                              : `text-gray-400 hover:text-white ${childStyle.hoverColor}`
                          }`}
                        >
                          <span className="text-gray-500">└</span>
                          <span className="capitalize">
                            {child.path.split('/').pop()}
                          </span>
                          {isActive(child.path) && (
                            <div
                              className={`ml-auto h-1.5 w-1.5 rounded-full bg-gradient-to-r ${childStyle.color}`}
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
