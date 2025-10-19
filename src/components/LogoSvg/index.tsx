import { getTranslations } from "next-intl/server";

interface LogoSvgProps {
  className?: string;
}

export default async function LogoSvg({
  className = "h-12 w-auto",
}: LogoSvgProps) {
  const t = await getTranslations("common");

  return (
    <svg
      viewBox="0 0 100 25"
      className={`text-current ${className}`}
      role="img"
      aria-label={t("logoAlt")}
      aria-labelledby="logoTitle logoDesc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="logoTitle">{t("logoTitle")}</title>
      <desc id="logoDesc">{t("logoDesc")}</desc>
      <text
        x="0.29"
        y="14.97"
        fontSize="16.95"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="700"
        fill="currentColor"
      >
        Wheelhouse
      </text>
      <text
        x="69.46"
        y="24.66"
        fontSize="6.96"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="2"
      >
        MARIS
      </text>
      <rect
        x="0.29"
        y="19.82"
        width="21.19"
        height="4.84"
        fill="currentColor"
      />
      <rect
        x="23.53"
        y="19.82"
        width="12.71"
        height="4.84"
        fill="currentColor"
      />
      <rect
        x="40.48"
        y="19.82"
        width="7.87"
        height="4.84"
        fill="currentColor"
      />
      <rect
        x="52.77"
        y="19.82"
        width="4.84"
        height="4.84"
        fill="currentColor"
      />
      <rect
        x="63.43"
        y="19.82"
        width="3.03"
        height="4.84"
        fill="currentColor"
      />
    </svg>
  );
}
