import { Card, Flex, Tag, theme, Typography, type FlexProps } from "antd"
import type { ReactNode } from "react"

const { useToken } = theme

type Props = {
    projectName: string
    image: string
    selectedProject: string
    setSelectedProject: (project: string) => void
    description: string
    tags: string[]
    offsetX?: number
    offsetY?: number
    logo?: string

    children?: ReactNode
    contentFlexProps?: FlexProps
}

export default function ProjectCard({
    projectName,
    image,
    selectedProject,
    setSelectedProject,
    description,
    tags,
    offsetX = 0,
    offsetY = 0,
    logo,
    children,
    contentFlexProps

}: Props) {
    const isSelected = selectedProject === projectName
    const isOtherSelected = selectedProject !== "" && !isSelected
    const { token } = useToken()

    return (
        <Flex align="center">
            <div style={{ height: "100%", width: "18vw", textWrap: "auto", padding:0, borderRadius:10, border:"1px solid", borderColor:token.colorBorder }}>
                <Flex vertical gap={10} justify="center" style={{textAlign:"center"}}>
                    <img src="/magna.png" alt="" style={{ width: "100%", height: 200, borderRadius:"10px 10px 0px 0px" }} />
                    <Flex vertical gap={10} justify="center" style={{padding:10}}>
                        <Typography.Text style={{color:token.colorTextLabel, fontSize:16}}>{description}</Typography.Text>
                        <Flex gap={5} wrap>
                            {tags.map(tag => (<>
                                <Tag>
                                    {tag}
                                </Tag>
                            </>))}
                        </Flex>
                    </Flex>

                   
                </Flex>

            </div>
            {/* <Typography.Title style={{fontSize:150, fontWeight:900, color:token.colorTextDisabled, marginInline:"4vw"}}>{projectName}</Typography.Title> */}
        </Flex>
    )
}