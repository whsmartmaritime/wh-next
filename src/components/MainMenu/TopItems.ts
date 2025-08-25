export type PanelItem = { href: string; titleKey: string; hidden?: boolean };
export type PanelColumn = {
  titleKey: string;
  introKey?: string; // intro shown with image in column 4 (per-column)
  imageKey?: string; // optional image key
  hidden?: boolean; // if true => don't render this column
  links: PanelItem[];
};
export type TopItem = {
  key: string;           // semantic key, e.g. 'solutions'
  href?: string;
  descKey?: string;      // description shown in column 1 (shared)
  titleKey?: string;     // optional explicit title translation key under Nav
  hidden?: boolean;      // if true => don't render this top item
  columns: PanelColumn[];
};

export const topItems: TopItem[] = [
  {
    key: 'Solutions',
    href: '/solutions',
    titleKey: 'Solutions.title',
    descKey: 'Solutions.desc',
    columns: [
      {
        titleKey: 'Solutions.columns.one.title',
        introKey: 'Solutions.columns.one.intro',
        imageKey: 'Solutions.columns.one.image',
        links: [
          { href: '/solutions/navcom/gmdss', titleKey: 'Solutions.columns.one.links.1' },
          { href: '/solutions/navcom/navigation', titleKey: 'Solutions.columns.one.links.2' },
          { href: '/solutions/navcom/another', titleKey: 'Solutions.columns.one.links.3' }
        ]
      },
      {
        titleKey: 'Solutions.columns.two.title',
        introKey: 'Solutions.columns.two.intro',
        imageKey: 'Solutions.columns.two.image',
        links: [
          { href: '/solutions/connectivity/starlink', titleKey: 'Solutions.columns.two.links.1' },
          { href: '/solutions/connectivity/vsat', titleKey: 'Solutions.columns.two.links.2' },
          { href: '/solutions/connectivity/5g', titleKey: 'Solutions.columns.two.links.3' }
        ]
      },
  // third column removed to match messages/en.json
    ]
  },

  {
    key: 'Services',
    href: '/services',
    titleKey: 'Services.title',
    descKey: 'Services.desc',
    columns: [
      {
        titleKey: 'Services.columns.one.title',
        introKey: 'Services.columns.one.intro',
        imageKey: 'Services.columns.one.image',
        links: [
          { href: '/service/irm/installation', titleKey: 'Services.columns.one.links.1' },
          { href: '/service/irm/repair', titleKey: 'Services.columns.one.links.2' },
          { href: '/service/irm/maintenance', titleKey: 'Services.columns.one.links.3' }
        ]
      },
      {
        titleKey: 'Services.columns.two.title',
        introKey: 'Services.columns.two.intro',
        imageKey: 'Services.columns.two.image',
        links: [
          { href: '/service/survey/deployments', titleKey: 'Services.columns.two.links.1' },
          { href: '/service/survey/integrations', titleKey: 'Services.columns.two.links.2' }
        ]
      },
  // third column removed to match messages/en.json
    ]
  },

  {
  key: 'placeholder1',
  href: '/resources',
  hidden: true,
    titleKey: 'placeholder1.title',
    descKey: 'placeholder1.desc',
    columns: [
      {
        titleKey: 'placeholder1.columns.one.title',
        introKey: 'placeholder1.columns.one.intro',
        imageKey: 'placeholder1.columns.one.image',
        links: [
          { href: '/blog', titleKey: 'placeholder1.columns.one.links.1' },
          { href: '/blog/topic-2', titleKey: 'placeholder1.columns.one.links.2' },
          { href: '/blog/topic-3', titleKey: 'placeholder1.columns.one.links.3' }
        ]
      },
      {
        titleKey: 'placeholder1.columns.two.title',
        introKey: 'placeholder1.columns.two.intro',
        imageKey: 'placeholder1.columns.two.image',
        links: [
          { href: '/docs', titleKey: 'placeholder1.columns.two.links.1' },
          { href: '/docs/getting-started', titleKey: 'placeholder1.columns.two.links.2' },
          { href: '/docs/api', titleKey: 'placeholder1.columns.two.links.3' }
        ]
      },
  // third column removed to match messages/en.json
    ]
  },

  {
    key: 'placeholder2',
    href: '/placeholder2',
    hidden: true,
    titleKey: 'placeholder2.title',
    descKey: 'placeholder2.desc',
    columns: [
      {
        titleKey: 'placeholder2.columns.one.title',
        introKey: 'placeholder2.columns.one.intro',
        imageKey: 'placeholder2.columns.one.image',
        links: [
          { href: '/placeholder2/one', titleKey: 'placeholder2.columns.one.links.1' },
          { href: '/placeholder2/one/2', titleKey: 'placeholder2.columns.one.links.2' },
          { href: '/placeholder2/one/3', titleKey: 'placeholder2.columns.one.links.3' }
        ]
      },
      {
        titleKey: 'placeholder2.columns.two.title',
        introKey: 'placeholder2.columns.two.intro',
        imageKey: 'placeholder2.columns.two.image',
        links: [
          { href: '/placeholder2/two', titleKey: 'placeholder2.columns.two.links.1' },
          { href: '/placeholder2/two/2', titleKey: 'placeholder2.columns.two.links.2' },
          { href: '/placeholder2/two/3', titleKey: 'placeholder2.columns.two.links.3' }
        ]
      }
    ]
  },

  {
    key: 'Company',
    href: '/company',
    titleKey: 'Company.title',
    descKey: 'Company.desc',
    columns: [
      {
        titleKey: 'Company.columns.one.title',
        introKey: 'Company.columns.one.intro',
        imageKey: 'Company.columns.one.image',
        links: [
          { href: '/about', titleKey: 'Company.columns.one.links.1' },
          { href: '/about/contact', titleKey: 'Company.columns.one.links.2' },
          { href: '/about/careers', titleKey: 'Company.columns.one.links.3' }
        ]
      },
      {
        titleKey: 'Company.columns.two.title',
        introKey: 'Company.columns.two.intro',
        imageKey: 'Company.columns.two.image',
        links: [
          { href: '/customers', titleKey: 'Company.columns.two.links.1' }
        ]
      }
    ]
  }
];
