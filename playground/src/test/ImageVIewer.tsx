import { ImageViewerProvider } from '@lani.ground/react-image-viewer';
import '@lani.ground/react-image-viewer/css';
import ContentLayout from './common/ContentLayout';
import ExampleSection from './common/ExampleSection';

export default function ImageViewerPage() {
  const examples = [
    {
      title: 'Single Image Viewer',
      description:
        '개별 이미지 뷰어 모드입니다. 각 이미지를 독립적으로 확대/축소하여 볼 수 있습니다.',
      icon: '🖼️',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/5',
      borderColor: 'border-orange-500/20',
      disableGallery: true,
      images: [
        '/assets/images/sample/image-1.jpg',
        '/assets/images/sample/image-2.jpg',
        '/assets/images/sample/image-3.jpg',
      ],
      features: ['개별 이미지 뷰', '확대/축소', '드래그 이동'],
    },
    {
      title: 'Gallery Viewer',
      description:
        '갤러리 모드 이미지 뷰어입니다. 이미지들을 연속적으로 탐색할 수 있으며, 썸네일 네비게이션을 제공합니다.',
      icon: '🎨',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-violet-500/5',
      borderColor: 'border-violet-500/20',
      disableGallery: false,
      images: [
        '/assets/images/sample/image-4.jpg',
        '/assets/images/sample/image-5.jpg',
        '/assets/images/sample/image-6.jpg',
        '/assets/images/sample/image-7.jpg',
        '/assets/images/sample/image-8.jpg',
      ],
      features: ['갤러리 네비게이션', '슬라이드쇼'],
    },
  ];

  return (
    <ContentLayout packageName="react-image-viewer">
      {/* Props 정의 섹션 */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ExampleSection title="ImageViewerProvider Props">
          <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4 sm:rounded-xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                📄
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
                  Props 정의
                </h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-neutral-700">
                        <th className="py-2 pr-4 text-left font-medium text-gray-300">
                          Name
                        </th>
                        <th className="py-2 pr-4 text-left font-medium text-gray-300">
                          Type
                        </th>
                        <th className="py-2 pr-4 text-left font-medium text-gray-300">
                          Required
                        </th>
                        <th className="py-2 text-left font-medium text-gray-300">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-orange-400">
                          children
                        </td>
                        <td className="py-2 pr-4 font-mono">JSX.Element</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">이미지가 포함된 자식 컴포넌트</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-orange-400">
                          disableGallery
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          갤러리 모드 비활성화 여부 (기본값: false)
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-orange-400">
                          controller
                        </td>
                        <td className="py-2 pr-4 font-mono">{`{ next: JSX.Element; prev: JSX.Element }`}</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">커스텀 이전/다음 버튼 컴포넌트</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </ExampleSection>
      </div>

      <ExampleSection title="ImageViewer Examples">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-1 lg:gap-8">
          {examples.map((example, index) => (
            <ImageViewerProvider
              key={index}
              disableGallery={example.disableGallery}
            >
              <div
                key={index}
                className={`rounded-lg border sm:rounded-xl ${example.borderColor} ${example.bgColor} p-4 transition-all duration-300 hover:shadow-lg sm:p-6`}
              >
                {/* 헤더 */}
                <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center sm:gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                    {example.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`bg-gradient-to-r text-base font-bold sm:text-lg ${example.color} bg-clip-text leading-tight text-transparent`}
                    >
                      {example.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                      {example.description}
                    </p>
                  </div>
                </div>

                {/* 인터랙션 영역 */}
                <div className="space-y-3 sm:space-y-4">
                  {/* 이미지 그리드 */}
                  <div className="xs:grid-cols-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5">
                    {example.images.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="group cursor-pointer overflow-hidden rounded-lg border border-neutral-700/50 bg-neutral-800/30 transition-all duration-300 hover:scale-105 hover:border-white/20"
                      >
                        <img
                          src={image}
                          alt={`Example ${imageIndex + 1}`}
                          className="h-16 w-full object-cover transition-all duration-300 group-hover:brightness-110 sm:h-20"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 기능 설명 */}
                  <div className="rounded-lg bg-neutral-800/30 p-3 sm:p-4">
                    <h4 className="mb-2 text-xs font-medium text-gray-300 sm:text-sm">
                      주요 기능
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-400">
                      {example.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <div
                            className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                          />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ImageViewerProvider>
          ))}
        </div>
      </ExampleSection>

      {/* 추가 설명 섹션 */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ExampleSection title="사용법 안내">
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 sm:rounded-xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                💡
              </div>
              <div className="min-w-0 space-y-2 sm:space-y-3">
                <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
                  Image Viewer 사용 팁
                </h3>
                <div className="space-y-1 text-xs text-gray-300 sm:space-y-2 sm:text-sm">
                  <p>
                    • <strong>확대/축소:</strong> 마우스 휠 또는 핀치 제스처를
                    사용하세요
                  </p>
                  <p>
                    • <strong>이동:</strong> 이미지를 드래그하여 원하는 부분을
                    볼 수 있습니다
                  </p>
                  <p>
                    • <strong>갤러리 모드:</strong> 같은 ImageViewerProvider
                    안의 모든 이미지가 연결됩니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ExampleSection>
      </div>
    </ContentLayout>
  );
}
