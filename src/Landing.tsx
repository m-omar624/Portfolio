import Entry from "./components/Entry";
import { useEffect, useState } from "react";

export default function Landing() {
    const [showSlogan, setShowSlogan] = useState(true)
    const [showName, setShowName] = useState(false)
    const [showSummary, setShowSummary] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setShowSlogan(false), 4500)
        const t2 = setTimeout(() => setShowName(true), 5000)
        const t3 = setTimeout(() => setShowSummary(true), 7000)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [])

    return (
        <div id="landing-hero" style={{ position: "relative", height: "100vh" }}>

            {showSlogan && (
                <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", textAlign: "center" }}>
                    <Entry
                        text="Providing Enterprise Solutions for Industry Problems"
                        delays={[800, 1500, 1650, 1850, 1900, 2600]}
                        duration={700}
                        random={false}
                    />
                </div>
            )}

            {/* Name is independently absolutely-centered — never shifts when summary appears */}
            {showName && (
                <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", whiteSpace: "nowrap" }}>
                    <Entry
                        text="Hi, I'm Omar"
                        delays={[800, 1500, 1650, 1850, 1900, 2600]}
                        duration={700}
                        random={false}
                        fontSize={70}
                        fontWeight={700}
                    />
                </div>
            )}

            {/* Summary sits below the name via calc offset — layout-independent from name */}
            {showSummary && (
                <div style={{ position: "absolute", top: "calc(40% + 70px)", left: "50%", transform: "translateX(-50%)", width: "660px", maxWidth: "90vw" }}>
                    <Entry
                        text="A dedicated Software Developer, with 2.5 years of experience developing web applications and large scale enterprise solutions. Explore my latest experience and projects showcasing my skills in full stack development."
                        delays={[]}
                        duration={700}
                        random={true}
                        fontSize={14}
                        fontWeight={200}
                        isSummary={true}
                        revealAfter={1000}
                    />
                </div>
            )}
        </div>
    );
}