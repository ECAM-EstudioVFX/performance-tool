import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://wklqkcdefwiwfxiogqfy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbHFrY2RlZndpd2Z4aW9ncWZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTY0NDM3NiwiZXhwIjoyMDExMjIwMzc2fQ.W-_7Alkq4rX1rXrsMIxgSMTKZxxqZ0pTIARBBg3ynm4");

export default function ExporterImporter({ modelName }) {

    const [exportParams] = useState({
        model: { name: modelName },
        data: [],
    })

    const { scene } = useThree()

    const types = {
        'Mesh': THREE.Mesh,
        'Group': THREE.Group,
        'Object3D': THREE.Object3D,
        'Scene': THREE.Scene,
        'AmbientLight': THREE.AmbientLight,
        'DirectionalLight': THREE.DirectionalLight,
    }

    const handleDownloadFile = () => {
        exportParams.data = scene.children
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
            console.log(result)
        }
    }

    function createChildren() {

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
        console.log(scene.children)
    }, [exportParams])

    return (
        <></>
    )
}