export type PanelItem = { href: string; titleKey: string; descKey?: string };
export type PanelColumn = { titleKey: string; links: PanelItem[] };
export type TopItem = { key: string; href?: string; panel?: PanelItem[]; columns?: PanelColumn[] };

export const topItems: TopItem[] = [
  {
    key: 'solutions',
    href: '/solution',
    columns: [
      {
        titleKey: 'solutions.columns.one.title',
        links: [
          { href: '/solution/one/1', titleKey: 'solutions.columns.one.links.1' },
          { href: '/solution/one/2', titleKey: 'solutions.columns.one.links.2' },
          { href: '/solution/one/3', titleKey: 'solutions.columns.one.links.3' }
        ]
      },
      {
        titleKey: 'solutions.columns.two.title',
        links: [
          { href: '/solution/two/1', titleKey: 'solutions.columns.two.links.1' },
          { href: '/solution/two/2', titleKey: 'solutions.columns.two.links.2' },
          { href: '/solution/two/3', titleKey: 'solutions.columns.two.links.3' }
        ]
      },
      {
        titleKey: 'solutions.columns.three.title',
        links: [
          { href: '/solution/three/1', titleKey: 'solutions.columns.three.links.1' },
          { href: '/solution/three/2', titleKey: 'solutions.columns.three.links.2' },
          { href: '/solution/three/3', titleKey: 'solutions.columns.three.links.3' }
        ]
      }
    ]
  },
  {
    key: 'services',
    href: '/service',
    columns: [
      { titleKey: 'services.columns.one.title', links: [
        { href: '/service/consulting', titleKey: 'services.columns.one.links.1' },
        { href: '/service/consulting2', titleKey: 'services.columns.one.links.2' },
        { href: '/service/consulting3', titleKey: 'services.columns.one.links.3' }
      ]},
      { titleKey: 'services.columns.two.title', links: [
        { href: '/service/implementation', titleKey: 'services.columns.two.links.1' },
        { href: '/service/implementation2', titleKey: 'services.columns.two.links.2' },
        { href: '/service/implementation3', titleKey: 'services.columns.two.links.3' }
      ]},
      { titleKey: 'services.columns.three.title', links: [
        { href: '/service/support', titleKey: 'services.columns.three.links.1' },
        { href: '/service/support2', titleKey: 'services.columns.three.links.2' },
        { href: '/service/support3', titleKey: 'services.columns.three.links.3' }
      ]}
    ]
  },
  {
    key: 'resources',
    href: '/blog',
    columns: [
      { titleKey: 'resources.columns.one.title', links: [
        { href: '/blog', titleKey: 'resources.columns.one.links.1' },
        { href: '/blog/topic-2', titleKey: 'resources.columns.one.links.2' },
        { href: '/blog/topic-3', titleKey: 'resources.columns.one.links.3' }
      ]},
      { titleKey: 'resources.columns.two.title', links: [
        { href: '/docs', titleKey: 'resources.columns.two.links.1' },
        { href: '/docs/getting-started', titleKey: 'resources.columns.two.links.2' },
        { href: '/docs/api', titleKey: 'resources.columns.two.links.3' }
      ]},
      { titleKey: 'resources.columns.three.title', links: [
        { href: '/changelog', titleKey: 'resources.columns.three.links.1' },
        { href: '/releases', titleKey: 'resources.columns.three.links.2' },
        { href: '/community', titleKey: 'resources.columns.three.links.3' }
      ]}
    ]
  },
  { key: 'company', href: '/about', columns: [
    { titleKey: 'company.columns.one.title', links: [
      { href: '/about', titleKey: 'company.columns.one.links.1' },
      { href: '/team', titleKey: 'company.columns.one.links.2' },
      { href: '/careers', titleKey: 'company.columns.one.links.3' }
    ]},
    { titleKey: 'company.columns.two.title', links: [
      { href: '/about/history', titleKey: 'company.columns.two.links.1' },
      { href: '/about/values', titleKey: 'company.columns.two.links.2' },
      { href: '/about/contact', titleKey: 'company.columns.two.links.3' }
    ]},
    { titleKey: 'company.columns.three.title', links: [
      { href: '/press', titleKey: 'company.columns.three.links.1' },
      { href: '/partners', titleKey: 'company.columns.three.links.2' },
      { href: '/legal', titleKey: 'company.columns.three.links.3' }
    ]}
  ] }
];
