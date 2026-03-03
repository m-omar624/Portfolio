import {Card, Flex, Typography, Button, theme} from "antd"
import { useState } from "react"
const {useToken} = theme
export default function Experience(){
    const {token} = useToken()
    const [selectedExperience, setSelectedExperience] = useState<string | null>(null)

    return(<>
                <Card size="small">
                <Flex style={{ marginBlock: 0 }} gap={0}>
                    <Card style={{height:"87vh", width:selectedExperience === "Magna"? "300%" : "100%", transition: "width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)"}} 
                    onMouseEnter={()=>{setSelectedExperience("Magna")}}
                    onMouseLeave={()=>{setSelectedExperience("")}}>
                    </Card>

                    <Card style={{height:"87vh", width:selectedExperience === "theScore"? "300%" : "100%", transition: "width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)"}} 
                    onMouseEnter={()=>{setSelectedExperience("theScore")}}
                    onMouseLeave={()=>{setSelectedExperience("")}}>
                    </Card>

                    <Card style={{height:"87vh", width:selectedExperience === "SellStatic"? "300%" : "100%", transition: "width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)"}} 
                    onMouseEnter={()=>{setSelectedExperience("SellStatic")}}
                    onMouseLeave={()=>{setSelectedExperience("")}}>
                    </Card>

                    <Card style={{height:"87vh", width:selectedExperience === "Bond"? "300%" : "100%", transition: "width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)"}} 
                    onMouseEnter={()=>{setSelectedExperience("Bond")}}
                    onMouseLeave={()=>{setSelectedExperience("")}}>
                    </Card>

                    <Card style={{height:"87vh", width:selectedExperience === "Freelance"? "300%" : "100%", transition: "width 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)"}} 
                    onMouseEnter={()=>{setSelectedExperience("Freelance")}}
                    onMouseLeave={()=>{setSelectedExperience("")}}>
                    </Card>
                </Flex>
            </Card>
    
    </>)
}