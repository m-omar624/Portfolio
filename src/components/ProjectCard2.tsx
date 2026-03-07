import { Flex, theme, Typography, type FlexProps } from "antd"
import type { ReactNode } from "react"

const {useToken} = theme 

type Props = {
  experienceName: string
  image: string
  selectedExperience: string
  setSelectedExperience: (experience: string) => void
  offsetX?: number
  offsetY?: number
  logo?: string

  children?: ReactNode
  contentFlexProps?: FlexProps
}

export default function ProjectCard2({
  experienceName,
  image,
  selectedExperience,
  setSelectedExperience,
  offsetX = 0,
  offsetY = 0,
  logo,
  children,
  contentFlexProps
}: Props) {
  const isSelected = selectedExperience === experienceName
  const isOtherSelected = selectedExperience !== "" && !isSelected
  const { token } = useToken()

  return (
    <div
      style={{
        height: isSelected ? "70vh" : "70vh",
        width: isSelected ? "130%" : "100%",
        borderRadius: 6,
        transition:
          "width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1), filter 0.5s cubic-bezier(0.075, 0.82, 0.165, 1), background-size 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)",
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(255,255,255,0) 88%), url(${image})`,
        backgroundPosition: `bottom, calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: isSelected ? "100% 100%, cover" : "100% 0%, cover",
        padding: 0,
        filter: isOtherSelected ? "brightness(0.45)" : "brightness(1)",
        position: "relative",
        overflow: "hidden",
        boxShadow: isSelected ? "0 8px 24px rgba(0, 0, 0, 0.5)" : "0 0px 6px rgba(0, 0, 0, 0.5)",
      }}
      onMouseEnter={() => setSelectedExperience(experienceName)}
      onMouseLeave={() => setSelectedExperience("")}
    >

      {logo && (
        <div
          style={{
            width: "100%",
            height: "40%",
            position: "absolute",
            top: 0,
            backgroundImage: `url(${logo})`,
            backgroundSize: "60%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: isSelected ? 1 : 0,
            transform: isSelected ? "translateY(0px)" : "translateY(30px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            pointerEvents: "none"
          }}
        />
      )}

      {isSelected && children && (
        <Flex
          vertical
          style={{
            position: "absolute",
            inset: 0,
            paddingInline: 5
          }}
          {...contentFlexProps}
        >
          {children}
        </Flex>
      )}
    </div>
  )
}