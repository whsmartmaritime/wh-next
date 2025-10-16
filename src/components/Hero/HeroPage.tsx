import { type ReactNode } from "react";
import MediaText from "@/components/MediaText";
interface HeroPageProps {
  title: ReactNode;
  subtitle: ReactNode;
  cardTitle?: ReactNode;
  cardDescription?: ReactNode;
  cardImgSrc?: string;
  cardImgAlt?: string;
  className?: string;
}

export const HeroPage: React.FC<HeroPageProps> = ({
  title,
  subtitle,
  cardTitle,
  cardDescription,
  cardImgSrc,
  cardImgAlt,
  className = "",
}) => {
  return (
    <div className={"relative" + className}>
      <div className="  grid grid-cols-12">
        <div className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6">
          {title}
        </div>
        <div className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-justify whitespace-pre-line  max-w-2xl">
          {subtitle}
        </div>
      </div>
      <MediaText
        className=" mt-8 lg:mt-16"
        data={{
          title: cardTitle,
          description: cardDescription,
          imgSrc: cardImgSrc,
          imgAlt: cardImgAlt,
        }}
        variant="featured"
      />
    </div>
  );
};
