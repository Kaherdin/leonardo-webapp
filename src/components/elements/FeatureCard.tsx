import React from 'react'

interface FeatureProps {
  title: string
  icon: React.ComponentType<any>
  description: string
  href: string
  eyebrow: string
  pageIntro: { title: string; content: string } // Added pageIntro property
}

interface FeatureCardProps {
  feature: FeatureProps
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="g grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div key={feature.pageIntro?.title} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                {/* <feature.icon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-indigo-600"
                /> */}
                {feature.pageIntro?.title}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{feature.pageIntro?.content}</p>
                <p className="mt-6">
                  <a
                    href={feature.href}
                    className="text-sm font-semibold leading-6 text-indigo-600"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
