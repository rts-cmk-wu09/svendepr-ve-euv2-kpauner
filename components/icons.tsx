type IconProps = React.SVGProps<SVGSVGElement>

export const Icons = {
  MdOutlineArrowOutward: ({ ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" {...props}>
      <path d="M2 0V4H19.18L0 23.18L2.82 26L22 6.82V24H26V0H2Z" fill="black" />
    </svg>
  ),
}
