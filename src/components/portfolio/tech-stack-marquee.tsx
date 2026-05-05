import InfiniteMarquee from "@/components/animations/infinite-marquee";
import {
  Icon3dsMax,
  IconAfterEffects,
  IconBlender,
  IconCanva,
  IconIllustrator,
  IconIndesign,
  IconLightroom,
  IconMaya,
  IconPhotoshop,
  IconProcreate,
} from "@/components/ui/tech-icons";

const techIcons = [
  { key: "photoshop", Icon: IconPhotoshop },
  { key: "illustrator", Icon: IconIllustrator },
  { key: "indesign", Icon: IconIndesign },
  { key: "after-effects", Icon: IconAfterEffects },
  { key: "lightroom", Icon: IconLightroom },
  { key: "procreate", Icon: IconProcreate },
  { key: "canva", Icon: IconCanva },
  { key: "maya", Icon: IconMaya },
  { key: "3dsmax", Icon: Icon3dsMax },
  { key: "blender", Icon: IconBlender },
];

const TechStackMarquee = () => (
  <div className="mt-12 mb-8">
    <InfiniteMarquee ariaLabel="Tech stack">
      {techIcons.map(({ key, Icon }) => (
        <div
          key={key}
          className="w-12 h-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-out cursor-pointer shrink-0 mx-8"
        >
          <Icon className="w-full h-full object-contain" />
        </div>
      ))}
    </InfiniteMarquee>
  </div>
);

export default TechStackMarquee;
