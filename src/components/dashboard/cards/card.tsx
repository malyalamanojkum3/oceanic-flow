import { useRouter } from "next/navigation";
import React from "react";
import { orgUrl } from "@/lib/psd";
import slugify from "slugify";
import { uiStore } from "@/app/states/ui";
type IconType = React.ComponentType<{ size?: string | number }> | string;

type Card = {
  icon: JSX.Element;
  name: string;
  digits: number ;
};

const Card = ({ topcards }: { topcards: Card[] }) => {
  const router = useRouter();
    const currentOrgId = uiStore.get.currentOrgId();
    // design beautiful card component where it shows Icon,Count and when hovered it shows the name of the card
    return (
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 gap-4">
            {topcards.map((card) => (
                <div
                    key={slugify(card.name)}
                    className={`cursor-pointer bg-muted rounded-lg w-1/15 `}
                    onClick={() =>
                        router.push(
                            `${orgUrl}/${currentOrgId}/${slugify(card.name, {
                                lower: true,
                                trim: true,
                            })}`
                        )
                    }
                    title={card.name} // Add title attribute for tooltip
                >
                    <div className={` p-4 `}>
                        <div className="flex flex-col items-center justify-between">
                            <div className="flex flex-col items-center">
                                {typeof card.icon === "string" ? (
                                    <img
                                        src={card.icon}
                                        alt={card.name}
                                        className="w-8 h-8 mr-2"
                                    />
                                ) : (
                                    card.icon
                                )}
                                <h3 className="text-lg font-semibold text-muted-foreground">
                                    {card.digits}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Card;