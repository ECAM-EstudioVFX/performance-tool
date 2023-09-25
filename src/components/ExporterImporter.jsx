import { button, useControls } from "leva";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

//const supabase = createClient("https://wklqkcdefwiwfxiogqfy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbHFrY2RlZndpd2Z4aW9ncWZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTY0NDM3NiwiZXhwIjoyMDExMjIwMzc2fQ.W-_7Alkq4rX1rXrsMIxgSMTKZxxqZ0pTIARBBg3ynm4");

export default function ExporterImporter({ modelName, directionalLights }) {

    const [exportParams, setExportParams] = useState([])

    const handleDownloadFile = () => {
        const content = JSON.stringify(exportParams)
        const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'archivo.txt';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const handleUploadFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function () {
            const result = JSON.parse(reader.result)
        }
    }

    const [controls, set] = useControls(() => ({
        Import: button(() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = handleUploadFile;
            input.click();
        }),
        Export: button(() => {
            handleDownloadFile()
        })
    }))

    useEffect(() => {
        setExportParams(() => {
            return {
                modelName,
                lights: {
                    directionalLights
                }
            }
        });
    }, [modelName, directionalLights])

    return (
        <></>
    )
}