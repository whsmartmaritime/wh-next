import HoverHighlights from '@/components/HoverHighlights'

export default function WhatWeDo() {
  return (
    <HoverHighlights 
      namespace="WhatWeDo"
      className="bg-background"
      highlights={[
        {
          id: 'fleet-management',
          textKey: 'highlight1Text',
          descKey: 'highlight1Desc',
          href: '/solution#fleet',
          mediaFolder: 'whatwedo/fleet',
          mediaFiles: { 
            top: 'fleet-monitoring.jpg', 
            bottom: 'fleet-dashboard.jpg' 
          }
        },
        {
          id: 'navigation-safety',
          textKey: 'highlight2Text',
          descKey: 'highlight2Desc',
          href: '/solution#navigation',
          mediaFolder: 'whatwedo/navigation',
          mediaFiles: { 
            top: 'navigation-system.jpg', 
            bottom: 'safety-protocols.jpg' 
          }
        },
        {
          id: 'communication',
          textKey: 'highlight3Text',
          descKey: 'highlight3Desc',
          href: '/solution#communication',
          mediaFolder: 'whatwedo/communication',
          mediaFiles: { 
            top: 'satellite-comm.jpg', 
            bottom: 'comm-interface.jpg' 
          }
        },
        {
          id: 'digital-transformation',
          textKey: 'highlight4Text',
          descKey: 'highlight4Desc',
          href: '/solution#digital',
          mediaFolder: 'whatwedo/digital',
          mediaFiles: { 
            top: 'digital-platform.jpg', 
            bottom: 'connected-vessel.jpg' 
          }
        }
      ]}
    />
  )
}
