import { LucideProps } from "lucide-react"

type IconProps = React.SVGProps<SVGSVGElement>

export const Icons = {
  MdOutlineArrowOutward: ({ ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" {...props}>
      <path d="M2 0V4H19.18L0 23.18L2.82 26L22 6.82V24H26V0H2Z" fill="black" />
    </svg>
  ),
  star: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}
